const newscontroller = require('./../controllers/news.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * get all newss
     */
    router
        .route('/news')
        .get(newscontroller.getAll)

    /**
     * add an news
     */
    router
        .route('/news')
        .post(multipartWare, newscontroller.addNews)
    /**
     * delete a news
     */
    router
        .route('/news/delete/:id')
        .get(newscontroller.deleteNews)
    

    // /**
    //  * get a particlular news to view
    //  */
    router
        .route('/news/:id')
        .get(newscontroller.getNews)
}