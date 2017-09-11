var express = require("express");
var appWeb = express();

// appWeb.use(function (req, res) {

// 	// res.setHeader("Access-Control-Allow-Origin", "*");
// 	// res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	// res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
// 	// res.setHeader("Access-Control-Allow-Headers", "*");

// 	// if (req.method === 'OPTIONS') {
// 	// 	res.writeHead(200);
// 	// 	res.end();
// 	// 	return;
// 	// }

// });

appWeb.use(express.static("web"));

appWeb.listen(1234, function () {
	console.log("Petquest ativo na porta 1234");
});