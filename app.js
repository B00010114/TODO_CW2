const express = require('express')

const app = express()


const fs = require('fs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

const indexRoutes = require('./routes/index')
app.use ('/', indexRoutes)

app.use('/assets', express.static('./public'))

app.set('view engine', 'pug')

const port = 3000 
app.listen(port, () => console.log(`Server Started ${port}.` ));

