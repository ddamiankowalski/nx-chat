import { createServer, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { uuid } from 'uuidv4';
import { DatabaseController } from './db';

export class WebSocketController {
  private _server: Server;
  private _wsServer: WebSocketServer;
  private _connected: Map<string, WebSocket> = new Map();

  private PORT = 3000;

  constructor(private _dbController: DatabaseController) {
    this._dbController.getMessages().then((x) => console.log(x.rows));
  }

  public initialize(): void {
    this._server = this._createServer();
    this._wsServer = this._createWSServer();
    this._handleConnections();

    this._server.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }

  private _handleConnections(): void {
    this._wsServer.on('connection', (connection) => {
      const id = uuid();
      this._connected.set(id, connection);

      connection.onmessage = ({ data }) => {
        const json = JSON.parse(data.toString());
        this._broadcastMessage(json);
      };
    });
  }

  private _createServer(): Server {
    return createServer();
  }

  private _createWSServer(): WebSocketServer {
    const server = this._server;
    return new WebSocketServer({ server });
  }

  private _broadcastMessage(message): void {
    this._connected.forEach((connected) => {
      if (connected.readyState === 1) {
        connected.send(message);
      }
    });
  }
}
