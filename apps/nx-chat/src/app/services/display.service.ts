import { inject, Injectable, Signal, signal } from '@angular/core';
import { IMessage } from '../interfaces/imessage';
import { DisplaySocketService } from './display-socket.service';

@Injectable()
export class DisplayService {
  private _messages = signal<IMessage[]>([this._getNewMessage()]);
  private _displaySocket = inject(DisplaySocketService);

  constructor() {
    this._receiveSocketMessages();
  }

  /**
   * A getter for all on screen messages.
   */
  get messages(): Signal<IMessage[]> {
    return this._messages;
  }

  /**
   * Sets the current message value.
   *
   * @param value
   */
  public updateMessage(value: string): void {
    const [message, ...messages] = this._messages();
    this._messages.set([{ ...message, value }, ...messages]);
  }

  /**
   * Displays a new message on screen and saves it to the backend.
   */
  public displayMessage(): void {
    this._messages.update((messages) => [
      this._getNewMessage(),
      ...messages.map((message) => ({ ...message, fulfilled: true })),
    ]);

    this._displaySocket.sendMessage(JSON.stringify(this._messages()));
  }

  private _receiveSocketMessages(): void {
    this._displaySocket.socket.subscribe((messages) =>
      this._messages.set(messages)
    );
  }

  private _getNewMessage(): IMessage {
    return {
      xPosition: this._getStartPosition(),
      yPosition: this._getStartPosition(),
      value: '',
      fulfilled: false,
      color: this._getColor(),
    };
  }

  private _getStartPosition(): number {
    return Math.random() * 70;
  }

  private _getColor(): string {
    return (
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    );
  }
}
