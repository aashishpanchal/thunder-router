import { getPaths } from "./utils";
import type { Method, Methods, Middleware } from "./interfaces";
import { addAfter, addBefore, addRoute, updateState } from "./state";

/**
 * Helper to create a new request handler method decorator with middleware support (before or after).
 * @example
 * ```typescript
 * class Controller {
 *    #Router("GET", "/test")
 *    test() {
 *      return "Hello World";
 *    }
 * }
 * ```
 */
export function Router(
  method: Method | Methods,
  paths?: string | string[],
): MethodDecorator {
  return (target: any, name: string) => {
    updateState(target, (state) =>
      addRoute(state, name, {
        method: Array.isArray(method) ? method : [method],
        paths: getPaths(paths),
      }),
    );
  };
}

/**
 * Sets middleware after handling a request.
 * @param middleware Array of middleware functions.
 * @returns Decorator
 * @example
 * ```typescript
 * #UseAfter(customSender)
 * class Controller {
 *    #Router("GET", "/test")
 *    #UseAfter(logger)
 *    test() {
 *      return "Hello World";
 *    }
 * }
 * ```
 */
export function UseAfter(...middleware: Middleware[]) {
  return (target: any, name: string | null = null) => {
    updateState(target, (state) => addAfter(state, name, middleware));
  };
}

/**
 * Sets middleware before handling a request.
 * @param middleware Array of RequestHandler
 * @returns Decorator
 * @example
 * ```ts
 * #UseBefore(auth)
 * class Controller {
 *    #Router("GET", "/test")
 *    #UseBefore(logger)
 *    test() {
 *      return "Hello World";
 *    }
 * }
 * ```
 */
export function UseBefore(...middleware: Middleware[]) {
  return (target: any, name: string | null = null) => {
    updateState(target, (state) => addBefore(state, name, middleware));
  };
}

/**
 * @example
 * ```typescript
 * #Controller("test")
 * class NewClass {
 *    #Router("GET", "/test")
 *    test() {
 *      return "Hello World";
 *    }
 * }
 * ```
 */
export function Controller(paths?: string) {
  return (target: any) => {
    updateState(target, (state) => {
      state.root.paths = getPaths(paths)[0];
      return state;
    });
  };
}

// common router decorators
export const Get = (...paths: string[]) => Router("GET", paths);

export const Post = (...paths: string[]) => Router("POST", paths);

export const Put = (...paths: string[]) => Router("PUT", paths);

export const Delete = (...paths: string[]) => Router("DELETE", paths);

export const Patch = (...paths: string[]) => Router("PATCH", paths);

export const All = (...paths: string[]) => Router("ALL", paths);

export const Curd = (...paths: string[]) =>
  Router(["GET", "POST", "PUT", "DELETE", "PATCH"], paths);

export const GetOrPost = (...paths: string[]) => Router(["GET", "POST"], paths);

export const PatchOrPut = (...paths: string[]) =>
  Router(["PATCH", "PUT"], paths);

export const PutOrDelete = (...paths: string[]) =>
  Router(["PUT", "DELETE"], paths);

export const GetOrDelete = (...paths: string[]) =>
  Router(["GET", "DELETE"], paths);
