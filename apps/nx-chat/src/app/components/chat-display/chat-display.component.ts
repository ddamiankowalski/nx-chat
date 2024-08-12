import { ClassBinder } from '../../services/class-binder.service';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chat-display',
  templateUrl: 'chat-display.component.html',
  styleUrl: 'chat-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class ChatDisplayComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('app-chat-display');
  }
}
