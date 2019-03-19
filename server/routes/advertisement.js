const advcontroller = require('./../controllers/advertisement.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * get all ads
     */
    router
        .route('/ad')
        .get(advcontroller.getAll)

    router
        .route('/ad')
        .post(multipartWare, advcontroller.addAds)

    // /**
    //  * get a particlular add to delete
    //  */
    
    router
        .route('/ad/delete/:id')
        .get(advcontroller.deleteAds)

    // /**
    //  * get a particlular add to view
    //  */
    
    router
        .route('/ad/:id')
        .get(advcontroller.getAds)
}