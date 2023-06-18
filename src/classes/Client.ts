import {WebSocket} from 'ws';
import {MD5} from 'object-hash';
import {IncomingMessage} from 'http';

import {Emit, GetId, Listener, On} from 'common/interface';
import {
  To,
  Join,
  GetAddress,
  SocketClientInterface,
  GetWebsocket,
} from 'interfaces';
import {insertRoom, toBuffer} from 'utils';

import SocketRoom from './Room';

class SocketClient implements SocketClientInterface {
  private id: string;
  private ws: WebSocket;
  private request: IncomingMessage;
  private clients: Map<string, SocketClient>;
  private rooms: Map<string, SocketRoom>;
  private listeners: Listener[];
  private selectedRooms: Set<string>;
  private myRooms: Set<string>;

  constructor(
    ws: WebSocket,
    request: IncomingMessage,
    clients: Map<string, SocketClient>,
    rooms: Map<string, SocketRoom>
  ) {
    this.id = MD5({at: new Date().getTime(), request: String(request)});
    this.ws = ws;
    this.request = request;
    this.clients = clients;
    this.rooms = rooms;
    this.listeners = [];
    this.selectedRooms = new Set();
    this.myRooms = new Set();
  }

  on: On = (event, callback) => {
    this.listeners.push({event, callback});
  };

  emit: Emit = (event, payload) => {
    const message = toBuffer(event, payload);
    if (this.selectedRooms.size) {
      for (const room_name of this.selectedRooms) {
        const room = this.rooms.get(room_name);
        if (room) room.broadcast(this.clients, message);
      }
      this.selectedRooms.clear();
      return;
    }
    this.ws.send(message);
  };

  join: Join = (name) => {
    if (Array.isArray(name)) {
      for (const n of name) {
        insertRoom(n, this.rooms, this.id, () => {
          this.myRooms.add(n);
        });
      }
      return;
    }
    insertRoom(name, this.rooms, this.id);
    this.myRooms.add(name);
  };

  to: To = (name) => {
    this.selectedRooms.add(name);
    return this;
  };

  getId: GetId = () => {
    return this.id;
  };

  getAddress: GetAddress = () => {
    return this.request.socket.remoteAddress;
  };

  getWebsocket: GetWebsocket = () => {
    return this.ws;
  };
}

export default SocketClient;
