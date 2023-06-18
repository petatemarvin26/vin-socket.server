import {MD5} from 'object-hash';

import {
  AddClientId,
  BroadcastClients,
  GetClientIds,
  RemoveClientId,
  SocketRoomInterface,
} from 'interfaces';
import {GetId, GetName} from 'common/interface';

class SocketRoom implements SocketRoomInterface {
  private id: string;
  private name: string;
  private clients: Set<string>;

  constructor(name: string) {
    const room_name = name.toLowerCase().trim();
    const at = new Date().getTime();
    this.id = MD5({at, name: room_name});
    this.name = name;
    this.clients = new Set();
  }

  getId: GetId = () => {
    return this.id;
  };

  getName: GetName = () => {
    return this.name;
  };

  addClient: AddClientId = (id) => {
    this.clients.add(id);
  };

  removeClient: RemoveClientId = (id) => {
    this.clients.delete(id);
  };

  getClients: GetClientIds = () => {
    return this.clients;
  };

  broadcast: BroadcastClients = (clients, message) => {
    for (const id of this.clients) {
      for (const [client_id, client] of clients) {
        if (id === client_id) {
          const ws = client.getWebsocket();
          ws.send(message);
        }
      }
    }
  };
}

export default SocketRoom;
