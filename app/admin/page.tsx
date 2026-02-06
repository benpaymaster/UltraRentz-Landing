'use client';

import { useEffect, useState } from 'react';
import { fetchWaitlist, fetchPilotSignups } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Users, Building2, Home, Share2, Search, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface PilotSignup {
  id: string;
  name: string;
  email: string;
  role: 'landlord' | 'renter';
  university_name: string;
  gdpr_consent: boolean;
  referral_code: string;
  referral_count: number;
  position: number;
  created_at: string;
  // Landlord-specific fields
  landlord_type?: string;
  portfolio_size?: string;
  property_location?: string;
  current_deposit_scheme?: string;
  deposit_scheme_provider?: string;
  biggest_headaches?: string[];
  has_pms?: boolean;
  prs_db_status?: string;
  web3_familiarity?: number;
  phone_number?: string;
  linkedin_website?: string;
  letter_of_intent?: boolean;
}

interface WaitlistEntry {
  id: string;
  email: string;
  role: 'landlord' | 'renter';
  phone_number?: string;
  position: number;
  referral_code: string;
  referral_count: number;
  created_at: string;
  // Landlord fields
  property_details?: string;
  landlord_type?: string;
  portfolio_size?: string;
  property_location?: string;
  current_deposit_scheme?: string;
  deposit_scheme_provider?: string;
  biggest_headaches?: string[];
  has_pms?: boolean;
  prs_database_status?: string;
  web3_familiarity?: number;
  linkedin_website?: string;
  // Renter fields
  target_moving_date?: string;
  desired_location?: string;
  current_rent?: number;
  budget?: number;
  student_status?: string;
  moving_status?: string;
  employment_type?: string;
  biggest_rental_fears?: string[];
}

type TabFilter = 'all' | 'landlord' | 'renter';

const LABEL_MAP: Record<string, string> = {
  individual: 'Individual',
  limited_company: 'Limited Company',
  letting_agent: 'Letting Agent',
  institutional_pbsa: 'Institutional / PBSA',
  custodial: 'Custodial',
  insurance_backed: 'Insurance-backed',
  none_halls: 'None / Halls',
  mydeposit: 'MyDeposit',
  tdp: 'TDP',
  dps: 'DPS',
  none: 'None',
  yes: 'Yes',
  no: 'No',
  in_progress: 'In Progress',
  slow_deposit_release: 'Slow Deposit Release',
  dispute_resolution: 'Dispute Resolution',
  admin_costs: 'Admin Costs',
  lack_of_yield: 'Lack of Yield',
  university: 'University Student',
  private_hmo: 'Private HMO',
  hall: 'Halls',
  not_student: 'Not a Student',
  currently_looking: 'Currently Looking',
  tenancy_ends_3_6_months: 'Tenancy Ends in 3-6 Months',
  full_time: 'Full-time',
  student: 'Student',
  self_employed: 'Self-employed',
  international: 'International',
  deposit_withheld: 'Deposit Withheld',
  two_deposits_at_once: 'Two Deposits at Once',
  '56_year_wait': '5-6 Year Wait',
};

function label(key: string | undefined | null): string {
  if (!key) return '—';
  return LABEL_MAP[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '—';
  return `£${amount.toLocaleString()}`;
}

type DataView = 'pilot' | 'legacy';

export default function AdminPage() {
  const [dataView, setDataView] = useState<DataView>('pilot');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [pilotEntries, setPilotEntries] = useState<PilotSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'created_at' | 'position' | 'referral_count'>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  async function loadData() {
    setLoading(true);
    setError('');
    const [pilotResult, waitlistResult] = await Promise.all([
      fetchPilotSignups(),
      fetchWaitlist(),
    ]);
    if (pilotResult.error) {
      setError(pilotResult.error);
    } else {
      setPilotEntries(pilotResult.data || []);
    }
    if (waitlistResult.error && !pilotResult.error) {
      setError(waitlistResult.error);
    } else {
      setEntries(waitlistResult.data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filtered = entries
    .filter(e => activeTab === 'all' || e.role === activeTab)
    .filter(e => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.email.toLowerCase().includes(q) ||
        e.referral_code.toLowerCase().includes(q) ||
        (e.property_location || '').toLowerCase().includes(q) ||
        (e.desired_location || '').toLowerCase().includes(q) ||
        (e.phone_number || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortField] ?? 0;
      const bVal = b[sortField] ?? 0;
      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

  // Pilot signups filtering
  const filteredPilot = pilotEntries
    .filter(e => activeTab === 'all' || e.role === activeTab)
    .filter(e => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.referral_code.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortField] ?? 0;
      const bVal = b[sortField] ?? 0;
      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

  const activeEntries = dataView === 'pilot' ? pilotEntries : entries;
  const totalCount = activeEntries.length;
  const landlordCount = activeEntries.filter(e => e.role === 'landlord').length;
  const renterCount = activeEntries.filter(e => e.role === 'renter').length;
  const totalReferrals = activeEntries.reduce((sum, e) => sum + (e.referral_count || 0), 0);

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function SortIcon({ field }: { field: typeof sortField }) {
    if (sortField !== field) return null;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />;
  }

  return (
    <main className="bg-mainbg min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-base sm:text-xl font-bold">Waitlist Dashboard</h1>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Data View Toggle */}
        <div className="flex bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden w-fit mb-6">
          <button
            onClick={() => setDataView('pilot')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              dataView === 'pilot' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Pilot Signups
          </button>
          <button
            onClick={() => setDataView('legacy')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              dataView === 'legacy' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Legacy Waitlist
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm mb-1">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">Total Signups</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{totalCount}</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm mb-1">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">Landlords</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-400">{landlordCount}</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm mb-1">
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">Renters</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-400">{renterCount}</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm mb-1">
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate">Referrals</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-400">{totalReferrals}</div>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6">
          <div className="flex bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden w-full sm:w-fit">
            {(['all', 'landlord', 'renter'] as TabFilter[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab === 'all' ? `All (${totalCount})` : tab === 'landlord' ? `Landlords (${landlordCount})` : `Renters (${renterCount})`}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search email, code, location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            {/* Mobile Sort */}
            <div className="flex gap-2 md:hidden">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as typeof sortField)}
                className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="created_at">Sort by Date</option>
                <option value="position">Sort by Position</option>
                <option value="referral_count">Sort by Referrals</option>
              </select>
              <button
                onClick={() => setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                {sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6 text-red-300">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? 'No results match your search.' : 'No entries yet.'}
          </div>
        )}

        {/* Pilot Signups View */}
        {dataView === 'pilot' && !loading && filteredPilot.length > 0 && (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredPilot.map(entry => (
                <PilotMobileCard
                  key={entry.id}
                  entry={entry}
                  expanded={expandedRow === entry.id}
                  onToggle={() => setExpandedRow(prev => (prev === entry.id ? null : entry.id))}
                />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('position')}>
                      # <SortIcon field="position" />
                    </th>
                    <th className="py-3 px-3 font-medium">Name</th>
                    <th className="py-3 px-3 font-medium">Email</th>
                    <th className="py-3 px-3 font-medium">Role</th>
                    <th className="py-3 px-3 font-medium">University</th>
                    <th className="py-3 px-3 font-medium">GDPR</th>
                    <th className="py-3 px-3 font-medium">Referral Code</th>
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('referral_count')}>
                      Referrals <SortIcon field="referral_count" />
                    </th>
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('created_at')}>
                      Joined <SortIcon field="created_at" />
                    </th>
                    <th className="py-3 px-3 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPilot.map(entry => (
                    <PilotTableRow
                      key={entry.id}
                      entry={entry}
                      expanded={expandedRow === entry.id}
                      onToggle={() => setExpandedRow(prev => (prev === entry.id ? null : entry.id))}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {dataView === 'pilot' && !loading && filteredPilot.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? 'No results match your search.' : 'No pilot signups yet.'}
          </div>
        )}

        {/* Legacy Waitlist View */}
        {dataView === 'legacy' && !loading && filtered.length > 0 && (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filtered.map(entry => (
                <MobileCard
                  key={entry.id}
                  entry={entry}
                  expanded={expandedRow === entry.id}
                  onToggle={() => setExpandedRow(prev => (prev === entry.id ? null : entry.id))}
                />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-left">
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('position')}>
                      # <SortIcon field="position" />
                    </th>
                    <th className="py-3 px-3 font-medium">Email</th>
                    <th className="py-3 px-3 font-medium">Role</th>
                    <th className="py-3 px-3 font-medium">Phone</th>
                    <th className="py-3 px-3 font-medium">Referral Code</th>
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('referral_count')}>
                      Referrals <SortIcon field="referral_count" />
                    </th>
                    <th className="py-3 px-3 font-medium cursor-pointer hover:text-white" onClick={() => toggleSort('created_at')}>
                      Joined <SortIcon field="created_at" />
                    </th>
                    <th className="py-3 px-3 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(entry => (
                    <TableRow
                      key={entry.id}
                      entry={entry}
                      expanded={expandedRow === entry.id}
                      onToggle={() => setExpandedRow(prev => (prev === entry.id ? null : entry.id))}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {dataView === 'legacy' && !loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? 'No results match your search.' : 'No entries yet.'}
          </div>
        )}

        {/* Count */}
        {!loading && (dataView === 'pilot' ? filteredPilot.length : filtered.length) > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            Showing {dataView === 'pilot' ? filteredPilot.length : filtered.length} of {totalCount} entries
          </div>
        )}
      </div>
    </main>
  );
}

function MobileCard({ entry, expanded, onToggle }: { entry: WaitlistEntry; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 text-xs">#{entry.position}</span>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
              entry.role === 'landlord'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {entry.role === 'landlord' ? 'Landlord' : 'Renter'}
            </span>
          </div>
          <p className="font-medium text-sm truncate">{entry.email}</p>
        </div>
        <button
          onClick={onToggle}
          className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center gap-1 shrink-0"
        >
          {expanded ? 'Hide' : 'View'}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-500">Phone:</span>
          <span className="ml-1 text-gray-300">{entry.phone_number || '—'}</span>
        </div>
        <div>
          <span className="text-gray-500">Joined:</span>
          <span className="ml-1 text-gray-300">{formatDate(entry.created_at)}</span>
        </div>
        <div>
          <span className="text-gray-500">Code:</span>
          <code className="ml-1 bg-gray-800 px-1.5 py-0.5 rounded text-xs">{entry.referral_code}</code>
        </div>
        <div>
          <span className="text-gray-500">Referrals:</span>
          <span className="ml-1 text-purple-400 font-medium">{entry.referral_count}</span>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          {entry.role === 'landlord' ? (
            <LandlordDetails entry={entry} />
          ) : (
            <RenterDetails entry={entry} />
          )}
        </div>
      )}
    </div>
  );
}

function TableRow({ entry, expanded, onToggle }: { entry: WaitlistEntry; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
        <td className="py-3 px-3 text-gray-400">{entry.position}</td>
        <td className="py-3 px-3 font-medium">{entry.email}</td>
        <td className="py-3 px-3">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            entry.role === 'landlord'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-green-500/20 text-green-400'
          }`}>
            {entry.role === 'landlord' ? 'Landlord' : 'Renter'}
          </span>
        </td>
        <td className="py-3 px-3 text-gray-400">{entry.phone_number || '—'}</td>
        <td className="py-3 px-3">
          <code className="text-xs bg-gray-800 px-2 py-0.5 rounded">{entry.referral_code}</code>
        </td>
        <td className="py-3 px-3 text-gray-400">{entry.referral_count}</td>
        <td className="py-3 px-3 text-gray-400">{formatDate(entry.created_at)}</td>
        <td className="py-3 px-3">
          <button
            onClick={onToggle}
            className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center gap-1"
          >
            {expanded ? 'Hide' : 'View'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-800/50">
          <td colSpan={8} className="px-3 py-4">
            <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
              {entry.role === 'landlord' ? (
                <LandlordDetails entry={entry} />
              ) : (
                <RenterDetails entry={entry} />
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function LandlordDetails({ entry }: { entry: WaitlistEntry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      <DetailField label="Landlord Type" value={label(entry.landlord_type)} />
      <DetailField label="Portfolio Size" value={entry.portfolio_size ? `${entry.portfolio_size} properties` : '—'} />
      <DetailField label="Property Location" value={entry.property_location || '—'} />
      <DetailField label="Deposit Scheme" value={label(entry.current_deposit_scheme)} />
      <DetailField label="Scheme Provider" value={label(entry.deposit_scheme_provider)} />
      <DetailField label="Uses PMS" value={entry.has_pms === true ? 'Yes' : entry.has_pms === false ? 'No' : '—'} />
      <DetailField label="PRS Database" value={label(entry.prs_database_status)} />
      <DetailField label="Web3 Familiarity" value={entry.web3_familiarity ? `${entry.web3_familiarity}/5` : '—'} />
      <DetailField label="LinkedIn / Website" value={entry.linkedin_website || '—'} isLink={!!entry.linkedin_website} />
      <DetailField
        label="Biggest Headaches"
        value={entry.biggest_headaches?.length ? entry.biggest_headaches.map(h => label(h)).join(', ') : '—'}
      />
      {entry.property_details && (
        <DetailField label="Property Details" value={entry.property_details} />
      )}
    </div>
  );
}

function RenterDetails({ entry }: { entry: WaitlistEntry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      <DetailField label="Target Moving Date" value={entry.target_moving_date ? formatDate(entry.target_moving_date) : '—'} />
      <DetailField label="Desired Location" value={entry.desired_location || '—'} />
      <DetailField label="Current Rent" value={formatCurrency(entry.current_rent)} />
      <DetailField label="Budget" value={formatCurrency(entry.budget)} />
      <DetailField label="Student Status" value={label(entry.student_status)} />
      <DetailField label="Moving Status" value={label(entry.moving_status)} />
      <DetailField label="Employment Type" value={label(entry.employment_type)} />
      <DetailField
        label="Biggest Rental Fears"
        value={entry.biggest_rental_fears?.length ? entry.biggest_rental_fears.map(f => label(f)).join(', ') : '—'}
      />
    </div>
  );
}

function DetailField({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div>
      <div className="text-gray-500 text-xs mb-0.5">{label}</div>
      {isLink && value !== '—' ? (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
          {value}
        </a>
      ) : (
        <div className="text-gray-200 break-all">{value}</div>
      )}
    </div>
  );
}

// ── Pilot Signup Components ───────────────────────────────────────────────

function PilotMobileCard({ entry, expanded, onToggle }: { entry: PilotSignup; expanded: boolean; onToggle: () => void }) {
  const hasDetails = entry.role === 'landlord' && entry.landlord_type;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 text-xs">#{entry.position}</span>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
              entry.role === 'landlord' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {entry.role === 'landlord' ? 'Landlord' : 'Renter'}
            </span>
          </div>
          <p className="font-medium text-sm">{entry.name}</p>
          <p className="text-gray-400 text-xs truncate">{entry.email}</p>
        </div>
        {hasDetails && (
          <button
            onClick={onToggle}
            className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center gap-1 shrink-0"
          >
            {expanded ? 'Hide' : 'View'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="col-span-2">
          <span className="text-gray-500">University:</span>
          <span className="ml-1 text-gray-300">{entry.university_name}</span>
        </div>
        {entry.phone_number && (
          <div className="col-span-2">
            <span className="text-gray-500">Phone:</span>
            <span className="ml-1 text-gray-300">{entry.phone_number}</span>
          </div>
        )}
        <div>
          <span className="text-gray-500">Code:</span>
          <code className="ml-1 bg-gray-800 px-1.5 py-0.5 rounded text-xs">{entry.referral_code}</code>
        </div>
        <div>
          <span className="text-gray-500">Referrals:</span>
          <span className="ml-1 text-purple-400 font-medium">{entry.referral_count}</span>
        </div>
        <div>
          <span className="text-gray-500">GDPR:</span>
          <span className={`ml-1 ${entry.gdpr_consent ? 'text-green-400' : 'text-red-400'}`}>
            {entry.gdpr_consent ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Joined:</span>
          <span className="ml-1 text-gray-300">{formatDate(entry.created_at)}</span>
        </div>
      </div>

      {expanded && entry.role === 'landlord' && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <PilotLandlordDetails entry={entry} />
        </div>
      )}
    </div>
  );
}

function PilotTableRow({ entry, expanded, onToggle }: { entry: PilotSignup; expanded: boolean; onToggle: () => void }) {
  const hasDetails = entry.role === 'landlord' && entry.landlord_type;

  return (
    <>
      <tr className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
        <td className="py-3 px-3 text-gray-400">{entry.position}</td>
        <td className="py-3 px-3 font-medium">{entry.name}</td>
        <td className="py-3 px-3 text-gray-300">{entry.email}</td>
        <td className="py-3 px-3">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            entry.role === 'landlord' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {entry.role === 'landlord' ? 'Landlord' : 'Renter'}
          </span>
        </td>
        <td className="py-3 px-3 text-gray-300 text-xs">{entry.university_name}</td>
        <td className="py-3 px-3">
          <span className={`text-xs ${entry.gdpr_consent ? 'text-green-400' : 'text-red-400'}`}>
            {entry.gdpr_consent ? 'Consented' : 'No'}
          </span>
        </td>
        <td className="py-3 px-3">
          <code className="text-xs bg-gray-800 px-2 py-0.5 rounded">{entry.referral_code}</code>
        </td>
        <td className="py-3 px-3 text-gray-400">{entry.referral_count}</td>
        <td className="py-3 px-3 text-gray-400">{formatDate(entry.created_at)}</td>
        <td className="py-3 px-3">
          {hasDetails ? (
            <button
              onClick={onToggle}
              className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center gap-1"
            >
              {expanded ? 'Hide' : 'View'}
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <span className="text-gray-600 text-xs">—</span>
          )}
        </td>
      </tr>
      {expanded && entry.role === 'landlord' && (
        <tr className="border-b border-gray-800/50">
          <td colSpan={10} className="px-3 py-4">
            <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
              <PilotLandlordDetails entry={entry} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function PilotLandlordDetails({ entry }: { entry: PilotSignup }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      <DetailField label="Landlord Type" value={label(entry.landlord_type)} />
      <DetailField label="Portfolio Size" value={entry.portfolio_size ? `${entry.portfolio_size} properties` : '—'} />
      <DetailField label="Property Location" value={entry.property_location || '—'} />
      <DetailField label="Deposit Scheme" value={label(entry.current_deposit_scheme)} />
      <DetailField label="Scheme Provider" value={label(entry.deposit_scheme_provider)} />
      <DetailField label="Uses PMS" value={entry.has_pms === true ? 'Yes' : entry.has_pms === false ? 'No' : '—'} />
      <DetailField label="PRS Database" value={label(entry.prs_db_status)} />
      <DetailField label="Web3 Familiarity" value={entry.web3_familiarity ? `${entry.web3_familiarity}/5` : '—'} />
      <DetailField label="Phone Number" value={entry.phone_number || '—'} />
      <DetailField label="LinkedIn / Website" value={entry.linkedin_website || '—'} isLink={!!entry.linkedin_website} />
      <DetailField
        label="Letter of Intent"
        value={entry.letter_of_intent ? 'Confirmed' : 'Not confirmed'}
      />
      <DetailField
        label="Biggest Headaches"
        value={entry.biggest_headaches?.length ? entry.biggest_headaches.map(h => label(h)).join(', ') : '—'}
      />
    </div>
  );
}
