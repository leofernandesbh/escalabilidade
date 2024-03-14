const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

let contador = 0

app.get('/', async (req, res) => {
  contador++
  res.render('index', {
    backend: os.hostname(),
    acessos: contador
  })
})

app.listen(8080, () => console.log('🚀 Server is running on port 8080'))