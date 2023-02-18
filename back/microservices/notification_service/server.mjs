import express from "express";
import routes from "./api/routes.mjs";
import { createServer } from "http";
import { Server} from "socket.io";
import NotificationService from "./NotificationService.mjs";

const app = express();

app.use(express.json());
routes(app);
const server = createServer(app);
const ioServer = new Server(server);

const service = NotificationService.getInstance(ioServer);
service.setServer(ioServer,{transports: ['websocket']});

ioServer.on('connection', function(socket) {
    socket.on("userJoined", (userID)=>{
        service.userConnection(socket, userID);
    })

    socket.on("sending signal", payload => {
        socket.to(payload.userToSignal).emit('user joined', { signal: payload.signal, src: payload.src, userid: payload.userid, team: payload.currentUserTeam  });
    });
    socket.on("returning signal", payload => {
        socket.to(payload.dest).emit('receiving returned signal', { signal: payload.signal, src: socket.id });
    });
});

server.listen(process.env.NOTIFICATION_DOCKER_PORT);
