import { Client, QueryResult } from 'pg';

export class DatabaseController {
  private _client: Client | null = null;

  get client(): Client {
    const client = this._client;
    if (!client) {
      throw new Error('Client has not been initialized!');
    }

    return client;
  }

  public getMessages(): Promise<any> {
    return this.client.query('SELECT * FROM messages;');
  }

  public sendMessage(
    message: string,
    xPos: string,
    yPos: string
  ): Promise<any> {
    return this.client.query(`
      INSERT INTO messages (message_text, x_pos, y_pos) 
      VALUES ('${message}', ${xPos}, ${yPos});
    `);
  }

  public async initialize(): Promise<void> {
    const { HOST, USER, PASSWORD, PORT, DBNAME } = process.env;

    this._client = new Client({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: Number(PORT),
      database: DBNAME,
    });

    await this._client.connect();
    await this._seedDb();
  }

  private _seedDb(): Promise<QueryResult<any>> {
    return this.client.query(
      `CREATE TABLE IF NOT EXISTS messages (
          message_text TEXT,
          x_pos INTEGER,
          y_pos INTEGER
      );`
    );
  }
}
