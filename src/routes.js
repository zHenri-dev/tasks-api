import { Database } from './database.js'
import { Task } from './entities/task.js'
import { TaskMapper } from './mappers/task-mapper.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { TaskViewModel } from './view-models/task-view-model.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: async (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Title required.'
        }))
      }

      if (!description) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Description required.'
        }))
      }

      const task = new Task({
        title,
        description,
      })

      await database.insert('tasks', TaskMapper.toDatabase(task))

      return res.writeHead(201).end()
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: async (req, res) => {
      const rawTasks = await database.select('tasks')

      const tasks = rawTasks.map(TaskMapper.toDomain)

      return res.end(JSON.stringify({
        tasks: tasks.map(TaskViewModel.toHTTP)
      }))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Title required.'
        }))
      }

      if (!description) {
        return res.writeHead(400).end(JSON.stringify({
          message: 'Description required.'
        }))
      }

      const [rawTask] = await database.select('tasks', { id })

      if (!rawTask) {
        return res.writeHead(404).end()
      }

      const task = TaskMapper.toDomain(rawTask)

      task.title = title
      task.description = description

      await database.update('tasks', id, TaskMapper.toDatabase(task))

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res) => {
      const { id } = req.params

      const [rawTask] = await database.select('tasks', { id })

      if (!rawTask) {
        return res.writeHead(404).end()
      }

      await database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: async (req, res) => {
      const { id } = req.params

      const [rawTask] = await database.select('tasks', { id })

      if (!rawTask) {
        return res.writeHead(404).end()
      }

      const task = TaskMapper.toDomain(rawTask)

      if (task.completedAt) {
        task.uncomplete()
      } else {
        task.complete()
      }

      await database.update('tasks', id, TaskMapper.toDatabase(task))

      return res.writeHead(204).end()
    }
  }
]