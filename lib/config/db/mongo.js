import mongoose from 'mongoose'
import env from '../env'

export default mongoose.connection = mongoose.createConnection(env.database, {
  useNewUrlParser: true,
  useFindAndModify: false
})
