import * as http from 'http';
import { uuid } from 'uuidv4';
import { WebSocketServer } from 'ws';

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 3000;

const connected = {};

server.listen(port, () => {
  console.log('Server is running!');
});

const broadcastMessage = (message) => {
  for (const userId in connected) {
    const client = connected[userId];

    if (client.readyState === 1) {
      client.send(message);
    }
  }
};

wsServer.on('connection', (connection) => {
  console.log('New connection!');

  connection.onmessage = ({ data }) => {
    const json = JSON.parse(data.toString());
    broadcastMessage(json);
  };

  const id = uuid();
  connected[id] = connection;
});
