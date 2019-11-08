# fastify-router

Simple and easy to use express like router for fastify

# Usage

```
import {Router} from "fasti-router";
import fastify from "fastify";

const app = fastify();
const router = new Router();

router.providedIn(app);

app.listen(8000, (err, address) => {
	if (err) {
		throw err;
	}
	console.log(`server listening on ${address}`)
});

router.use([async function (req, res, next) {
	return next(new Error('catched error'));
}, (req, res, next) => {
	console.log('use 2');
	next();
}]);

// express like error handling
router.use((err, req, res, next) => {
    res.end(JSON.stringify({success: true, message: `err: ${err.message} catched`}));
});

router.get('/hello-world', async function (req, res) {
	res.send({hello: "world"});
});

export async function getRouter() {
	return router;
}
```