import { Component, OnInit } from '@angular/core';
import { Priority, Status, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];

  priorityMap: { [key in Priority]: string } = {
    [Priority.LOW]: 'Baixa',
    [Priority.MEDIUM]: 'Média',
    [Priority.HIGH]: 'Alta',
    [Priority.URGENT]: 'Urgente'
  };

  statusMap: { [key in Status]: string } = {
    [Status.TODO]: 'A fazer',
    [Status.DOING]: 'Em progresso',
    [Status.DONE]: 'Concluída'
  };


  constructor(private taskeService: TaskService){}

  ngOnInit(): void{
    //Não entendi para que serve o subscribe
    this.taskeService.getTasks().subscribe((tasks)=>{this.tasks = tasks});
  }

  deleteTask(id: number): void{
    this.taskeService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    })
  }



}
