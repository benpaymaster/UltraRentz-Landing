"use client";

import { useState } from "react";

type UserGroup =
  | "university"
  | "real-estate-agent"
  | "housing-association"
  | "rent-deposit-scheme";

interface FormData {
  userGroup: UserGroup | "";
  primaryContactName: string;
  email: string;
  phone: string;
  legalEntityName: string;
  countryOfOperation: string;
  legalAddress: string;

  totalStudentHousingCapacity?: string;
  internationalStudentRatio?: string;
  totalDepositsManagedAnnually?: string;
  ukDepositSchemeMembership?: string;
  totalHousingUnitsManaged?: string;
  targetedUnitsForPilot?: string;
  currentFundsUnderManagement?: string;
  schemeType?: string;

  keyDecisionMakerName: string;
  keyDecisionMakerTitle: string;
}

export default function CTA() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userGroup: "",
    primaryContactName: "",
    email: "",
    phone: "",
    legalEntityName: "",
    countryOfOperation: "",
    legalAddress: "",
    keyDecisionMakerName: "",
    keyDecisionMakerTitle: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We'll be in touch soon.");
  };

  const renderUserGroupSpecificFields = () => {
    switch (formData.userGroup) {
      case "university":
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                University Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Total Student Housing Capacity
                </label>
                <input
                  type="number"
                  value={formData.totalStudentHousingCapacity || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "totalStudentHousingCapacity",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  International Student Ratio (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.internationalStudentRatio || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "internationalStudentRatio",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 25"
                  required
                />
              </div>
            </div>
          </>
        );

      case "real-estate-agent":
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Real Estate Agent Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Total Deposits Managed Annually
                </label>
                <input
                  type="number"
                  value={formData.totalDepositsManagedAnnually || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "totalDepositsManagedAnnually",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Current UK Deposit Scheme Membership
                </label>
                <select
                  value={formData.ukDepositSchemeMembership || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "ukDepositSchemeMembership",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select membership status</option>
                  <option value="TDS">Tenancy Deposit Scheme (TDS)</option>
                  <option value="DPS">Deposit Protection Service (DPS)</option>
                  <option value="mydeposits">mydeposits</option>
                  <option value="none">Not currently a member</option>
                </select>
              </div>
            </div>
          </>
        );

      case "housing-association":
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Housing Association Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Total Housing Units Managed
                </label>
                <input
                  type="number"
                  value={formData.totalHousingUnitsManaged || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "totalHousingUnitsManaged",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Targeted Number of Units for Pilot
                </label>
                <input
                  type="number"
                  value={formData.targetedUnitsForPilot || ""}
                  onChange={(e) =>
                    handleInputChange("targetedUnitsForPilot", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 500"
                  required
                />
              </div>
            </div>
          </>
        );

      case "rent-deposit-scheme":
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Rent Deposit Scheme Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Current Funds Under Management (FUM)
                </label>
                <input
                  type="number"
                  value={formData.currentFundsUnderManagement || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "currentFundsUnderManagement",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50000000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Scheme Type
                </label>
                <select
                  value={formData.schemeType || ""}
                  onChange={(e) =>
                    handleInputChange("schemeType", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select scheme type</option>
                  <option value="custodial">Custodial</option>
                  <option value="insured">Insured</option>
                </select>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (!showForm) {
    return (
      <section id="cta" className="py-20 px-12 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Protect Your Deposit?</h2>
        <p className="mt-5 text-lg max-w-lg mx-auto">
          Join our pilot program and experience secure, transparent rent
          deposits today.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-8 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition"
        >
          Join Pilot
        </button>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 px-12 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Pilot Registration</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Join our pilot program and help shape the future of secure rent
            deposits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User Group Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Which best describes you?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: "university", label: "University" },
                { value: "real-estate-agent", label: "Real Estate Agent" },
                { value: "housing-association", label: "Housing Association" },
                { value: "rent-deposit-scheme", label: "Rent Deposit Scheme" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="userGroup"
                    value={option.value}
                    checked={formData.userGroup === option.value}
                    onChange={(e) =>
                      handleInputChange("userGroup", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <span className="text-white font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* General Contact & Legal Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              General Contact & Legal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Primary Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.primaryContactName}
                  onChange={(e) =>
                    handleInputChange("primaryContactName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+44 20 1234 5678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Legal Entity Name *
                </label>
                <input
                  type="text"
                  value={formData.legalEntityName}
                  onChange={(e) =>
                    handleInputChange("legalEntityName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University of Example"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Country of Operation *
                </label>
                <input
                  type="text"
                  value={formData.countryOfOperation}
                  onChange={(e) =>
                    handleInputChange("countryOfOperation", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="United Kingdom"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-white mb-2">
                Legal Address *
              </label>
              <textarea
                value={formData.legalAddress}
                onChange={(e) =>
                  handleInputChange("legalAddress", e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 University Street, City, Postcode, Country"
                rows={3}
                required
              />
            </div>
          </div>

          {/* User Group Specific Fields */}
          {formData.userGroup && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              {renderUserGroupSpecificFields()}
            </div>
          )}

          {/* Key Decision-Maker Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Key Decision-Maker Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Name/Title of Head of Department *
                </label>
                <input
                  type="text"
                  value={formData.keyDecisionMakerName}
                  onChange={(e) =>
                    handleInputChange("keyDecisionMakerName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Department/Title *
                </label>
                <input
                  type="text"
                  value={formData.keyDecisionMakerTitle}
                  onChange={(e) =>
                    handleInputChange("keyDecisionMakerTitle", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Head of Accommodation"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-500 hover:text-white transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
