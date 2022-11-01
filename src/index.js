const _ = require('lodash/fp')
const util = require('util')
const { data } = require('./data')

const log = x =>
  console.log('>', util.inspect(x, { colors: true, depth: null }))

const results = _.pipe(
  _.groupBy('oaName'),
  _.tap(console.log),
  _.entries,
  _.map(([k, v]) => ({
    oaName: k,
    grandTotalCommission: _.sumBy('totalCommission')(v),
    grandTotalPayment: _.sumBy('paymentAmount')(v),
    billCycles: _.pipe(
      _.filter(v => v.billCycle),
      _.groupBy('billCycle'),
      _.entries,
      _.map(([k, v]) => ({
        billCycle: k,
        totalCommission: _.sumBy('totalCommission')(v),
        totalPayment: _.sumBy('paymentAmount')(v),
        details: v,
      })),
    )(v),
  })),
)(data)

log(results)

const result = [
  {
    oaName: 'abc',
    grandTotalCustomer: 10,
    grandTotalCommission: 1000,
    grandTotalPayment: 2000,
    billCycles: [
      {
        billCycle: 14,
        totalCustomer: 2,
        totalCommission: 200,
        totalPayment: 200,
        details: [
          {
            subTotalCustomer: 1,
            subTotalPayment: 100,
            numberOfAccountSent: 2,
            numberOfAccountProtect: 2,
            percentageOfAccountProtect: 3,
            details: [
              {
                accountStatus: 'Npl',
              },
            ],
          },
        ],
      },
      {
        billCycle: 20,
        totalCustomer: 2,
        totalCommission: 200,
        totalPayment: 200,
      },
      {
        billCycle: 30,
        totalCustomer: 2,
        totalCommission: 200,
        totalPayment: 200,
      },
    ],
  },
]

// mappedData.forEach(console.log)

// const results = _.pipe(
//   _.map(v => v * 10),
//   _.filter(v => v <= 20),
//   _.sum,
//   _.multiply(10),
// )([1, 1.5, 2, 3, 3])

// console.log({ results })

// const greet = fn => {
//   fn('hello world')
// }

// const log = v => {
//   console.log(v)
// }

// greet(v => {
//   log(v)
// })

// greet(log)
