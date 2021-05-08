// app.js: register the route. In our case, we don't want authorization for this route



// healthcheck.routes.js: return a 2xx response when your server is healthy, else send a 5xx response
import express from 'express';

const routerHealth = express.Router({});
routerHealth.get('/', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});
// export router with all routes included
module.exports = routerHealth;


// healthcheck.spec.js (services like Pingdom or Freshping do a similar approach to check whether your server is healthy)
// routerHealth.describe('Healthcheck', () => {

// 	it('returns 200 if server is healthy', async () => {
// 		const res = await routerHealth.get(`/healthcheck`, null)
// 			.expect(200);
// 		expect(res.body.uptime).toBeGreaterThan(0);
// 	});

// });