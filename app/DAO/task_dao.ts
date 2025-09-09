import Task from '#models/task'

export default class TaskDAO {
  public async insertNewTask(name: string, description: string, userId: number): Promise<Task> {
    const task = await Task.create({
      name,
      description,
      userId,
      completed: false,
    })

    return task
  }

  public async taskExists(taskId: number): Promise<boolean> {
    const task = await Task.find(taskId)
    return task !== null
  }

  public async completeTask(taskId: number, userId: number): Promise<Task> {
    const task = await Task.query()
      .where('id', taskId)
      .andWhere('userId', userId)
      .firstOrFail()
    
    task.completed = true
    await task.save()
    
    return task
  }
  
  public async taskBelongsToUser(taskId: number, userId: number): Promise<boolean> {
    const task = await Task.query()
      .where('id', taskId)
      .andWhere('userId', userId)
      .first()
    
    return task !== null
  }
}
