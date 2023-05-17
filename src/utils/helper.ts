import {SocketRoom} from 'classes';
import {RawData} from 'ws';

function toBuffer(event: string, payload: any) {
  const at = new Date().getTime();
  const msg = Buffer.from(JSON.stringify({event, payload, at}));
  return msg;
}

function toJSON(message: Buffer | RawData) {
  const msg = message.toString('utf-8');
  return JSON.parse(msg);
}

function insertRoom(
  room_name: string,
  rooms: Map<string, SocketRoom>,
  id: string,
  success?: () => void
) {
  let _room = new SocketRoom(room_name);

  let room_exist = false;
  for (const [room_id, room] of rooms) {
    if (_room.getName() === room.getName()) {
      room_exist = true;
      _room = room;
    }
  }
  if (!room_exist) rooms.set(_room.getName(), _room);

  let joined = false;
  for (const client_id of _room.getClients()) {
    if (id === client_id) joined = true;
  }
  if (!joined) {
    _room.addClient(id);
    success && success();
  }
}

export {toBuffer, toJSON, insertRoom};
