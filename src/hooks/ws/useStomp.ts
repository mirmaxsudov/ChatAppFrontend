"use client";
import { useEffect } from 'react';
import { TokenProvider, ws } from '../../lib/ws/stompClient';

export function useStomp(tokenProvider?: TokenProvider) {
    useEffect(() => {
        ws.ensureConnected(tokenProvider);
    }, [tokenProvider])
    return ws;
}