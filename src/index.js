const mongoose = require('mongoose')
const util = require('util')
const { initMongoose } = require('./infra')

const log = x => console.log(util.inspect(x, { colors: true, depth: null }))

const { Schema } = mongoose

const InitialAssignSchema = new Schema(
  { account_no: String, n: Number },
  { strict: false },
)
const InitialAssign = mongoose.model(
  'InitialAssign',
  InitialAssignSchema,
  'initial_assign',
)

const PaymentResultSchema = new Schema({ accountno: String }, { strict: false })
const PaymentResult = mongoose.model(
  'PaymentResult',
  PaymentResultSchema,
  'payment_result',
)

const perPage = 20

const page = 3

const app = async () => {
  await initMongoose()
  const initialAssigns = await InitialAssign.aggregate([
    {
      $lookup: {
        from: 'payment_result',
        localField: 'account_no',
        foreignField: 'accountno',
        as: 'accounts',
      },
    },
    { $sort: { n: 1 } },
    { $skip: (page - 1) * perPage },
    { $limit: perPage },
  ])

  const result = initialAssigns
    .map(x => ({ ...x, accounts: x.accounts[0] }))
    .map(x => x.n)

  log({ result })
}

app()
