import {WebSocketServer} from 'ws';

import {Listener, On} from 'common/interface';
import {SocketAbstract} from 'abstracts';
import {
  Broadcast,
  CallbackConnect,
  CallbackDisConnect,
  ConfigInterface,
  OnConnect,
  OnCreate,
  OnDisconnect,
  SocketInterface,
  SocketServerInterface,
} from 'interfaces';
import {toJSON} from 'utils';
import SocketClient from './Client';
class SocketServer
  extends SocketAbstract
  implements SocketInterface, SocketServerInterface
{
  private ws: WebSocketServer;
  private listeners: Listener[];

  callbackConnect: CallbackConnect;
  callbackDisconnect: CallbackDisConnect;

  constructor(config: ConfigInterface) {
    super();
    this.ws = new WebSocketServer(config);
    this.listeners = [];
    this.callbackConnect = () => {};
    this.callbackDisconnect = () => {};

    this.ws.on('connection', this.onCreate);
  }

  private onCreate: OnCreate = (websocket, request) => {
    const client = new SocketClient(
      websocket,
      request,
      this.clients,
      this.rooms
    );
    this.addClient(client);
    this.callbackConnect(client);

    websocket.on('error', (reason) => {
      this.callbackDisconnect(reason.message, client);
    });
    websocket.on('close', (code, reason) => {
      this.removeClient(client);
      this.callbackDisconnect('close connection', client);
    });
    websocket.on('message', (payload) => {
      const message = toJSON(payload);
      for (const {event, callback} of this.listeners) {
        if (event === message.event) callback(message.payload, client);
      }
    });
  };

  onConnect: OnConnect = (callback) => {
    this.callbackConnect = callback;
  };

  onDisconnect: OnDisconnect = (callback) => {
    this.callbackDisconnect = callback;
  };

  broadast: Broadcast = (event, payload) => {
    for (const [id, client] of this.clients) {
      client.emit(event, payload);
    }
  };

  on: On = (event, callback) => {
    this.listeners.push({event, callback});
  };

  // onEmit: Emit = (event, payload) => {
  //   const msg = toBuffer(event, payload);
  //   this.ws.emit(event, msg);
  // };
}

export default SocketServer;
