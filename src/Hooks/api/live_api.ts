import useClientApi from "../useClientApi";

// Get a ZegoCloud Kit token for a live room.
// GET /v1/live/token?room_id=<roomId>&role=<host|audience>
// Returns: { token: string }
//
// NOTE: The Laravel endpoint does not exist yet. The hook is wired for
// when it ships — flip `enabled` on the live page (and remove the
// client-side dev fallback) once the backend is ready.
export const useGetLiveKitToken = (
  roomId: string,
  role: "host" | "audience",
  enabled = true,
) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["live-kit-token", roomId, role],
    endpoint: "/v1/live/token",
    params: { room_id: roomId, role },
    enabled,
  });
};
