import {WebSocket} from 'ws';
import {IncomingMessage} from 'http';

import {On} from 'common/interface';
import ClientInterface from './SocketClient';

interface CallbackConnect {
  (client: ClientInterface): void;
}
interface CallbackDisConnect {
  (message: string, client: ClientInterface): void;
}

interface OnCreate {
  (websocket: WebSocket, request: IncomingMessage): void;
}

interface OnConnect {
  (cb: CallbackConnect): void;
}

interface OnDisconnect {
  (cb: CallbackDisConnect): void;
}

interface Broadcast {
  (event: string, payload: any): void;
}

interface SocketServerInterface {
  callbackConnect: CallbackConnect;
  callbackDisconnect: CallbackDisConnect;

  onConnect: OnConnect;
  onDisconnect: OnDisconnect;

  on: On;
  // emit: Emit;

  broadast: Broadcast;
}

export {
  Broadcast,
  CallbackConnect,
  CallbackDisConnect,
  OnCreate,
  OnConnect,
  OnDisconnect,
};
export default SocketServerInterface;
