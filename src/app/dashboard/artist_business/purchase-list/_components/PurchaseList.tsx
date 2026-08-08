"use client";
import { useState } from "react";
import Modal from "@/Components/Common/Modal";
import { formatDate } from "@/helper/formatDate";
import { PurchaseRowSkeleton } from "@/Components/Loader/Loader";
import { Pagination } from "@/Components/Common/Pagination";
import { PaginationProps } from "../../spotlight-management/page";

interface Business {
  id: string;
  created_at: string;
  total: string;
  status: string;
  price: string;
  quantity: string;
  order_number: string;
  items: {
    name: string;
    price: string;
    quantity: string;
  }[];
  shipping_address: {
    full_address: string;
  };
}

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

export default function PurchaseList({
  data,
  isLoading,
  setPage,
}: {
  data: any;
  isLoading: boolean;
  setPage: any;
}) {
  const [selectedOrder, setSelectedOrder] = useState<Business | null>(null);
  // Normalize the orders list regardless of the API wrapping it as
  // `data.data`, `data.orders`, `null`, or a plain array — so the empty
  // state reliably shows when there is no purchase data.
  const orders = Array.isArray(data) ? data : data?.data ?? data?.orders ?? [];
  const pagination: PaginationProps | undefined =
    data?.pagination ?? data?.data?.pagination;

  return (
    <>
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
              {isLoading ? (
                <PurchaseRowSkeleton />
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns?.length}
                    className="px-5 md:px-6 py-10 text-center text-sm md:text-base text-slate-500"
                  >
                    No purchase list yet.
                  </td>
                </tr>
              ) : (
                orders.map((b: Business) => (
                  <tr
                    key={b?.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {b?.order_number}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b?.items?.[0]?.name}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      ${b?.items?.[0]?.price}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b?.items?.[0]?.quantity}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      ${b?.total}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      {formatDate(b?.created_at)}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap flex gap-3 items-center">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-[#0082361F] text-[#00A63E] capitalize">
                        {b?.status}
                      </span>

                      <button
                        onClick={() => setSelectedOrder(b)}
                        className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-[#4848481F] text-[#484848] cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && pagination && pagination.last_page > 1 && (
        <div className="px-5 md:px-6 py-4 border-t border-slate-100">
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            // total={pagination.total}
            // perPage={pagination.per_page}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>
      )}

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

            <div className="mt-2">
              <DetailRow
                label="Product Name:"
                value={selectedOrder?.items?.[0]?.name || ""}
              />
              <DetailRow
                label="Product Status:"
                value={selectedOrder.status}
                valueClassName="text-[#00A63E]"
              />
              <DetailRow
                label="Price:"
                value={selectedOrder?.items?.[0]?.price || ""}
              />
              <DetailRow
                label="Delivery Date:"
                value={formatDate(selectedOrder?.created_at)}
              />
              <DetailRow
                label="Delivery Location:"
                value={selectedOrder?.shipping_address?.full_address || ""}
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
    </>
  );
}
