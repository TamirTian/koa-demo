import Router from 'koa-router'

const router = new Router({ prefix: '/user' })

router.get('/', (ctx) => {
  ctx.body = 'user'
})

export default router
