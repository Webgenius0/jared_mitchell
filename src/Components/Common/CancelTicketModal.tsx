"use client";

import React from "react";
import { Loader2, TicketX } from "lucide-react";
import Modal from "@/Components/Common/Modal";

type CancelTicketModalProps = {
  open: boolean;
  onClose: () => void;
  eventTitle?: string;
  bookingReference?: string;
  isPending?: boolean;
  onConfirm: () => void;
};

const CancelTicketModal: React.FC<CancelTicketModalProps> = ({
  open,
  onClose,
  eventTitle,
  bookingReference,
  isPending = false,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Cancel Ticket"
      className="max-w-md"
    >
      <div className="mt-4 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <TicketX className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
          Are you sure?
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
          This will cancel your booking
          {bookingReference ? (
            <>
              {" "}
              for <span className="font-medium text-slate-700">#{bookingReference}</span>
            </>
          ) : null}
          {eventTitle ? (
            <>
              {" "}
              · <span className="font-medium text-slate-700">{eventTitle}</span>
            </>
          ) : null}
          . This action cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="text-sm font-medium px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="text-sm font-medium px-6 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Cancel ticket"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelTicketModal;
