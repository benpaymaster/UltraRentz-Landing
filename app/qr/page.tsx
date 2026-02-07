"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PILOT_URL = "https://ultrarentz.vercel.app/#pilot-signup";

export default function QRPage() {
  return (
    <main className="min-h-screen bg-[#090b1a] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Join the <span className="text-blue-400">Pilot Program</span>
        </h1>
        <p className="text-gray-400 mb-8">
          Scan the QR code to sign up for the UltraRentz pilot program on your mobile device.
        </p>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 inline-block">
          <div className="bg-white p-6 rounded-xl inline-block">
            <QRCodeSVG
              value={PILOT_URL}
              size={240}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              marginSize={0}
            />
          </div>
          <p className="text-gray-500 text-sm mt-6">Point your camera at the code</p>
        </div>

        <p className="text-gray-500 text-xs mt-8">
          Or visit{" "}
          <a href={PILOT_URL} className="text-blue-400 hover:underline">
            ultrarentz.vercel.app
          </a>{" "}
          directly
        </p>
      </div>
    </main>
  );
}
