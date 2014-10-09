var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000, { labels: ['api'] });

server.pack.register({
	plugin: require('hapi-swaggered'),
	options: {
		// requiredTags have to be present for all routes exposed through hapi-swaggered
		requiredTags: ['api'],
		produces: ['application/json'],
		consumes: ['application/json'],
		apiVersion: require('./package.json').version,
		endpoint: '/swagger',
		routeTags: ['swagger'],
		// responseValidation for hapi-swaggered routes
		responseValidation: false,
		cache: {
			// default value 15 minutes... hapi caching options
			expiresIn: 15 * 60 * 1000
		},
		descriptions: {
			token: 'Test description'
		},
		info: {
			title: "Title",
			description: "Description",
			termsOfServiceUrl: "http://hapijs.com/",
			contact: "xxx@xxx.com",
			license: "XXX",
			licenseUrl: "http://XXX"
		}
	}
}, {
	select: 'api',
	route: {
		prefix: '/swagger'
	}
}, function (err) {
});


server.pack.register({
	plugin: require('hapi-swaggered-ui'),
	options: {
		title: 'Page Title',
		// swaggerEndpoint is optional if hapi-swaggered-ui is used on the same server
		// swaggerEndpoint: 'http://localhost:8000/swagger/api-docs',
		// authorization is optional
		authorization: {
			field: 'Authorization',
			scope: 'header',
			valuePrefix: 'bearer '
		}
	}
}, {
	select: 'api',
	route: {
		prefix: '/docs'
	}
}, function (err) {
});


// Add the route
server.route({
	method: 'GET',
	path: '/hello',
	config: {
		description: 'Say hello!',
		notes: 'The user parameter defaults to \'stranger\' if unspecified',
		tags: ['api'],
		handler: function (request, reply) {
			reply('hello world');
		}
	}
});

// Start the server
server.start();
