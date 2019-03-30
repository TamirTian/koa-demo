const HTTP_CODE = {
  NOT_FOUND: 404,

  INTERNAL_SERVER_ERROR: 500
}

export default async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || HTTP_CODE.NOT_FOUND

    if (status === HTTP_CODE.NOT_FOUND && !ctx.req.url.endsWith('/notfound')) {
      ctx.status = 404
    }
  } catch (err) {
    ctx.status = err.status || HTTP_CODE.INTERNAL_SERVER_ERROR
    if (ctx.status === HTTP_CODE.NOT_FOUND) {
      console.warn(err)
      ctx.body = {
        error_code: 0,
        error_msg: err.message || 'Not Found'
      }
    } else {
      console.error(err)
      if (err.status) {
        ctx.body = {
          error_code: 0,
          error_msg: err.message
        }
      } else {
        ctx.body = {
          error_code: 0,
          error_msg: 'Service exception'
        }
      }
    }
  }
}
