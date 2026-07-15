"use client";
import React, { useState } from "react";
import { FiChevronDown, FiCreditCard, FiPhone } from "react-icons/fi";

interface InputProps {
  label: string;
  placeholder: string;
  required?: boolean;
}

function Input({ label, placeholder, required }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 px-4 py-3 text-base text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  value: string;
  required?: boolean;
}

function Select({ label, required, value }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          defaultValue={value}
          className="w-full appearance-none rounded-full border border-gray-200 bg-white px-4 py-3 text-base text-gray-700 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option>{value}</option>
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

interface Product {
  name: string;
  qty: number;
  price: string;
  color: string;
  img: string;
}

const products: Product[] = [
  {
    name: "Personalized Cushions For Her",
    qty: 1,
    price: "$215.00",
    color: "bg-amber-100",
    img: "🛋️",
  },
  {
    name: "Personalized Cushions For Her",
    qty: 1,
    price: "$215.00",
    color: "bg-rose-100",
    img: "🎁",
  },
];

export default function ShippingBillingForm(): React.JSX.Element {
  const [addBilling, setAddBilling] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto grid container grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            Check-out information
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Tell us the basics about your business
          </p>

          <div className="my-6 h-px bg-gray-100" />

          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Shipping name
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Shipping name"
                placeholder="Enter your business name"
                required
              />
            </div>
            <Input label="Shipping Phone" placeholder="2020" required />
            <Input
              label="Shipping Email"
              placeholder="https://yourbusiness.com"
              required
            />
            <Select label="Shipping country" value="2020" required />
            <Select label="Shipping city" value="2020" required />
            <Select label="Shipping State" value="2020" required />
            <Select label="Shipping Zip" value="2020" required />
          </div>

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
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Billing name"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
                <Input label="Billing Phone" placeholder="2020" required />
                <Input
                  label="Billing Email"
                  placeholder="https://yourbusiness.com"
                  required
                />
                <Select label="Billing country" value="2020" required />
                <Select label="Billing city" value="2020" required />
                <Select label="Billing State" value="2020" required />
                <Select label="Billing Zip" value="2020" required />
              </div>
            </>
          )}
        </div>

        {/* Right summary */}
        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Order Summary
          </h2>

          <p className="mt-4 text-base font-medium text-gray-900">Total order:</p>
          <div className="mt-3 flex flex-col gap-4">
            {products.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${p.color} text-xl`}
                >
                  {p.img}
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-400">Quantity : {p.qty}</p>
                </div>
                <p className="text-base font-semibold text-gray-900">{p.price}</p>
              </div>
            ))}
          </div>

          <div className="my-5 h-px bg-gray-100" />

          <p className="text-base font-medium text-gray-900">
            Order Information:
          </p>
          <div className="mt-2 space-y-1.5 text-sm text-gray-500">
            <p>Order ID: #124639abaf21</p>
            <p>Order Date: 12 Jun 2025</p>
            <p>Phone Number: 013991121-129212</p>
          </div>

          <p className="mt-5 text-base font-medium text-gray-900">
            Payment Information:
          </p>
          <div className="mt-2 space-y-2 text-base">
            <div className="flex justify-between text-gray-600">
              <span>Product</span>
              <span>1*12</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>$872.00</span>
            </div>
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total Payable</span>
            <span>$872.00</span>
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

          <button className="mt-5 w-full rounded-lg bg-blue-600 py-3.5 text-base font-medium text-white transition-colors hover:bg-blue-700">
            Payment Now
          </button>
        </div>
      </div>
    </div>
  );
}
