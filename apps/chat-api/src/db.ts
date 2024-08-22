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

  public async initialize(): Promise<void> {
    this._client = new Client({
      host: 'localhost',
      user: 'root',
      password: '123',
      port: 5432,
      database: 'nx-chat',
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
