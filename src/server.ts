import express, { Express } from "express";
import { createServer, Server as WebServer } from "http";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import { success, info } from "@lanred/basic-logger";
import io from "./io";

//TODO: create a custom logger for npm

const expressServer: Express = express();
const httpServer: WebServer = createServer(expressServer);
const socketServer: SocketServer = new SocketServer(httpServer, {
    cors: {
        origin: "*",
    },
});

expressServer.use(
    cors({
        origin: "*",
    })
);

io(socketServer);

info("starting server...");
httpServer.listen(5001, () => {
    success("server running on port 5001");
});
