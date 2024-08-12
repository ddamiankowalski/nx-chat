import { Injectable, Signal, signal } from '@angular/core';
import { IMessage } from '../interfaces/imessage';

@Injectable()
export class DisplayService {
  private _messages = signal<IMessage[]>([this._getNewMessage()]);

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
  }

  private _getNewMessage(): IMessage {
    return {
      xPosition: this._getStartPosition(),
      yPosition: this._getStartPosition(),
      value: '',
      fulfilled: false,
    };
  }

  private _getStartPosition(): number {
    return Math.random() * 70;
  }
}
