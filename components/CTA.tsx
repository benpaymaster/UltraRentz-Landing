"use client";

import { useState, useEffect } from "react";
import { submitWaitlist } from "@/app/actions";
import { Loader2, CheckCircle, Building, User, Info, Share2, Copy } from "lucide-react";
import { motion } from "motion/react";

export default function CTA() {
  const [role, setRole] = useState<"landlord" | "renter">("landlord");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [urlReferralCode, setUrlReferralCode] = useState<string | null>(null);

  // Check URL for referral code on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setUrlReferralCode(ref);
      }
    }
  }, []);

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrorMessage("");

    // Append role manually since it's a state, not a simple input (visual buttons)
    formData.append("role", role);

    // Append referral code if present in URL
    if (urlReferralCode) {
      formData.append("referralCode", urlReferralCode);
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
      // Modern async clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
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

             {/* Referral Section */}
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

               {/* Referral Link */}
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

               {/* Share on X Button */}
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

  return (
    <section id="cta" className="py-24 px-4 md:px-12 bg-[#090b1a] relative overflow-hidden">
      {/* Glow Effects */}
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

        <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Referral Banner */}
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

          <form action={handleSubmit} className="space-y-6">

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("landlord")}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    role === "landlord"
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50"
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800/80"
                  }`}
                >
                  <Building className="w-6 h-6" />
                  <span className="font-semibold">Landlord</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("renter")}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    role === "renter"
                      ? "bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/50"
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800/80"
                  }`}
                >
                  <User className="w-6 h-6" />
                  <span className="font-semibold">Renter</span>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                required
                name="email"
                type="email"
                placeholder="you@company.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Property Details */}
            <div className="space-y-2">
               <div className="flex justify-between items-center">
                 <label htmlFor="propertyDetails" className="text-sm font-medium text-gray-300 ml-1">
                   {role === 'landlord' ? 'Property Details' : 'Renting Preferences'}
                 </label>
                 <div className="group relative">
                    <Info className="w-4 h-4 text-gray-500 cursor-help" />
                    <div className="absolute right-0 bottom-6 w-48 p-2 bg-gray-800 text-xs text-gray-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none">
                       {role === 'landlord' ? 'Tell us about your portfolio (e.g., 5 units in NY).' : 'Where are you looking to rent?'}
                    </div>
                 </div>
               </div>
              <textarea
                required
                name="propertyDetails"
                rows={3}
                placeholder={role === 'landlord' ? "e.g. 3 Apartments in Austin, TX" : "e.g. Looking for a 1BR in Miami"}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
              />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <button
              disabled={status === "loading"}
              type="submit"
              className="w-full py-4 bg-white text-black font-bold rounded-xl shadow-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Join Pilot Waitlist"
              )}
            </button>
          </form>
           
           {/* <p className="mt-6 text-center text-xs text-gray-500">
             Limited spots available. No spam, secure data.
           </p> */}
        </div>
      </div>
    </section>
  );
}
