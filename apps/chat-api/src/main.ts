import { DatabaseController } from './db';
import { WebSocketController } from './ws';

const wsController = new WebSocketController();
wsController.initialize();

const dbController = new DatabaseController();
dbController.initialize().then(() => {
  console.log('DB CONNECTED SUCCESSFULLY');

  dbController.sendMessage('some message', '12', '14');

  dbController.getMessages().then((s) => console.log(s.rows));
});
