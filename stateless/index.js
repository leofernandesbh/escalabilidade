const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const redis = require('redis')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = process.env.REDIS_PORT || "6379"

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
})

redisClient.on('error', (err) => console.log('Redis Error', err))
redisClient.connect()

app.get('/', async (req, res) => {
  let contador = await redisClient.get('acessos')
  contador = contador ? parseInt(contador) + 1 : 1

  await redisClient.set('acessos', contador)

  res.render('index', {
    backend: os.hostname(),
    acessos: contador
  })
})

app.listen(8080, () => console.log('🚀 Server is running on port 8080'))