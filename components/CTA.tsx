"use client";

import { useState, useEffect } from "react";
import { submitWaitlist } from "@/app/actions";
import { Loader2, CheckCircle, Building, User, Copy, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CTA() {
  const [role, setRole] = useState<"landlord" | "renter" | null>(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [urlReferralCode, setUrlReferralCode] = useState<string | null>(null);

  // Form state for landlord
  const [landlordForm, setLandlordForm] = useState({
    email: "",
    phone_number: "",
    landlord_type: "",
    portfolio_size: "",
    property_location: "",
    current_deposit_scheme: "",
    deposit_scheme_provider: "",
    biggest_headaches: [] as string[],
    has_pms: "",
    prs_database_status: "",
    web3_familiarity: 3,
    linkedin_website: "",
  });

  // Form state for renter
  const [renterForm, setRenterForm] = useState({
    email: "",
    phone_number: "",
    target_moving_date: "",
    desired_location: "",
    current_rent: "",
    budget: "",
    student_status: "",
    moving_status: "",
    employment_type: "",
    biggest_rental_fears: [] as string[],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setUrlReferralCode(ref);
      }
    }
  }, []);

  const totalSteps = 3;

  const handleCheckboxChange = (
    field: 'biggest_headaches' | 'biggest_rental_fears',
    value: string,
    isLandlord: boolean
  ) => {
    if (isLandlord) {
      setLandlordForm(prev => ({
        ...prev,
        [field]: prev[field as 'biggest_headaches'].includes(value)
          ? prev[field as 'biggest_headaches'].filter(v => v !== value)
          : [...prev[field as 'biggest_headaches'], value]
      }));
    } else {
      setRenterForm(prev => ({
        ...prev,
        [field]: prev[field as 'biggest_rental_fears'].includes(value)
          ? prev[field as 'biggest_rental_fears'].filter(v => v !== value)
          : [...prev[field as 'biggest_rental_fears'], value]
      }));
    }
  };

  async function handleSubmit() {
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("role", role as string);
    formData.append("origin", window.location.origin);

    if (urlReferralCode) {
      formData.append("referralCode", urlReferralCode);
    }

    if (role === "landlord") {
      Object.entries(landlordForm).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => formData.append(key, v));
        } else if (value !== "" && value !== undefined) {
          formData.append(key, String(value));
        }
      });
    } else {
      Object.entries(renterForm).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => formData.append(key, v));
        } else if (value !== "" && value !== undefined) {
          formData.append(key, String(value));
        }
      });
    }

    const result = await submitWaitlist(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      setPosition(result.position || null);
      setReferralLink(result.referralLink || "");
      setReferralCode(result.referralCode || "");
    }
  }

  const shareText = `I just joined the UltraRentz pilot waitlist! 🏠\n\nJoin me and be part of the future of rental payments.\n\nUse my referral link:`;

  const shareOn = (platform: string) => {
    const urls: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent("I just joined the UltraRentz pilot waitlist! 🏠")}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralLink}`)}`,
      instagram: '',
    };
    if (platform === 'instagram') {
      if (navigator.share) {
        navigator.share({
          title: 'Join UltraRentz Waitlist',
          text: shareText,
          url: referralLink,
        }).catch(() => {});
      } else {
        copyToClipboard();
      }
      return;
    }
    window.open(urls[platform], '_blank');
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const canProceed = () => {
    if (role === "landlord") {
      if (step === 1) return landlordForm.email && landlordForm.phone_number && landlordForm.landlord_type && landlordForm.portfolio_size;
      if (step === 2) return landlordForm.deposit_scheme_provider;
      return true;
    } else {
      if (step === 1) return renterForm.email && renterForm.phone_number && renterForm.desired_location;
      if (step === 2) return renterForm.employment_type;
      return true;
    }
  };

  // Success Screen
  if (status === "success") {
    return (
      <section id="cta" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                You're on the list!
              </h2>
              {position && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-block"
                >
                  <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl px-8 py-4 mb-6">
                    <p className="text-gray-400 text-sm mb-1">Your position</p>
                    <p className="text-5xl font-bold text-blue-400">#{position}</p>
                  </div>
                </motion.div>
              )}
              <p className="text-gray-400 text-lg mb-8">
                We'll be in touch shortly with your access keys.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-lg">Share & Move Up!</h3>
                <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  Earn referrals
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Share your unique referral link and move up the waitlist for each friend who joins.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => shareOn('x')}
                  className="bg-black hover:bg-gray-900 border border-gray-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X (Twitter)
                </button>
                <button
                  onClick={() => shareOn('linkedin')}
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => shareOn('whatsapp')}
                  className="bg-[#25D366] hover:bg-[#1da851] text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => shareOn('reddit')}
                  className="bg-[#FF4500] hover:bg-[#cc3700] text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                  Reddit
                </button>
              </div>
              <button
                onClick={() => shareOn('instagram')}
                className="w-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                Share on Instagram
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Code: <span className="font-mono text-blue-400">{referralCode}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Role Selection
  if (!role) {
    return (
      <section id="cta" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Join the <span className="text-blue-400">Pilot Program</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Be among the first specifically selected Landlords and Renters to use UltraRentz.
            </p>
          </div>

          {urlReferralCode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 text-center"
            >
              <p className="text-blue-400 text-sm font-medium">
                🎉 You were referred! Join now to support your friend.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setRole("landlord")}
              className="group bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 text-left transition-all duration-300 hover:bg-gray-900/80"
            >
              <Building className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">I'm a Landlord</h3>
              <p className="text-gray-400 text-sm">
                Property owners, letting agents, and institutional landlords managing rentals.
              </p>
            </button>

            <button
              onClick={() => setRole("renter")}
              className="group bg-gray-900/50 border border-gray-800 hover:border-green-500/50 rounded-2xl p-8 text-left transition-all duration-300 hover:bg-gray-900/80"
            >
              <User className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">I'm a Renter</h3>
              <p className="text-gray-400 text-sm">
                Students, professionals, and anyone looking to rent a property.
              </p>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Multi-step Form
  return (
    <section id="cta" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={() => { setRole(null); setStep(1); }}
            className="text-gray-500 hover:text-white text-sm mb-4 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Change role
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {role === "landlord" ? "Landlord" : "Renter"} Registration
          </h2>
          <p className="text-gray-400">Step {step} of {totalSteps}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step ? (role === "landlord" ? "bg-blue-500" : "bg-green-500") : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-2xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* LANDLORD FORMS */}
            {role === "landlord" && (
              <>
                {step === 1 && (
                  <motion.div
                    key="landlord-step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={landlordForm.email}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={landlordForm.phone_number}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, phone_number: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          placeholder="+44 7700 900000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Landlord Type *</label>
                      <select
                        required
                        value={landlordForm.landlord_type}
                        onChange={(e) => setLandlordForm(prev => ({ ...prev, landlord_type: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      >
                        <option value="">Select type...</option>
                        <option value="individual">Individual Landlord</option>
                        <option value="limited_company">Limited Company</option>
                        <option value="letting_agent">Letting Agent</option>
                        <option value="institutional_pbsa">Institutional (PBSA)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Size *</label>
                        <select
                          required
                          value={landlordForm.portfolio_size}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, portfolio_size: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        >
                          <option value="">Select size...</option>
                          <option value="1">1 Property</option>
                          <option value="2-5">2–5 Properties</option>
                          <option value="6-20">6–20 Properties</option>
                          <option value="20+">20+ Properties</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Property Location</label>
                        <input
                          type="text"
                          value={landlordForm.property_location}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, property_location: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          placeholder="Postcode or Region"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="landlord-step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Current Setup & Pain Points</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Deposit Scheme</label>
                        <select
                          value={landlordForm.current_deposit_scheme}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, current_deposit_scheme: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        >
                          <option value="">Select scheme type...</option>
                          <option value="custodial">Custodial</option>
                          <option value="insurance_backed">Insurance-backed</option>
                          <option value="none_halls">None (Halls)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Deposit Scheme Provider *</label>
                        <select
                          required
                          value={landlordForm.deposit_scheme_provider}
                          onChange={(e) => setLandlordForm(prev => ({ ...prev, deposit_scheme_provider: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        >
                          <option value="">Select provider...</option>
                          <option value="mydeposit">MyDeposit</option>
                          <option value="tdp">TDP (Tenancy Deposit Scheme)</option>
                          <option value="dps">DPS (Deposit Protection Service)</option>
                          <option value="none">None / Not Applicable</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Biggest Headaches (select all that apply)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { value: "slow_deposit_release", label: "Slow deposit release" },
                          { value: "dispute_resolution", label: "Dispute resolution" },
                          { value: "admin_costs", label: "Admin costs" },
                          { value: "lack_of_yield", label: "Lack of yield on deposits" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700 transition">
                            <input
                              type="checkbox"
                              checked={landlordForm.biggest_headaches.includes(option.value)}
                              onChange={() => handleCheckboxChange('biggest_headaches', option.value, true)}
                              className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-gray-300 text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Do you use a Property Management System (PMS)?</label>
                      <div className="flex gap-4">
                        {["yes", "no"].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="has_pms"
                              value={opt}
                              checked={landlordForm.has_pms === opt}
                              onChange={(e) => {
                                e.stopPropagation();
                                setLandlordForm(prev => ({ ...prev, has_pms: e.target.value }));
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-gray-300 capitalize">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="landlord-step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Compliance & Verification</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">PRS Database Registration Status</label>
                      <p className="text-xs text-gray-500 mb-2">Have you registered your properties on the 2026 Private Rented Sector Database?</p>
                      <select
                        value={landlordForm.prs_database_status}
                        onChange={(e) => setLandlordForm(prev => ({ ...prev, prs_database_status: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      >
                        <option value="">Select status...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="in_progress">In Progress</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Web3 Familiarity: {landlordForm.web3_familiarity}/5
                      </label>
                      <p className="text-xs text-gray-500 mb-3">How comfortable are you with digital assets or automated smart contracts?</p>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={landlordForm.web3_familiarity}
                        onChange={(e) => setLandlordForm(prev => ({ ...prev, web3_familiarity: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Not familiar</span>
                        <span>Very comfortable</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn or Website (optional)</label>
                      <input
                        type="url"
                        value={landlordForm.linkedin_website}
                        onChange={(e) => setLandlordForm(prev => ({ ...prev, linkedin_website: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                      <p className="text-xs text-gray-500 mt-1">Helps verify you're a legitimate professional landlord</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* RENTER FORMS */}
            {role === "renter" && (
              <>
                {step === 1 && (
                  <motion.div
                    key="renter-step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={renterForm.email}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={renterForm.phone_number}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, phone_number: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                          placeholder="+44 7700 900000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Target Moving Date</label>
                        <input
                          type="date"
                          value={renterForm.target_moving_date}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, target_moving_date: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition scheme-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Desired Location *</label>
                        <input
                          type="text"
                          required
                          value={renterForm.desired_location}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, desired_location: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                          placeholder="City or Postcode"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Rent (£/month)</label>
                        <input
                          type="number"
                          value={renterForm.current_rent}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, current_rent: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                          placeholder="1500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Budget (£/month)</label>
                        <input
                          type="number"
                          value={renterForm.budget}
                          onChange={(e) => setRenterForm(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                          placeholder="1800"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="renter-step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Your Situation</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Student Status</label>
                      <select
                        value={renterForm.student_status}
                        onChange={(e) => setRenterForm(prev => ({ ...prev, student_status: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                      >
                        <option value="">Select status...</option>
                        <option value="university">University Student</option>
                        <option value="private_hmo">Private HMO</option>
                        <option value="hall">Student Hall</option>
                        <option value="not_student">Not a Student</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Moving Status</label>
                      <select
                        value={renterForm.moving_status}
                        onChange={(e) => setRenterForm(prev => ({ ...prev, moving_status: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                      >
                        <option value="">Select status...</option>
                        <option value="currently_looking">Currently Looking</option>
                        <option value="tenancy_ends_3_6_months">Tenancy Ends in 3–6 Months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type *</label>
                      <select
                        required
                        value={renterForm.employment_type}
                        onChange={(e) => setRenterForm(prev => ({ ...prev, employment_type: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                      >
                        <option value="">Select type...</option>
                        <option value="full_time">Full-time Employed</option>
                        <option value="student">Student</option>
                        <option value="self_employed">Self-employed</option>
                        <option value="international">International (No UK Credit History)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">This helps us identify who needs our Fiat Onramp feature most</p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="renter-step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Your Biggest Rental Fears</h3>
                    <p className="text-gray-400 text-sm mb-4">Select all that apply - this helps us prioritize features</p>

                    <div className="space-y-3">
                      {[
                        { value: "deposit_withheld", label: "Landlord withholding deposit unfairly" },
                        { value: "two_deposits_at_once", label: "Having to pay two deposits at once when moving" },
                        { value: "56_year_wait", label: "The 56-year wait for a home deposit (average UK savings rate)" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-start gap-3 p-4 bg-gray-950 border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700 transition">
                          <input
                            type="checkbox"
                            checked={renterForm.biggest_rental_fears.includes(option.value)}
                            onChange={() => handleCheckboxChange('biggest_rental_fears', option.value, false)}
                            className="w-5 h-5 mt-0.5 rounded border-gray-600 text-green-500 focus:ring-green-500"
                          />
                          <span className="text-gray-300">{option.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-6">
                      <p className="text-green-400 text-sm">
                        💡 <strong>Did you know?</strong> With UltraRentz, your deposit earns yield while protected in escrow. A £1,500 deposit could earn you passive income over your tenancy!
                      </p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {errorMessage}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-6 py-3 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  role === "landlord"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-green-600 hover:bg-green-500 text-white"
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed ${
                  role === "landlord"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-green-600 hover:bg-green-500 text-white"
                }`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
