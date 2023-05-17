import {WebSocket} from 'ws';

import {Emit, GetId, On} from 'common/interface';

interface GetAddress {
  (): string;
}

interface Join {
  (name: string | string[]): void;
}

interface To {
  (name: string): SocketClientInterface;
}

interface GetWebsocket {
  (): WebSocket;
}

interface SocketClientInterface {
  on: On;
  emit: Emit;
  join: Join;
  to: To;

  getId: GetId;
  getAddress: GetAddress;
  getWebsocket: GetWebsocket;
}

export {GetAddress, Join, To, GetWebsocket};
export default SocketClientInterface;
