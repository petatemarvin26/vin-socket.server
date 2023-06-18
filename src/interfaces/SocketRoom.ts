import {SocketClient} from 'classes';
import {GetId, GetName} from 'common/interface';

interface AddClientId {
  (id: string): void;
}

interface RemoveClientId {
  (id: string): void;
}

interface GetClientIds {
  (): Set<string>;
}

interface BroadcastClients {
  (clients: Map<string, SocketClient>, message: Buffer): void;
}

interface SocketRoomInterface {
  getId: GetId;
  getName: GetName;
  addClient: AddClientId;
  removeClient: RemoveClientId;
  getClients: GetClientIds;
  broadcast: BroadcastClients;
}

export {AddClientId, RemoveClientId, GetClientIds, BroadcastClients};
export default SocketRoomInterface;
