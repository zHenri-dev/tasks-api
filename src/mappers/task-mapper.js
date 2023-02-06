import { Task } from '../entities/task.js'

export class TaskMapper {
  static toDatabase(task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }

  static toDomain(raw) {
    return new Task({
      title: raw.title,
      description: raw.description,
      completedAt: raw.completedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, raw.id)
  }
}