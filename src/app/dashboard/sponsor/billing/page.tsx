import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Sponsor Billing - Invoices & Payments | OSI Dashboard",
  description:
    "Manage your OSI sponsor billing. View invoices, payment history, billing cycles, and manage your sponsorship payments in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>billing</div>;
};

export default page;