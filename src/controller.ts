import { Router } from "express";
import { wrapper } from "./wrapper";
import { getState, rollUpState } from "./state";
import type { Constructor } from "./interfaces";

type Instance<T> = InstanceType<Constructor<T>>;

/**
 * get method from class
 */
const getHandler = (instance: any, key: string): Function => {
  // get handler
  const handler = instance[key];
  // if handler is not method throw error
  if (typeof handler !== "function")
    throw new Error(
      `Function ${handler as string} is not found in ${
        instance.constructor.name
      } class`
    );
  return handler;
};

/**
 * Return router of class
 */
export function createRouter<T>(constructor: Constructor<T>): Router {
  const instance: Instance<T> = new constructor();
  return makeRouter(instance, wrapper);
}

/**
 * make router using instance
 */
export function makeRouter<T>(
  instance: Instance<T>,
  asyncFunc: Function
): Router {
  const router = Router();
  // get state, when set by decorators
  const state = rollUpState(getState(instance));
  // set routes
  state.forEach((config, key) => {
    // get handler
    const handler = asyncFunc(getHandler(instance, key), instance);
    // get middlewares
    const { after, before, method, paths } = config;
    // update router
    method.forEach((m) => {
      router[m.toLowerCase()](paths, before, handler, after);
    });
  });
  return router;
}
