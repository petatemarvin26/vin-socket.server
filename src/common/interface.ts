import {SocketClientInterface} from 'interfaces';

interface GetId {
  (): string;
}

interface GetName {
  (): string;
}

interface Callback {
  (payload: any, client: SocketClientInterface): void;
}

interface Listener {
  event: string;
  callback: Callback;
}

interface On {
  (event: string, callback: Callback): void;
}

interface Emit {
  (event: string, payload: any): void;
}

export {Callback, Emit, Listener, On, GetId, GetName};
