import ConfigInterface from './Config';
import SocketRoomInterface, {
  AddClientId,
  GetClientIds,
  RemoveClientId,
  BroadcastClients,
} from './SocketRoom';
import SocketInterface, {
  AddClient,
  AddRoom,
  GetClient,
  GetClients,
  GetRoom,
  GetRooms,
  RemoveClient,
  RemoveRoom,
} from './Socket';
import SocketClientInterface, {
  GetAddress,
  Join,
  To,
  GetWebsocket,
} from './SocketClient';
import SocketServerInterface, {
  OnCreate,
  OnConnect,
  OnDisconnect,
  CallbackConnect,
  CallbackDisConnect,
  Broadcast,
} from './SocketServer';

export {
  ConfigInterface,
  SocketRoomInterface,
  AddClientId,
  GetClientIds,
  RemoveClientId,
  BroadcastClients,
  SocketInterface,
  AddClient,
  AddRoom,
  GetClient,
  GetClients,
  GetRoom,
  GetRooms,
  RemoveClient,
  RemoveRoom,
  SocketClientInterface,
  GetAddress,
  Join,
  To,
  GetWebsocket,
  SocketServerInterface,
  OnCreate,
  OnConnect,
  OnDisconnect,
  CallbackConnect,
  CallbackDisConnect,
  Broadcast,
};
