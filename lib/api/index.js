import combineRouters from 'koa-combine-routers'
import firstRouter from './user'
import rootRouter from './root'

const router = combineRouters(
  rootRouter,
  firstRouter
)

export default router
