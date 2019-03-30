export default async function (ctx, next) {
  if (ctx.req.url.startsWith('/healthcheck')) {
    ctx.status = 200
    return
  }
  await next()
}
