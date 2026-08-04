"use client";

import React from "react";
import { Loader2, Undo2 } from "lucide-react";
import Modal from "@/Components/Common/Modal";

type WithdrawApplicationModalProps = {
  open: boolean;
  onClose: () => void;
  spotlightName?: string;
  weekLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
};

const WithdrawApplicationModal: React.FC<WithdrawApplicationModalProps> = ({
  open,
  onClose,
  spotlightName,
  weekLabel,
  isPending = false,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Withdraw Application"
      className="max-w-md"
    >
      <div className="mt-4 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <Undo2 className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
          Are you sure?
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
          This will withdraw your application
          {spotlightName ? (
            <>
              {" "}
              for{" "}
              <span className="font-medium text-slate-700">
                {spotlightName}
              </span>
            </>
          ) : null}
          {weekLabel ? (
            <>
              {" "}
              ·{" "}
              <span className="font-medium text-slate-700">{weekLabel}</span>
            </>
          ) : null}
          . You can re-apply later if you change your mind.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="text-sm font-medium px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Keep application
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
                Withdrawing...
              </>
            ) : (
              "Withdraw"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawApplicationModal;
