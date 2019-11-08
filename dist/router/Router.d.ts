interface IRoute {
    [key: string]: (req: any, res: any, next: any) => any;
}
export interface IRouter {
    use?: IRoute[];
    get?: IRoute[];
    put?: IRoute[];
    post?: IRoute[];
    options?: IRoute[];
    delete?: IRoute[];
}
export declare class Router {
    private routes;
    getRoutes(): IRouter;
    get(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    head(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    put(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    post(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    delete(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    options(path: string, middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[]): void;
    use(middleware: ((req: any, res: any, next: any) => any) | ((req: any, res: any, any: any) => any)[] | Router, path?: string): void;
    static(path: string, assetPath: string): void;
    private applyRoute;
    providedIn(app: any): void;
    private setRoutes;
    private applyRouter;
}
export {};
