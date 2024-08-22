import { DatabaseController } from './db';
import { WebSocketController } from './ws';

let wsController: WebSocketController;
let dbController: DatabaseController;

dbController = new DatabaseController();
dbController.initialize().then(() => {
  console.log('DB CONNECTED SUCCESSFULLY');
  wsController = new WebSocketController(dbController);
});
