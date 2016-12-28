var express = require("express");
var appWeb = express();

appWeb.use(express.static("web"));

appWeb.listen(9000, function(){
	console.log("Petquest ativo na porta 9000");
});