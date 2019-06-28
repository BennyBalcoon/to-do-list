import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)'}),
        animate(500, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(500, style({ opacity: 0, transform: 'translateY(30px)'}))
      ])
    ])
  ]
})
export class TodolistComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  beforeEditCache: string;
  filter: string;

  constructor() { }

  ngOnInit() {
    this.filter = "all";
    this.beforeEditCache = "";
    this.todoTitle = "";
    this.todos = [
      {
        "id": 1,
        "title": "Finish Angular Screencast",
        "completed": false,
        "editing": false,
      },
      {
        'id': 2,
        'title':'Take over world',
        "completed": false,
        "editing": false,
      },
      {
        'id': 3,
        'title':'One more thing',
        "completed": false,
        "editing": false,
      },
    ];
  }

  addTodo() {
    this.todos.push({
      id: 4,
      title: this.todoTitle,
      completed: false,
      editing: false
    })
    
    this.todoTitle = "";
  }

  editTodo(todo: Todo) {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo) {
    if(todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo) {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo() {
    this.todos.splice(this.todos.length-1, 1);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos() {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): Todo[] {
    if (this.filter === "all") {
      return this.todos
    } else if (this.filter === "active") {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === "completed") {
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos
  }

}

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  editing: boolean
}
