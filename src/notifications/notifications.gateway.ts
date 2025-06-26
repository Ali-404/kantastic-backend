import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Notification } from '@prisma/client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {origin: "*"},
  namespace: "/notifications"
})
export class NotificationsGateway {
  
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket){
    client.on("identify", (userId: number) => {
      client.join(`user_${userId}`);
      console.log(`Socket ${client.id} joined room user_${userId}`);
    })
  }


  emitNotificationToUser(userId: number, notif: Notification){
    this.server.to(`user_${userId}`).emit("notification", notif)
  }


}
