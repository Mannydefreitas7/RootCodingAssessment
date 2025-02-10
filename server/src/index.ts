import { Server, Socket } from 'socket.io';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket: Socket) => {

    console.log('User connected', socket.id);

    socket.on('send_notification', (data) => {
        console.log('Notification received', data);
        io.emit('receive_notification', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });

});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});