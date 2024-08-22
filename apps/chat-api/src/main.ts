import { DatabaseController } from './db';
import { WebSocketController } from './ws';

const wsController = new WebSocketController();
wsController.initialize();

const dbController = new DatabaseController();
dbController.initialize().then(() => {
  console.log('DB CONNECTED SUCCESSFULLY');
});
