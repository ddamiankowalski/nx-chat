import { Injectable, Signal, signal } from '@angular/core';
import { IMessage } from '../interfaces/imessage';

@Injectable()
export class DisplayService {
  private _message = signal<IMessage>({
    xPosition: this._getStartPosition(),
    yPosition: this._getStartPosition(),
    value: '',
  });

  private _messages = signal<IMessage[]>([]);

  /**
   * A getter for the current message.
   */
  get message(): Signal<IMessage> {
    return this._message;
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
   * @param message
   */
  public setMessage(value: string): void {
    this._message.update((message) => ({ ...message, value }));
  }

  /**
   * Displays a new message on screen and saves it to the backend.
   */
  public displayMessage(): void {
    this._messages.update((messages) => [...messages, this.message()]);
  }

  private _getStartPosition(): number {
    return Math.random() * 100;
  }
}
