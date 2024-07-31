import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'http://localhost:8080/api/v1/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {

    return this.http.get<Task[]>(this.apiURL);

  }

  getTask(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.apiURL}/${id}`);
  }


  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiURL, task);
  }

  updateTask(id: number, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiURL}/${id}`, task);
  }

  deleteTask(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  
}
