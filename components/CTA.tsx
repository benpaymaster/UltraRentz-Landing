"use client";

import { useState, useEffect } from "react";
import { submitWaitlist } from "@/app/actions";
import { Loader2, CheckCircle, Building, User, Share2, Copy, ChevronRight, ChevronLeft } from "lucide-react";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  const shareOnX = () => {
    const text = `I just joined the UltraRentz pilot waitlist! 🏠\n\nJoin me and be part of the future of rental payments.\n\nUse my referral link:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
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

  const totalSteps = role === "landlord" ? 3 : 3;

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

              <button
                onClick={shareOnX}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
              >
                <Share2 className="w-5 h-5" />
                Share on X (Twitter)
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

        <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-2xl p-6 md:p-8">
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
                              onChange={(e) => setLandlordForm(prev => ({ ...prev, has_pms: e.target.value }))}
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
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
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
                type="submit"
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
        </form>
      </div>
    </section>
  );
}
