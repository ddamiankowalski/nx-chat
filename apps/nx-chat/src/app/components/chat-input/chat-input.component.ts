import { ClassBinder } from '../../services/class-binder.service';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-chat-input',
  templateUrl: 'chat-input.component.html',
  styleUrl: 'chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [InputTextModule, FormsModule],
})
export class ChatInputComponent {
  public textValue = signal<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('app-chat-input');
  }
}
