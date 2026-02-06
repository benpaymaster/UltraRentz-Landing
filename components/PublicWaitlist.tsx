"use client";

import { useEffect, useState } from "react";
import { fetchPublicWaitlistStats } from "@/app/actions";
import { Building, User, Users, ChevronLeft, ChevronRight, CheckCircle, XCircle, FileText, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

interface WaitlistEntry {
  position: number;
  role: "landlord" | "renter";
  joinedAt: string;
  gdprConsent: boolean;
  letterOfIntent: boolean | null;
  university: string | null;
}

interface WaitlistStats {
  totalCount: number;
  landlordCount: number;
  renterCount: number;
  waitlist: WaitlistEntry[];
}

const ITEMS_PER_PAGE = 10;

export default function PublicWaitlist() {
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadStats() {
      const result = await fetchPublicWaitlistStats();
      if (!result.error && result.totalCount !== undefined) {
        setStats({
          totalCount: result.totalCount,
          landlordCount: result.landlordCount!,
          renterCount: result.renterCount!,
          waitlist: result.waitlist! as WaitlistEntry[],
        });
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!stats || stats.totalCount === 0) {
    return null;
  }

  const totalPages = Math.ceil(stats.waitlist.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedEntries = stats.waitlist.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Pilot Waitlist
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Join {stats.totalCount} others already signed up for the pilot
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 md:p-6 text-center"
            >
              <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white">{stats.totalCount}</p>
              <p className="text-gray-400 text-xs md:text-sm">Total Signups</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 md:p-6 text-center"
            >
              <Building className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white">{stats.landlordCount}</p>
              <p className="text-gray-400 text-xs md:text-sm">Landlords</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 md:p-6 text-center"
            >
              <User className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white">{stats.renterCount}</p>
              <p className="text-gray-400 text-xs md:text-sm">Renters</p>
            </motion.div>
          </div>

          {/* Waitlist Table */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold text-white">Waitlist</h3>
              <span className="text-gray-500 text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-800/50">
              {displayedEntries.map((entry, index) => (
                <motion.div
                  key={entry.position}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="px-4 py-3 hover:bg-gray-800/30 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-mono text-sm">#{entry.position}</span>
                      {entry.role === "landlord" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          <Building className="w-3 h-3" />
                          Landlord
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          <User className="w-3 h-3" />
                          Renter
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs">{formatTimeAgo(entry.joinedAt)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      GDPR:
                      {entry.gdprConsent ? (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-400" />
                      )}
                    </span>
                    {entry.role === "landlord" && (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        LOI:
                        {entry.letterOfIntent ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                      </span>
                    )}
                    {entry.role === "renter" && entry.university && (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <GraduationCap className="w-3 h-3" />
                        {entry.university.length > 20 ? entry.university.substring(0, 20) + "..." : entry.university}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="py-3 px-4 font-medium">#</th>
                    <th className="py-3 px-4 font-medium">Role</th>
                    <th className="py-3 px-4 font-medium">GDPR</th>
                    <th className="py-3 px-4 font-medium">Letter of Intent</th>
                    <th className="py-3 px-4 font-medium">University</th>
                    <th className="py-3 px-4 font-medium text-right">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEntries.map((entry, index) => (
                    <motion.tr
                      key={entry.position}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
                    >
                      <td className="py-3 px-4 text-gray-500 font-mono">{entry.position}</td>
                      <td className="py-3 px-4">
                        {entry.role === "landlord" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                            <Building className="w-3 h-3" />
                            Landlord
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <User className="w-3 h-3" />
                            Renter
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {entry.gdprConsent ? (
                          <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                            <CheckCircle className="w-4 h-4" />
                            Consented
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                            <XCircle className="w-4 h-4" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {entry.role === "landlord" ? (
                          entry.letterOfIntent ? (
                            <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                              <FileText className="w-4 h-4" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                              <FileText className="w-4 h-4" />
                              Pending
                            </span>
                          )
                        ) : (
                          <span className="text-gray-600 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {entry.role === "renter" && entry.university ? (
                          <span className="inline-flex items-center gap-1 text-gray-300 text-xs">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                            {entry.university}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs text-right">
                        {formatTimeAgo(entry.joinedAt)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-4 md:px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {/* Show page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
