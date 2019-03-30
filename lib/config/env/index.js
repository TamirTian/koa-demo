import common from './common'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`).default

export default Object.assign({}, common, config)
