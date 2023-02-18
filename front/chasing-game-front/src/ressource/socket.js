import React from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "./config";

export const socket = new io(SOCKET_URL);
export const SocketContext = React.createContext();
