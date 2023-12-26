import { HttpRes } from "./res/http.res";
import type { HttpHandler, ReqHandler } from "./interfaces";

/**
 * wrapper of request handler
 */
export const wrapper = (
  func: ReqHandler,
  instance: InstanceType<any>,
): HttpHandler => {
  return async (req, res, next) => {
    const ctx = { req, res, next };
    // run promise
    Promise.resolve(func.call(instance, ctx))
      .then((value: HttpRes | any) => {
        if (HttpRes.isHttpRes(value)) res.status(value.statusCode).json(value);
        // check data if exist or not
        else if (value && value !== res) return res.send(value);
      })
      .catch(ctx.next);
  };
};
