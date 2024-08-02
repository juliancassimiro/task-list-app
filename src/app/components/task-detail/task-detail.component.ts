import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, Priority, Status } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    priority: Priority.LOW,
    status: Status.TODO
  };
  isNewTask = true;
  priorities = ['Baixa', 'Média', 'Alta', 'Urgente']
  statuses = [ 'A fazer', 'Em progresso', 'Concluída']

  priorityMapReverse: { [key: string]: Priority } = {
    'Baixa': Priority.LOW,
    'Média': Priority.MEDIUM,
    'Alta': Priority.HIGH,
    "Urgente": Priority.URGENT
  };

  statusMapReverse: { [key: string]: Status } = {
    'A fazer': Status.TODO,
    'Em progresso': Status.DOING,
    'Concluída': Status.DONE
  };

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


  // priorities = Object.values(Priority);
  // statuses = Object.values(Status);

 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isNewTask = false;
      this.taskService.getTask(Number(taskId)).subscribe((task: Task) => {
        this.task = task;
      });
    }
  }

  saveTask(): void {
    if (this.isNewTask) {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.updateTask(this.task.id!, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
