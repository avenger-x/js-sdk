if (process.env.NODE_ENV === 'production') {
  module.exports = require('./bttc.node.min.js')
} else {
  module.exports = require('./bttc.node.js')
}
