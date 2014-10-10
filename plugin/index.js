var Joi = require('joi');

var simpleSchema = Joi.object({
        id: Joi.number().required().description('unique identifier for the song'),
        type: Joi.string().valid('song'),
        title: Joi.string().description('title'),
        duration: Joi.number().description('duration in seconds (can be 0)'),
        publishingDate: Joi.string().description('publishing date in ISO 8601 fomart (e.g. 2007-02-23T00:00:00Z)'),
        volumeNumber: Joi.number().description('volumne number of the corresponding album'),
        trackNumber: Joi.number().description('track number of the corresponding album'),
        genres: Joi.array().includes(Joi.string()).description('list of genres'),
        adfunded: Joi.boolean().description('allowed for adfunded soluations'),
        streamable: Joi.boolean().description('allowed for streaming soluations'),
        bundleOnly: Joi.boolean().description('allowed for single purchase, if bundleOnly equals false'),
    }).options({className: 'Song'});


exports.register = function (plugin, options, next) {
    plugin.route({
        method: 'GET',
		path: '/song/{id}',
		config: {
			description: 'Get a song by it\'s unique identifier.',
			notes: '<p>Returns the song by Mondia\'s unique identifier. If the given id does not exists a NOT_FOUND error is returned.</p>' +
                '<p><h4>Possible Use Cases</h4><ul>' +
                '<li>show an song detail page</li>' +
                '</ul></p>',
			tags: ['api'],
			//auth: {
            //    strategy: 'police',
            //    entity: 'any'
            //},
            plugins: {
                kissCache : {
                    expiresIn: 1000 * 60 * 10, // 10 minutes,
                    notUserSpecific: true
                }
            },
            validate: {
                params: {
                    id: Joi.number().min(1).max(2147483647).required()
                }
            },
			handler: function (request, reply) {
				reply('hello world');
			},
			response: {
                sample: 0,
                failAction: 'log',
                schema: simpleSchema
            }
		}
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};