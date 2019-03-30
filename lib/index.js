import Koa from 'koa'
import api from './api'
import koaBody from 'koa-body'
import config from './config/env'
import healthcheck from './middleware/healthcheck'
import errorHandler from './middleware/error-handler'
import http from 'http'

const port = config.port || 5001
const app = new Koa()
const server = http.createServer(app.callback())

process.on('uncaughtException', (err) => {
  console.error(err)
})

app.use(healthcheck)
app.use(koaBody())
app.use(errorHandler)
app.use(api())

setTimeout(() => {
  server.listen(port, () => console.info(`Server listening ${port}`))
}, 1000)
