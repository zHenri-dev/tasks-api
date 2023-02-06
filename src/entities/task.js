import { randomUUID } from 'node:crypto'

export class Task {
  #id
  #props

  constructor(props, id) {
    this.#id = id ?? randomUUID()
    this.#props = {
      ...props,
      completedAt: props.completedAt ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#props.title
  }

  set title(title) {
    this.#props.title = title
    this.#update()
  }

  get description() {
    return this.#props.description
  }

  set description(description) {
    this.#props.description = description
    this.#update()
  }

  get completedAt() {
    return this.#props.completedAt
  }

  complete() {
    this.#props.completedAt = new Date()
    this.#update()
  }

  uncomplete() {
    this.#props.completedAt = null
    this.#update()
  }

  get createdAt() {
    return this.#props.createdAt
  }

  get updatedAt() {
    return this.#props.updatedAt
  }

  #update() {
    this.#props.updatedAt = new Date()
  }
}