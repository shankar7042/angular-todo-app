import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() contentEditableTodoId: string | undefined;

  @Input() todos!: Todo[];
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() selectToEdit = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<{ event: FocusEvent; id: string }>();
  @Output() keydownEvent = new EventEmitter<{
    event: KeyboardEvent;
    id: string;
  }>();
}
