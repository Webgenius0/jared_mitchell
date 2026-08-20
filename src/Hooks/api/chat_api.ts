import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { axiosSecure } from "@/Hooks/useAxiosSecure";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

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

export const apiGetConversation = async (conversationId: number | string) => {
  const res = await axiosSecure.get(`/v1/ai-chat/conversations/${conversationId}`);
  return res.data;
};
