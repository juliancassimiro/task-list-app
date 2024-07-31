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

 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewTask = false;
      this.taskService.getTask(+id).subscribe((task) => {
        this.task = task;
      });
    }
  }

  saveTask(): void {
    this.task.priority = this.priorityMapReverse[this.task.priority];
    this.task.status = this.statusMapReverse[this.task.status];
    
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
