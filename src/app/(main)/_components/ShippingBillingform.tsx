"use client";

import React, { useState } from "react";
import {
  FiChevronDown,
  FiCreditCard,
  FiPhone,
  FiShoppingCart,
} from "react-icons/fi";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import { usePlaceOrder } from "@/Hooks/api/cart_api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  type?: string;
}

function Input({ label, placeholder, value, onChange, required, type = "text" }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 px-4 py-3 text-base text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

interface AddressFormProps {
  prefix: string;
  values: Record<string, string>;
  onChange: (field: string, val: string) => void;
}

function AddressForm({ prefix, values, onChange }: AddressFormProps) {
  const field = (name: string) => `${prefix}_${name}`;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Input
          label={`${prefix === "shipping" ? "Shipping" : "Billing"} name`}
          placeholder="Enter your full name"
          value={values[field("name")] || ""}
          onChange={v => onChange(field("name"), v)}
          required
        />
      </div>
      <Input
        label="Phone"
        placeholder="Phone number"
        value={values[field("phone")] || ""}
        onChange={v => onChange(field("phone"), v)}
        required
        type="tel"
      />
      <Input
        label="Email"
        placeholder="Email address"
        value={values[field("email")] || ""}
        onChange={v => onChange(field("email"), v)}
        required
        type="email"
      />
      <Input
        label="Address Line 1"
        placeholder="Street address"
        value={values[field("address_line1")] || ""}
        onChange={v => onChange(field("address_line1"), v)}
        required
      />
      <Input
        label="Address Line 2"
        placeholder="Apartment, suite, etc."
        value={values[field("address_line2")] || ""}
        onChange={v => onChange(field("address_line2"), v)}
      />
      <Input
        label="City"
        placeholder="City"
        value={values[field("city")] || ""}
        onChange={v => onChange(field("city"), v)}
        required
      />
      <Input
        label="State"
        placeholder="State"
        value={values[field("state")] || ""}
        onChange={v => onChange(field("state"), v)}
        required
      />
      <Input
        label="ZIP Code"
        placeholder="ZIP code"
        value={values[field("zip")] || ""}
        onChange={v => onChange(field("zip"), v)}
      />
      <Input
        label="Country"
        placeholder="Country"
        value={values[field("country")] || ""}
        onChange={v => onChange(field("country"), v)}
        required
      />
    </div>
  );
}

export default function ShippingBillingForm(): React.JSX.Element {
  const router = useRouter();
  const { cartItems, cartSubtotal, cartCount, isLoading: cartLoading, refetchCart } = useCart();
  const { mutate: placeOrder, isPending: isPlacing } = usePlaceOrder();

  const [addBilling, setAddBilling] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const getAddressObj = (prefix: string) => ({
    name: formValues[`${prefix}_name`] || "",
    phone: formValues[`${prefix}_phone`] || "",
    email: formValues[`${prefix}_email`] || "",
    address_line1: formValues[`${prefix}_address_line1`] || "",
    address_line2: formValues[`${prefix}_address_line2`] || "",
    city: formValues[`${prefix}_city`] || "",
    state: formValues[`${prefix}_state`] || "",
    zip: formValues[`${prefix}_zip`] || "",
    country: formValues[`${prefix}_country`] || "",
  });

  const handlePlaceOrder = () => {
    // Validate shipping fields
    const shipping = getAddressObj("shipping");
    if (!shipping.name || !shipping.phone || !shipping.email || !shipping.address_line1 || !shipping.city || !shipping.state || !shipping.country) {
      toast.error("Please fill in all required shipping fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const payload: any = { shipping };

    if (addBilling) {
      const billing = getAddressObj("billing");
      // Billing only requires name, phone, email, address_line1, city, state per the schema
      payload.billing = {
        name: billing.name,
        phone: billing.phone,
        email: billing.email,
        address_line1: billing.address_line1,
        address_line2: billing.address_line2,
        city: billing.city,
        state: billing.state,
      };
    }

    placeOrder(payload, {
      onSuccess: () => {
        refetchCart();
        router.push("/");
      },
    });
  };

  // Show loading state while cart is loading
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto grid container grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        {/* Left card — Shipping & Billing form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            Check-out information
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Fill in your shipping and billing details
          </p>

          <div className="my-6 h-px bg-gray-100" />

          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Shipping Address
          </h2>
          <AddressForm prefix="shipping" values={formValues} onChange={updateField} />

          <label className="mt-5 flex items-center gap-2 text-base text-gray-700">
            <input
              type="checkbox"
              checked={addBilling}
              onChange={e => setAddBilling(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
            />
            Add a Billing address
          </label>

          {addBilling && (
            <>
              <h2 className="mb-4 mt-6 text-lg font-semibold text-gray-900">
                Billing Address
              </h2>
              <AddressForm prefix="billing" values={formValues} onChange={updateField} />
            </>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

          {/* Cart items */}
          <div className="mt-4 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <FiShoppingCart className="size-8 text-gray-300" />
                <p className="text-sm text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map(item => {
                const product = item.product;
                const imageSrc = product?.thumbnail || "/fallback-product.png";
                const price = product?.display_price || 0;

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product?.name || "Product"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ${(price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <div className="my-5 h-px bg-gray-100" />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items ({cartCount})</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total Payable</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>

          <p className="mt-5 text-sm text-gray-500">We accept</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-base text-gray-700">
            <FiCreditCard className="h-5 w-5" />
            COD
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
            <span className="text-sm text-gray-500">Need Help?</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
              <FiPhone className="h-3.5 w-3.5" />
              +1800-123-4567
            </span>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isPlacing || cartItems.length === 0}
            className="mt-5 w-full rounded-lg bg-blue-600 py-3.5 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPlacing ? (
              <>
                <svg
                  className="animate-spin size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
