import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {TodoService} from "../services/todo.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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
  displayedColumns: string[] = ['UserId', 'Id', 'Title', 'Completed','action'];
  dataSource: MatTableDataSource<any> ;

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private todoService:TodoService) {
    this.todoService.getTodo().subscribe(todos => {
      this.TODO_List = todos;
      this.config.totalItems = this.TODO_List.length;
    });
    this.dataSource = new MatTableDataSource(this.TODO_List);
  }

  ngOnInit(): void {

  }
  deleteTodo(id:number){
    let elet :ToDo | undefined = this.TODO_List.find(element => element.id == id);
    console.log(elet);
    if(elet) {
      let ind = this.TODO_List.indexOf(elet);
      console.log(ind);
      this.TODO_List.splice(ind,1);
      console.log(this.TODO_List)
    }
  }
}
