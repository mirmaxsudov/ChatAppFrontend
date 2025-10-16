import { ws } from "@/lib/ws/stompClient";
import { app } from "@/lib/ws/topics";
import { useCallback } from "react";

export function useOnlineStatusSender() {
    const sendUserOnlineStatus = useCallback((userId: number) => {
        if (!userId)
            return;

        ws.publish(app.onlineStatus(userId), undefined);
    }, []);

    return { sendUserOnlineStatus };
}