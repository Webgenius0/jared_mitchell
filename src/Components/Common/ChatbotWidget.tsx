"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaMinus, FaMicrophone, FaPlus, FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

// ─── Mock assistant replies (frontend-only placeholder) ──────────────────
// Swap this out for a real AI endpoint later — send the conversation history
// and render the returned message the same way.
const getMockReply = (input: string): string => {
  const text = input.toLowerCase();

  if (/(vote|voting|votepurchase)/.test(text)) {
    return "You can purchase votes from the dashboard's Vote Purchase page. Head to Spotlight Management → Vote Purchase, pick a package, and follow the checkout — votes are applied to your active entry right away.";
  }
  if (/(round|boss beginning|boss)/.test(text)) {
    return "Boss Beginning rounds open up one at a time over the season. From the Boss Beginning menu you can open your current round plus every round before it. Each round has its own asset submission page.";
  }
  if (/(event|ticket|booking)/.test(text)) {
    return "You'll find upcoming events on the Events page of your dashboard. You can browse the schedule, grab tickets, and manage your bookings from there.";
  }
  if (/(spotlight|apply|application)/.test(text)) {
    return "Spotlight applications live under Spotlight Management → My Applications. You can apply, track the status, and withdraw an application if your plans change.";
  }
  if (/(subscription|plan|premium)/.test(text)) {
    return "Your subscription and available plans are on the Subscription page. You can view your current plan, upgrade, or manage billing from there.";
  }
  if (/(purchase|order|payment|refund)/.test(text)) {
    return "All of your purchases — votes, tickets, subscriptions and more — are listed on the Purchase List page, where you can review order status and payments.";
  }
  if (/(support|help|contact|human|agent)/.test(text)) {
    return "If you need a hand from our team, reach out through the Settings page's support options and we'll get back to you as soon as possible.";
  }
  if (/(analytics|performance|insight|stats)/.test(text)) {
    return "The Analytics page gives you an overview of your performance — engagement, points and key metrics — so you can track how your entries are doing.";
  }
  if (/(hello|hi|hey)\b/.test(text)) {
    return "Hello! 👋 I'm here to help you navigate your OSI dashboard. Ask me about votes, rounds, events, subscriptions or anything else.";
  }
  return "Thanks for your question! To give you the most relevant guidance, could you tell me a bit more about what you're trying to do — for example votes, events, rounds or subscriptions?";
};

const WELCOME_MESSAGE =
  "Hi there! 👋 I'm the OSI AI Content Assistant, always here to help. Ask me anything about votes, rounds, events, subscriptions and more.";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  // Greet the user the first time the popup is opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: ++idRef.current, role: "assistant", text: WELCOME_MESSAGE },
      ]);
    }
  }, [open, messages.length]);

  // Keep the latest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;

    setMessages(prev => [
      ...prev,
      { id: ++idRef.current, role: "user", text: content },
    ]);
    setInput("");
    setTyping(true);

    // Simulated "thinking" delay before the mock reply
    window.setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: ++idRef.current,
          role: "assistant",
          text: getMockReply(content),
        },
      ]);
      setTyping(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const closeChat = () => {
    setOpen(false);
    setMinimized(false);
  };

  return (
    <>
      {/* ─── Floating launcher button (bottom-right) ─── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI chat assistant"
          className="fixed bottom-6 right-6 z-[100] grid h-14 w-14 place-items-center rounded-full bg-primary-blue text-white shadow-[0_8px_24px_rgba(24,119,242,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}

      {/* ─── Chat popup ─── */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-[100] flex w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
            minimized ? "h-auto" : "h-[min(560px,calc(100vh-130px))]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary-blue px-4 py-3 text-white">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-primary-blue">
              <FaRobot className="text-xl" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight">
                OSI AI Content Assistant
              </p>
              <p className="text-xs text-white/80 leading-tight">
                Always here to help
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(m => !m)}
                aria-label={minimized ? "Expand chat" : "Minimize chat"}
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/15"
              >
                <FaMinus className="text-sm" />
              </button>
              <button
                onClick={closeChat}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/15"
              >
                <RxCross2 className="text-lg" />
              </button>
            </div>
          </div>

          {/* Chat body */}
          {!minimized && (
            <>
              <div
                ref={scrollRef}
                className="flex-1 space-y-3 overflow-y-auto bg-[#F1F3F6] px-4 py-4"
              >
                {messages.map(msg =>
                  msg.role === "user" ? (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary-blue px-4 py-2.5 text-sm leading-relaxed text-white">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-[#1d1d1f] shadow-sm">
                        {msg.text}
                      </div>
                    </div>
                  ),
                )}

                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="border-t border-gray-100 bg-white px-3 py-3">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Attach file"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#F1F3F6] text-[#364153] hover:bg-gray-200"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                  <div className="flex flex-1 items-center gap-2 rounded-full bg-[#F1F3F6] px-4">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-gray-400"
                    />
                    <button
                      aria-label="Voice input"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#364153] hover:text-primary-blue"
                    >
                      <FaMicrophone className="text-sm" />
                    </button>
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    aria-label="Send message"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-blue text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                    disabled={!input.trim() || typing}
                  >
                    <IoSend className="text-sm -translate-x-px translate-y-px" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
