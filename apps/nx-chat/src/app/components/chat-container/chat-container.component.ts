import { ClassBinder } from '../../services/class-binder.service';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chat-container',
  templateUrl: 'chat-container.component.html',
  styleUrl: 'chat-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChatContainerComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('app-chat-container');
  }
}
