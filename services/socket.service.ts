import { Notification, SocketEventType, SocketPayload } from "@/types";
import { io, type Socket } from "socket.io-client";

export class SocketService {

    private socket: Socket;
    URL = 'ws://localhost:8080';

    constructor() {
        
        this.socket = io(this.URL, {
            transports: ["websocket"],
            forceNew: true,
            reconnection: true
        });
    }

    send(event: SocketEventType, payload: SocketPayload) {
        this.socket.emit<SocketEventType>(event, payload);
    }

    listen(event: SocketEventType, callback: (payload: SocketPayload) => void) {
        this.socket.on<SocketEventType>(event, callback);
    }

    stop(event: SocketEventType) {
        this.socket.off(event);
    }

    close() {
        this.socket.disconnect();
    }

}

const socketService = new SocketService();
export default socketService;