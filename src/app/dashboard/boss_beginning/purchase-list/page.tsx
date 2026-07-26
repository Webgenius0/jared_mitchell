"use client";
import { useState } from "react";
import Modal from "@/Components/Common/Modal";
type BusinessStatus = "Delivery" | "Terminated" | "Pending";
interface Business {
  id: string;
  orderId: string;
  productName: string;
  total_price: string;
  price: string;
  quantity: string;
  date: string;
  status: BusinessStatus;
  deliveryLocation: string;
}

const businesses: Business[] = [
  {
    id: "1",
    orderId: "#ORD3499",
    price: "$50",
    quantity: "5",
    total_price: "$95",
    productName: "TechKori Ltd.",
    date: "2025-01-01",
    status: "Delivery",
    deliveryLocation: "Level-1, London Tower, USA",
  },
  {
    id: "2",
    orderId: "#ORD3499",
    price: "$50",
    quantity: "5",
    total_price: "$95",
    productName: "EduLearn Hub",
    date: "2025-01-01",
    status: "Delivery",
    deliveryLocation: "Level-1, London Tower, USA",
  },
  {
    id: "3",
    orderId: "#ORD3499",
    price: "$50",
    total_price: "$95",
    quantity: "5",
    productName: "EduLearn Hub",
    date: "2025-01-01",
    status: "Delivery",
    deliveryLocation: "Level-1, London Tower, USA",
  },
  {
    id: "4",
    orderId: "#ORD3499",
    price: "$50",
    quantity: "5",
    total_price: "$95",
    productName: "TechKori Ltd.",
    date: "2025-01-01",
    status: "Delivery",
    deliveryLocation: "Level-1, London Tower, USA",
  },
];

const columns = [
  "Order id",
  "Product name",
  "Price",
  "Quantity",
  "Total price",
  "Date",
  "Actions",
];

function DetailRow({
  label,
  value,
  valueClassName = "text-slate-600",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2 py-2">
      <span className="text-sm md:text-base text-slate-500 w-[150px] shrink-0">
        {label}
      </span>
      <span className={`text-sm md:text-base font-medium ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

export default function Page() {
  const [selectedOrder, setSelectedOrder] = useState<Business | null>(null);

  return (
    <div className="">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-slate-50">
                {columns.map(col => (
                  <th
                    key={col}
                    className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {businesses.map(b => (
                <tr
                  key={b.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                    {b.orderId}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.productName}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.price}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.quantity}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.total_price}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                    {b.date}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap flex gap-3 items-center">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-[#0082361F] text-[#00A63E]">
                      {b.status}
                    </span>

                    <button
                      onClick={() => setSelectedOrder(b)}
                      className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-[#4848481F] text-[#484848] cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        className="max-w-lg rounded-lg"
      >
        {selectedOrder && (
          <div className="">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Product Details
            </h2>
            <button
              type="button"
              className="text-sm md:text-base text-blue-500 hover:underline mb-4"
            >
              See All Information
            </button>

            <div className="mt-2">
              <DetailRow
                label="Product Name:"
                value={selectedOrder.productName}
              />
              <DetailRow
                label="Product Status:"
                value={selectedOrder.status}
                valueClassName="text-[#00A63E]"
              />
              <DetailRow label="Price:" value={selectedOrder.price} />
              <DetailRow label="Delivery Date:" value={selectedOrder.date} />
              <DetailRow
                label="Delivery Location:"
                value={selectedOrder.deliveryLocation}
              />
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base px-14 py-3 rounded-full transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
