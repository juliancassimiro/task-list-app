export enum Priority{
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
  }

  export interface Task {
    id?: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
  }