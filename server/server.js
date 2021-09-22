const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Todo = require('./model')

const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017`,
  {
    useNewUrlParser: false,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: 'todos',
  }
)

const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error: '))
connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
  })
})

app.get('/', async (req, res) => {
  const todos = await Todo.find({})
  if (!todos) return res.json({ message: 'Cannot find any todo' })
  return res.json(todos)
})

app.get('/:id', async (req, res) => {
  const id = req.params.id
  const todo = await Todo.findById(id)
  if (!todo) return res.json({ message: `Cannot find todo with id ${id}` })
  return res.json(todo)
})

app.post('/', async (req, res) => {
  const { description, responsible, priority, completed } = req.body

  const newTodo = new Todo({ description, responsible, priority, completed })
  await newTodo.save()
  if (!newTodo) return res.json({ message: `Cannot create todo.try again!` })
  return res.json(newTodo)
})
app.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { description, responsible, priority, completed } = req.body
  const todo = await Todo.findById(id)
  if (!todo) return res.json({ message: `Cannot find todo with id ${id}` })
  if (description) todo.description = description
  if (responsible) todo.responsible = responsible
  if (priority) todo.priority = priority
  if (completed == true || completed == false) todo.completed = completed
  await todo.save()
  if (!todo) return res.json({ message: `Cannot save todo` })
  return res.json(todo)
})

app.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Todo.findByIdAndRemove(id)
  return res.json({ message: `Todo with id ${id} deleted!` })
})
