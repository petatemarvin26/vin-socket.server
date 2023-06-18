## VIN-SOCKET.SERVER

is [NodeJS][nodejs] module, a websocket server side connection that minified the functionalities and strategies of [ws][ws] for easy implementation of websocket.

#

### Installation

```shell
npm install vin-socket.server
```

#

### Features

- easy to understand
- modern approach
- background digestion into binary data

#

### Usage Examples

Emit to client

```Javascript
const { createServer } = require("http");
const { SocketServer } = require("vin-socket.server");

const server = createServer().listen(4000);
const wsServer = new SocketServer({ path: "/", server });

wsServer.onConnect((client) => {
  const client_id = client.getId();

  client.emit("res:greetings", {
    message: `Hello new client-${client_id}!`
  })
});
```

Listen to client

```Javascript
...
wsServer.on("req:message", (payload, client) => {
  console.log(`Received payload from client`, payload)
});
```

Join to room

```Javascript
...
client.join('room1')
```

Emit to room

```Javascript
...
client.to('room1').emit({
    message: "Hello to all inside of this room"
})
```

#

### Contributing

Unfortunately we are not accepting any contributors yet this is under probitionary, but for your concerns and possible suggestions just email me at petatemarvin26@gmail.com

#

### Changelog

We're using github [release][github-release] and based on semantic versioning

#

### License

[ISC][license]

#

### Keywords

[ws][ws]

[ws]: https://www.npmjs.com/package/ws
[nodejs]: https://nodejs.org/en
[github-release]: https://github.com/petatemarvin26/vin-socket.server/releases
[license]: ./LICENSE
