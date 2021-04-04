const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const { ToDoRepository } = require('../models/todoconstr')

const rootFolder = path.dirname(
	require.main.filename || process.require.main.filename
)

const dbFile = `${ rootFolder }/data/tododata.json`

let todoDb = []

const todoRepo = new ToDoRepository()

fs.readFile(dbFile, (err, data) => {
	if (!err) {
		todoDb = JSON.parse(data)
	}
})


router.get('/', (req, res) => {
	fs.readFile(dbFile, (err, data) =>{
		const todos = JSON.parse(data)
		res.render('index', { todos: todos })
	})
})

// localhost:3000/add
router.post('/add', (req, res) => {
    const note_todo = {
        id: generateRandomId(),
        body: req.body.title
    }

    todoDb.push(note_todo)
    
	fs.writeFile(dbFile, JSON.stringify(todoDb), (err) => {
        if (err) {
			res.sendStatus(500)
		} else {
			res.redirect('/')
		}
    })
})

// Edit
router.get('/add/:id/edit', (req, res) =>{
	const id = parseInt(req.params.id)
	const todo = todoRepo.getById(id)
	res.render('edit', {todo})
})

router.post('/add/:id/edit', (req, res) =>{
	const id = parseInt(req.params.id)
	const todo = todoRepo.getById(id)

	todo.body = req.body.body

	todoRepo.update(id, todo, (err) =>{
		if (err) res.sendStatus(500)
	
		res.redirect('/')
	})
})



// Get By ID
router.get('/add/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const todo = todoDb.find(todo => todo.id === id)

	res.render('todo', {todo: todo})
})


// Delete
router.get('/add/:id/delete', (req, res) => {
	const id = parseInt(req.params.id)

	fs.readFile(dbFile, (err, data) => {
		
		const todoDb = JSON.parse(data)
		const filterToDoDb = todoDb.filter(todo => todo.id != id)
	
		fs.writeFile(dbFile, JSON.stringify(filterToDoDb), (err) => {
			if (err) res.sendStatus(500)
	
			res.redirect('/')
		})
	})
})

router.get('/apishowcase', (req, res) => {
	res.render('api')
})

router.get('/api/v1/todos', (req, res) => {
	const todos = todoRepo.getAll()
	res.json(todos)
})


function generateRandomId() {
	return Math.floor(Math.random() * 99999999999) + 1;
}

module.exports = router;