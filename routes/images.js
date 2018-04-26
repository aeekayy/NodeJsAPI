/** Express Router Providering User Related Routes
 * @module routers/images
 * @requires imageController
 */
const imageController = require('../controllers').images; 
const apiconfig = require('../config/apiconfig');
const sub_name = 'images';
const uuidv4 = require('uuid/v4'); 
const aws = require('aws-sdk');
/* load the AWS configuration */
const s3 = new aws.S3();
var multer = require('multer');
var multerS3 = require('multer-s3');

/* set up multer */
var upload = multer({
        storage: multerS3({
                s3: s3,
                bucket: 'images.stagehunters.com',
                key: function (req, file, cb) {
                        console.log(file);
                        cb(null, uuidv4());
                }
        })
});

module.exports = (app) => {
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id'].join('/'), imageController.getImage);
	app.post('/' + [ 'api', apiconfig.version, sub_name ].join('/'), upload.single('image'), imageController.addImage);
	app.delete('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), imageController.deleteImage);
	app.put('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), imageController.updateImage);
};
