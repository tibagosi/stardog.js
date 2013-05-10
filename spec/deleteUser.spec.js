var stardog = require('../js/stardog');
var qs = require('querystring');

describe ("Delete Users Test Suite", function() {
	var conn;

	beforeEach(function() {
		conn = new stardog.Connection();
		conn.setEndpoint("http://localhost:5822/");
		conn.setCredentials("admin", "admin");
	});

	afterEach(function() {
		conn = null;
	});


	it ("should return NOT_FOUND trying to delete a non-existent user.", function (done) {
		conn.deleteUser({ user: 'someuser' }, function (data, response) {
			expect(response.statusCode).toBe(404);

			done();
		});
	});

	it ("should delete a supplied user recently created.", function (done) {
		// create a new user (this is supposed to change in a future version of the API)

		conn.createUser({ username: 'newuser', password: 'newuser', superuser: true }, function (data, response) {

			// It should be 201 (CREATED)
			expect(response.statusCode).toBe(201);

			// Once created then lets delete it.
			conn.deleteUser({ user: 'newuser' }, function (data, response) {

				expect(response.statusCode).toBe(200);

				done();
			});
		});
	});
});