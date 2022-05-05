import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  TODO_List: ToDo[] = [];
  headers: string[] = ['UserId', 'Id', 'Title', 'Completed','action'];

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  page: number = 1;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(private todoService:TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodo().subscribe(todos => {
      this.TODO_List = todos;
      this.config.totalItems=this.TODO_List.length;
    });
  }
  deleteTodo(id:number){
    this.TODO_List = this.todoService.deleteToDo(this.TODO_List,id);
    this.config.totalItems=this.TODO_List.length;
  }

  search($event: KeyboardEvent) {
   this.TODO_List=this.todoService.filterToDo(this.TODO_List,$event.key)
    console.log(this.TODO_List)
  }
}
