"use client"

import { useUserChatTopic } from "@/hooks/ws/useUserChatTopic";
import { useState } from "react";

// import { useEffect } from "react";
// import { Client, IMessage } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

const TestPage = () => {
    const [data, setData] = useState("NO DATA")
    useUserChatTopic<string>(1, (prev) => {
        setData(prev);
    });
    // useEffect(() => {
    //     console.log("Connecting to STOMP broker...");

    //     const client = new Client({
    //         webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    //         debug: (str) => {
    //             console.log("[STOMP]", str);
    //         },
    //         onConnect: () => {
    //             console.log("Connected to STOMP broker");
    //             const sub = client.subscribe(
    //                 `/topic/test`,
    //                 (message: IMessage) => {
    //                     console.log(message.body);
    //                 }
    //             );
    //         },
    //         onStompError: (frame) => {
    //             console.error("Broker error", frame);
    //         },
    //     });

    //     client.activate();

    //     return () => {
    //         client.deactivate();
    //     };
    // }, []);


    return data;
}

export default TestPage;