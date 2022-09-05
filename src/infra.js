const mongoose = require('mongoose')

exports.initMongoose = () =>
  new Promise((reslove, reject) => {
    const url = 'mongodb://localhost:27017/ddebt'
    mongoose.connect(url).catch(reject)
    mongoose.connection.once('open', () => {
      console.log(`Connected to ${url}`)
      reslove()
    })
  })
