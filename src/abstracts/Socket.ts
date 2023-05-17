import {SocketClient, SocketRoom} from 'classes';
import {
  AddClient,
  AddRoom,
  GetClient,
  GetClients,
  GetRoom,
  GetRooms,
  RemoveClient,
  RemoveRoom,
  SocketInterface,
} from 'interfaces';

abstract class ServerAbstract implements SocketInterface {
  protected clients: Map<string, SocketClient>;
  protected rooms: Map<string, SocketRoom>;

  constructor() {
    this.clients = new Map();
    this.rooms = new Map();
  }

  addClient: AddClient = (client) => {
    const id = client.getId();
    this.clients.set(id, client);
  };

  removeClient: RemoveClient = (client) => {
    const id = client.getId();
    this.clients.delete(id);
  };

  getClient: GetClient = (client) => {
    const id = client.getId();
    return this.clients.get(id);
  };

  getClients: GetClients = () => {
    return this.clients;
  };

  addRoom: AddRoom = (room) => {
    const id = room.getId();
    this.rooms.set(id, room);
  };

  removeRoom: RemoveRoom = (room) => {
    const id = room.getId();
    this.rooms.delete(id);
  };

  getRoom: GetRoom = (room) => {
    const id = room.getId();
    return this.rooms.get(id);
  };

  getRooms: GetRooms = () => {
    return this.rooms;
  };
}

export default ServerAbstract;
