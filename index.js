var express = require("express");
var appWeb = express();

appWeb.use(express.static("web"));

appWeb.listen(1234, function () {
	console.log("Petquest ativo na porta 1234");
});