export interface Task {
  name: string
  description: string
  completed: boolean
  userId: number
}

export default class TaskService {
  async createTask(name: string, description: string, userId: number): Promise<Task> {
    const task = {
      name: name,
      description: description,
      completed: false,
      userId: userId,
    }

    return task
  }
}
