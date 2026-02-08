import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { protoTwo } from "./modules/protoTwo/services/result";

const PORT = 9000;
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

httpServer.listen(PORT, () => {
  protoTwo();
  console.log("SERVER RUNNING ON PORT", PORT)
});