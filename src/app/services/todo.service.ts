import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ToDo} from "../dashboard/dashboard.component";
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoUrl= "https://jsonplaceholder.typicode.com/todos";

  constructor(private http: HttpClient) { }

  getTodo():Observable<ToDo[]>{
  return this.http.get<ToDo[]>(this.toDoUrl);
 }


}
