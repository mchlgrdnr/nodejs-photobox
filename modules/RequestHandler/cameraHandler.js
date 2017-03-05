var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
var fs = require('fs');
var cameraHandler = {};
var express = require('express');
var app = express();
var router = express.Router();
var Printer = require('printer');

cameraHandler.init = function () {
	// init camera connection
	GPhoto.list(function (list) {
		this.camera = list[0];

		if (typeof this.camera === 'undefined' ) {
			log.warn('No camera found. Please check connection');
			return;
		} else {
			log.info('Camara found! Model: ' + this.camera.model);
			log.info(this.camera);
		}

		this.camera.takePicture({download: true}, function (err, data) {
			if (err == '-53') {
				process.exit();
			}

			fs.writeFileSync(__dirname + '/picture.jpg', data);
			res.writeHead(200, {'Content-Type': 'image/jpg' });
			res.end(data, 'binary');
			log.info('Took photo');
		});

	});
}

cameraHandler.router = function () {
	router.get('/takepicture', function (req, res) {
		this.camera.takePicture({download: true}, function (er, data) {
			var unix = Math.round(+new Date()/1000);
			fs.writeFileSync(__dirname + '/../../pictures/picture' + unix + '.jpg', data);

			const testFolder = __dirname + '/../../pictures/';
			fs.readdir(testFolder, function (err, files) {
			  res.end(JSON.stringify([
			  	files[files.length - 1]
			  ]));
			});
		});
	});

	router.get('/printpicture/:file', function (req, res) {
		// // Get available printers list
		log.info(Printer.getPrinters());
		log.info(Printer.getPrinterDriverOptions());

		Printer.printFile({
			filename: __dirname + '/../../pictures/' + req.params.file,
			success: function (jobID) {
				log.info("sent to printer with ID: "+jobID);
			},
			error: function (err) {
				log.info(err);
			}
		});

	});

	return router;
}

module.exports = cameraHandler;
