import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from './todo';

const LOCALSTORAGE_KEY = 'angular-todos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit, OnInit {
  todoText: string = '';
  todos: Todo[] = [];
  contentEditableTodoId: string | undefined;

  ngOnInit(): void {
    this.loadTodosFromLocalStorage();
  }

  @ViewChild('textInputRef') textInputRef:
    | ElementRef<HTMLInputElement>
    | undefined;

  ngAfterViewInit(): void {
    this.textInputRef?.nativeElement.focus();
  }

  saveToLocalStorage() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.todos));
  }

  loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem(LOCALSTORAGE_KEY);
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  }

  handleTodoChanges(): void {
    this.saveToLocalStorage();
  }

  handleSubmit(event: any) {
    event.preventDefault();
    if (!this.todoText) {
      alert('Please fill up the input field first');
    } else {
      this.todos.push({
        id: crypto.randomUUID(),
        text: this.todoText,
        done: false,
      });
      this.todoText = '';
      this.handleTodoChanges();
    }
    this.textInputRef?.nativeElement.focus();
  }

  handleDeleteTodo(id: string) {
    // this.todos = this.todos.filter((todo) => todo.id !== id);
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.handleTodoChanges();
    }
  }

  setContentEditTodoId(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    // edit the todo only if id is valid and it should not be completed
    if (todoIndex !== -1 && !this.todos[todoIndex].done) {
      this.contentEditableTodoId = id;
    } else {
      alert("You can't edit the completed task");
    }
  }

  editTodo(event: FocusEvent | KeyboardEvent, id: string) {
    const element = event.target as HTMLParagraphElement;
    const text = element.innerText.trim();
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) this.todos[todoIndex].text = text;
    element.contentEditable = 'false';
    this.contentEditableTodoId = undefined;
    this.handleTodoChanges();
  }

  handleEditTodo(event: FocusEvent, id: string) {
    this.editTodo(event, id);
  }

  handleKeyPressEvent(event: KeyboardEvent, id: string) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.editTodo(event, id);
    }
  }
}
