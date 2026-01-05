import type { Socket } from "socket.io";
import { io } from "../../..";
import { betHandler } from "../controllers/handler";

io.on("connection", (socket: Socket) => {
    socket.on("bet", async (payload: string) => await betHandler(socket, payload))
})