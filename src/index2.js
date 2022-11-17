const { pipe, map } = require('lodash/fp')
const _ = require('lodash')

// const pipe =
//   (...fns) =>
//   x =>
//     fns.reduce((x, fn) => fn(x), x)

const n = 10

const multiplyBy2 = x => x * 2

const add5 = x => x + 5

// const result = multiplyBy2(add5(n))

const add5AndMultiplyBy2 = pipe(add5, multiplyBy2)

console.log(add5AndMultiplyBy2(200))

console.log(add5AndMultiplyBy2(-60))

const xs = [1, 2, 3]

console.log(_.map(xs, x => x * 2))

console.log(map(x => x * 5)(xs))
