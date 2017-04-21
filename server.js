var fs = require('fs-extra'),
	express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request'),
	stringOutput = '';

/** Define HTTP server, implement some ressources **/
function init(port, applicationServerIP, applicationServerPort) {
	// Initialize variables
	var app,
		naithFlicks = {
			'path': '/naithFlicks/',
			'url': 'http://netflixroulette.net/api/api.php',
			// 'header': {
			// 	'X-Mashape-Key': key,
			// },
		};
	
	// Initialize the HTTP server
	app	= express();
	app.use( express.static(__dirname) )
		.use( bodyParser.urlencoded({ extended: false }) )
		.use( bodyParser.json() )
		.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			next();
		})
		.listen(port);

	// NetFlix API start
		stringOutput += '-------------------------------------------\n';
		stringOutput += ' Netflix: /naithFlicks/....\n';
		stringOutput += '\n';

		// NetFlix: search by actor
			stringOutput += ' GET /actor/:actorName\n';
			app.get	( naithFlicks.path + 'actor/:actorId' , function(req, res) {
				request.get({
					url: naithFlicks.url + '?actor='+req.params.actorId,
					headers: naithFlicks.header,
				}, function(err, httpResponse, body) {
					if (err) {
						res.writeHead(400);
						res.write('Error on the optimization application server: ');
						res.end();
					} else {
						console.log(naithFlicks.url + '?actor='+req.params.actorId);
						res.writeHead(200);
						res.end(body);
					}
				});
			});

		// NetFlix: search by director
			stringOutput += ' GET /director/:directorName\n';
			app.get	( naithFlicks.path + 'director/:directorName' , function(req, res) {
				request.get({
					url: naithFlicks.url + '?director='+req.params.directorName,
					headers: naithFlicks.header,
				}, function(err, httpResponse, body) {
					if (err) {
						res.writeHead(400);
						res.write('Error on the optimization application server: ');
						res.end( );
					} else {
						console.log(naithFlicks.url + '?director='+req.params.directorName);
						res.writeHead(200);
						res.end( body );
					}
				});
			});

		// NetFlix: search by movie title
			stringOutput += ' GET /title/:title\n';
			app.get	( naithFlicks.path + 'title/:title' , function(req, res) {
				request.get({
					url: naithFlicks.url + '?title='+req.params.title,
					headers: naithFlicks.header,
				}, function(err, httpResponse, body) {
					if (err) {
						res.writeHead(400);
						res.write('Error on the optimization application server: ');
						res.end( );
					} else {
						console.log(naithFlicks.url + '?title='+req.params.title);
						res.writeHead(200);
						res.end( body );
					}
				});
			});

		stringOutput += '-------------------------------------------\n';
	// NetFlix API end
}

var params = {}, p;

for(var i=2; i<process.argv.length; i++) {
	p = process.argv[i].split(':');
	params[p[0]] = p[1];
}

var port = '8085',
	applicationServerIP = '127.0.0.1',
	applicationServerPort = port;

	init(port, applicationServerIP, applicationServerPort);
	console.log(stringOutput +' RUN on : 127.0.0.1:8085 !\n');
// } else {
// 	console.log('No key !!');
// }
