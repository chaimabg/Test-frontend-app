import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ToDo} from "../dashboard/dashboard.component";
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoUrl= "http://localhost:5000/todos";


  constructor(private http: HttpClient) {
  }

  getTodo():Observable<ToDo[]>{
  return this.http.get<ToDo[]>(this.toDoUrl);
 }
 deleteToDo(todos:ToDo[],id:number):any {

   let elet: ToDo | undefined = todos.find(element => element.id == id);
   if (elet) {
     let ind = todos.indexOf(elet);
     todos.splice(ind, 1);
     return todos;
   }
 }
 filterToDo(todos:ToDo[],key:any):any{
   const regex = new RegExp(key, "i");

   const todosFiltred = todos.filter(element =>{
     String(element.id).match(regex)
   });

   return(todosFiltred);
 }


}
