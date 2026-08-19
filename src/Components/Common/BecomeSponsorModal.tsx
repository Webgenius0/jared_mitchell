"use client";
import toast from "react-hot-toast";
import { Button } from "./Button";
import { useState, useRef } from "react";
import { useApplySponsorship } from "@/Hooks/api/cms_api";
import { FiUser, FiMail, FiPhone, FiUpload, FiX } from "react-icons/fi";

type SponsorFormData = {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  sponsorTitle: string;
  logo: File | null;
};

export const SponsorModal = ({ onClose }: { onClose: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<SponsorFormData>({
    fullName: "",
    email: "",
    phone: "",
    reason: "",
    sponsorTitle: "",
    logo: null,
  });
  const { mutateAsync: applySponsorship, isPending: isSubmitting } =
    useApplySponsorship();

  const handleChange = (field: keyof SponsorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, logo: file }));
  };

  const handleSubmit = async () => {
    // All fields are required — the browser's native `required` validation
    // covers the text inputs on submit, but guard here too so empty values
    // can never reach the API.
    const requiredText: [keyof SponsorFormData, string][] = [
      ["fullName", "Full name"],
      ["email", "Email address"],
      ["phone", "Phone number"],
      ["sponsorTitle", "Sponsor title"],
      ["reason", "Why sponsor"],
    ];
    for (const [field, label] of requiredText) {
      if (!String(formData[field]).trim()) {
        toast.error(`${label} is required.`);
        return;
      }
    }

    // sponsor_image is a file upload, so the browser's `required` validation
    // can't cover it — enforce it here before submitting.
    if (!formData.logo) {
      toast.error("Please upload a sponsor logo/image.");
      return;
    }

    const payload = new FormData();
    payload.append("full_name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone_number", formData.phone);
    payload.append("sponsor_title", formData.sponsorTitle);
    payload.append("why_sponsor", formData.reason);
    payload.append("sponsor_image", formData.logo);

    try {
      const res = await applySponsorship({ data: payload });
      // Success/error toasts are handled inside the hook.
      if (res?.success) {
        onClose();
      }
    } catch {
      // Toast handled by the hook's onError.
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full relative px-8 sm:px-17 py-8 max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl leading-none text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-900 mb-2 sm:mb-3 text-balance">
            Are you interested in sponsoring all businesses?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 font-normal leading-relaxed text-pretty">
            Share your information for OSI owner.
          </p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Full Name<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => handleChange("fullName", e.target.value)}
                placeholder="Type your name..."
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Email Address<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => handleChange("email", e.target.value)}
                placeholder="Type your email address..."
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => handleChange("phone", e.target.value)}
                placeholder="Type your phone address..."
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Why Sponsor */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Why Sponsor The All Contestant
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.reason}
              onChange={e => handleChange("reason", e.target.value)}
              placeholder="Type your sponsor title..."
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sponsor Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Sponsor Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.sponsorTitle}
              onChange={e => handleChange("sponsorTitle", e.target.value)}
              placeholder="Type your sponsor title..."
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-start">
              Sponsor Logo/Image<span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-100 rounded-lg py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {formData.logo ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-700">{formData.logo.name}</span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, logo: null }));
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    aria-label="Remove file"
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="h-5 w-5 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};
