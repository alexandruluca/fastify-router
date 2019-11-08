"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_static_1 = __importDefault(require("serve-static"));
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const chain_middleware_1 = require("./chain-middleware");
class Router {
    constructor() {
        this.routes = {};
    }
    getRoutes() {
        return this.routes;
    }
    get(path, middleware) {
        this.applyRoute('get', path, middleware);
    }
    head(path, middleware) {
        this.applyRoute('head', path, middleware);
    }
    put(path, middleware) {
        this.applyRoute('put', path, middleware);
    }
    post(path, middleware) {
        this.applyRoute('post', path, middleware);
    }
    delete(path, middleware) {
        this.applyRoute('delete', path, middleware);
    }
    options(path, middleware) {
        this.applyRoute('options', path, middleware);
    }
    use(middleware, path = '/') {
        if (middleware instanceof Router) {
            this.applyRouter(middleware);
            return;
        }
        this.applyRoute('use', path, middleware);
    }
    static(path, assetPath) {
        this.applyRoute('use', path, serve_static_1.default(assetPath));
    }
    applyRoute(method, path, middleware) {
        if (!(Array.isArray(middleware))) {
            middleware = [middleware];
        }
        this.routes[method] = this.routes[method] || {};
        let existingMiddleware = this.routes[method][path];
        if (existingMiddleware) {
            existingMiddleware.push.apply(existingMiddleware, middleware);
            this.routes[method][path] = existingMiddleware;
        }
        else {
            this.routes[method][path] = middleware;
        }
    }
    providedIn(app) {
        this.setRoutes(this, app);
    }
    setRoutes(router, app) {
        let routes = router.getRoutes();
        for (let method in routes) {
            for (let path in routes[method]) {
                let middleware = routes[method][path];
                if (middleware.length > 1) {
                    app[method](path, chain_middleware_1.chainMiddleware(middleware));
                }
                else {
                    app[method](path, middleware[0]);
                }
            }
        }
    }
    applyRouter(router) {
        lodash_defaultsdeep_1.default(this.routes, router.routes);
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map