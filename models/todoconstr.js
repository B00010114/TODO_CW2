const fs = require('fs')


class ToDoRepository{
	constructor(){
		this.todoDb = []
		fs.readFile('./data/tododata.json', (err, data) => {
			if (!err) {
				this.todoDb = JSON.parse(data)
			}
		})
	}

	update(id, updatedToDo, callback){
		const index = this.todoDb.findIndex(todo => todo.id === id)
		this.todoDb[index] = updatedToDo

		this.updateFile(callback)
	}

	getById(id){
		return this.todoDb.find(todo => todo.id === id)
	}

	updateFile(callback){
		fs.writeFile('./data/tododata.json', JSON.stringify(this.todoDb), callback)
	}

	getAll(){
		return this.todoDb
	}
}

module.exports.ToDoRepository = ToDoRepository

