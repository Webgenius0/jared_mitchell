import toast from "react-hot-toast";
import { axiosSecure } from "@/Hooks/useAxiosSecure";
import useClientApi from "../useClientApi";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

// Ask the AI Chatbot
// POST /v1/ai-chat/ask
// Payload: { prompt: string, conversation_id: string | null }
// conversation_id is null for the first message in a new conversation.
export const useAskChatbot = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["ai-chat-ask"],
    endpoint: "/v1/ai-chat/ask",
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

// Fetch conversation details (includes all messages)
// GET /v1/ai-chat/conversations/:id
export const apiGetConversation = async (conversationId: number | string) => {
  const res = await axiosSecure.get(`/v1/ai-chat/conversations/${conversationId}`);
  return res.data;
};
