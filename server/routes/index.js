const news = require('./news')
const advertisement = require('./advertisement')

module.exports = (router) => {
    news(router)
    advertisement(router)
}