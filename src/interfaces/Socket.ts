import {SocketClient, SocketRoom} from 'classes';

interface AddClient {
  (client: SocketClient): void;
}

interface RemoveClient {
  (client: SocketClient): void;
}

interface GetClient {
  (client: SocketClient): SocketClient;
}

interface GetClients {
  (): Map<string, SocketClient>;
}

interface AddRoom {
  (room: SocketRoom): void;
}

interface RemoveRoom {
  (room: SocketRoom): void;
}

interface GetRoom {
  (room: SocketRoom): SocketRoom;
}

interface GetRooms {
  (): Map<string, SocketRoom>;
}

interface ServerInterface {
  addClient: AddClient;
  removeClient: RemoveClient;
  getClient: GetClient;
  getClients: GetClients;

  addRoom: AddRoom;
  removeRoom: RemoveRoom;
  getRoom: GetRoom;
  getRooms: GetRooms;
}

export {
  AddClient,
  RemoveClient,
  GetClient,
  GetClients,
  AddRoom,
  RemoveRoom,
  GetRoom,
  GetRooms,
};
export default ServerInterface;
