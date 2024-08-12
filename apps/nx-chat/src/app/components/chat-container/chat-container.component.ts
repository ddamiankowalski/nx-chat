import { ClassBinder } from '../../services/class-binder.service';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  standalone: true,
  selector: 'app-chat-container',
  templateUrl: 'chat-container.component.html',
  styleUrl: 'chat-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [ChatInputComponent],
})
export class ChatContainerComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('app-chat-container');
  }
}
