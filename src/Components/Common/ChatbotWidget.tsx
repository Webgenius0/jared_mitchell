"use client";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useRef, useState } from "react";
import { useAskChatbot, apiGetConversation } from "@/Hooks/api/chat_api";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const WELCOME_MESSAGE =
  "Hi there! 👋 I'm the OSI AI Content Assistant, always here to help. Ask me anything about votes, rounds, events, subscriptions and more.";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const askChatbot = useAskChatbot();

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: ++idRef.current, role: "assistant", text: WELCOME_MESSAGE },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, askChatbot.isPending, open]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || askChatbot.isPending) return;

    setMessages(prev => [
      ...prev,
      { id: ++idRef.current, role: "user", text: content },
    ]);
    setInput("");

    try {
      const askRes: any = await new Promise((resolve, reject) => {
        askChatbot.mutate(
          { data: { prompt: content, conversation_id: conversationId } },
          { onSuccess: resolve, onError: reject },
        );
      });

      const convId =
        askRes?.data?.conversation_id ??
        askRes?.conversation_id ??
        askRes?.data?.id ??
        askRes?.id;

      if (convId) {
        setConversationId(convId);
      }

      const targetId = convId || conversationId;
      if (targetId) {
        const convRes = await apiGetConversation(targetId);
        const messages = convRes?.data?.messages ?? [];
        const lastAssistant = [...messages]
          .reverse()
          .find((m: any) => m.role === "assistant");

        if (lastAssistant?.content) {
          setMessages(prev => [
            ...prev,
            {
              id: ++idRef.current,
              role: "assistant",
              text: lastAssistant.content,
            },
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            {
              id: ++idRef.current,
              role: "assistant",
              text: "Sorry, I couldn't process that.",
            },
          ]);
        }
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: ++idRef.current,
            role: "assistant",
            text: "Sorry, I couldn't process that.",
          },
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: ++idRef.current,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
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
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI chat assistant"
          className="fixed bottom-6 right-6 z-[100] grid h-8 md:h-14 w-8 md:w-14 place-items-center rounded-full bg-primary-blue text-white shadow-[0_8px_24px_rgba(24,119,242,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <FaRobot className=" md:text-2xl" />
        </button>
      )}

      {open && (
        <div
          className={`fixed bottom-24 right-6 z-[100] flex w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
            minimized ? "h-auto" : "h-[min(560px,calc(100vh-130px))]"
          }`}
        >
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
              {/* <button
                onClick={() => setMinimized(m => !m)}
                aria-label={minimized ? "Expand chat" : "Minimize chat"}
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/15"
              >
                <FaMinus className="text-sm" />
              </button> */}
              <button
                onClick={closeChat}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/15"
              >
                <RxCross2 className="text-lg" />
              </button>
            </div>
          </div>

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

                {askChatbot.isPending && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 bg-white px-3 py-3">
                <div className="flex items-center gap-2">
                  {/* <button
                    aria-label="Attach file"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#F1F3F6] text-[#364153] hover:bg-gray-200"
                  >
                    <FaPlus className="text-sm" />
                  </button> */}
                  <div className="flex flex-1 items-center gap-2 rounded-full bg-[#F1F3F6] px-4">
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    aria-label="Send message"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-blue text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                    disabled={!input.trim() || askChatbot.isPending}
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
