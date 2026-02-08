import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  examinePatternWithWays,
  generateReels,
} from "./modules/masterTiger/services/result";

const PORT = 9000;
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

httpServer.listen(PORT, () => console.log("SERVER RUNNING ON PORT", PORT));
examinePatternWithWays(generateReels());
// examinePatternWithWays1(generateReels());
