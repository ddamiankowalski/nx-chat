import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class DisplaySocketService {
  private _socket: WebSocketSubject<any>;

  constructor() {
    this._socket = this._initConnection();
  }

  /**
   * A getter for the socket subject.
   */
  get socket(): WebSocketSubject<any> {
    return this._socket;
  }

  /**
   * Sending message to the websocket.
   *
   * @param message
   */
  public sendMessage(message: string): void {
    this._socket.next(message);
  }

  private _initConnection(): WebSocketSubject<string> {
    return webSocket('ws://localhost:3000');
  }
}
