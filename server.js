var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/feed', function (req, res) {
	console.log("The server recieved the get request");
});

app.listen(8080);
console.log("Server running on port 8080");