import type { IRoute, Request, Response, NextFunction } from "express";

// context type
export interface ctx<Req = Request, Res = Response, Next = NextFunction> {
  req: Req;
  res: Res;
  next: Next;
}
// requestHandler type
export type ReqHandler = (ctx: ctx) => any;
export type HttpHandler<Req = Request, Res = Response, Next = NextFunction> = (
  req: Req,
  res: Res,
  next: Next,
) => void;

// constructor type
export type Constructor<T = any> = { new (...args: any[]): T };
// http methods
export type Method = Uppercase<keyof IRoute>;
export type Methods = Method[];
// decorator config
export interface IRouteConfig {
  method: Methods;
  paths: string[];
  after: Middleware[];
  before: Middleware[];
}
// state of router config
export interface IRouterConfigState {
  root: {
    paths: string;
    before?: Middleware[];
    after?: Middleware[];
  };
  methods: Map<any, IRouteConfig>;
}
// http middleware type
export type Middleware = any;
// path type
export type PathType = string | string[] | undefined;
