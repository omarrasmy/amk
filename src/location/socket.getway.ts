import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { RedisKey } from "src/redis/enums/redis-key.enums";
import { RedisService } from "src/redis/redis.service";

@WebSocketGateway({
    namespace: 'location',
    cors: {
        // origin: ['http://localhost', 'http://localhost:7357', '*'],
        // credentials: true,
    },
})
export class LocationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server
    constructor(
        private readonly redisService: RedisService,
        // This holds the Socket.IO server instance
    ) { }
    getServer() {
        return this.server;
    }
    handleDisconnect(client: any) {
        console.log('Client disconnected:', client.id);
        client.leave('location');
        // Remove the client from Redis
        this.redisService.del(RedisKey.USER + client.id);
        // Optionally, you can emit a disconnect event
        client.emit('disconnected', { message: 'You have been disconnected from the location service' });
    }
    async handleConnection(client: any, ...args: any[]) {
        console.log('Client connected:', client.id);
        client.emit('connected', { message: 'You are connected to the location service' });
        client.join('location');

        client.on('newLocation', (data: any) => {
            console.log('New location event received:', data);
        })
        // client.handshake.headers['x-client-id'] = client.id; // Store client ID in headers
        await this.redisService.set(RedisKey.USER + client.id, { userId: client.handshake.headers['x-client-id'], socketId: client.id, });
    }
    afterInit(server: any) {
        console.log('WebSocket server initialized');
    }
    @SubscribeMessage('newLocation')
    handleNewLocation(client: any, data: any) {
        console.log('New location received:', data);
        // Broadcast the new location to all connected clients in the 'location' room
        client.to('location').emit('newLocation', data);
    }
}