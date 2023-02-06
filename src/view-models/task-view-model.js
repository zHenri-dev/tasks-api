export class TaskViewModel {
  static toHTTP(task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}