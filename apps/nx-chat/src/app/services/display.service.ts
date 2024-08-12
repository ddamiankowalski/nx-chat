import { Injectable, Signal, signal } from '@angular/core';
import { IMessage } from '../interfaces/imessage';

@Injectable()
export class DisplayService {
  private _message = signal<string>('');
  private _messages = signal<IMessage[]>([]);

  /**
   * A getter for the current message.
   */
  get message(): Signal<string> {
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
  public setMessage(message: string): void {
    this._message.set(message);
  }

  /**
   * Displays a new message on screen and saves it to the backend.
   */
  public displayMessage(): void {
    const newMessage = { xPosition: 0, yPosition: 0, value: this._message() };
    this._messages.update((messages) => [...messages, newMessage]);
  }
}
