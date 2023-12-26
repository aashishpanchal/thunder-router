import { uniq } from "../utils";
import type {
  Method,
  Middleware,
  IRouteConfig,
  IRouterConfigState,
} from "../interfaces";

/**
 * add new router, like post, get and others
 */
export function addRoute(
  state: IRouterConfigState,
  methodName: string,
  options: {
    paths: string[];
    method: Method[];
  },
): IRouterConfigState {
  const config = state.methods.get(methodName);
  if (config) {
    // update config
    state.methods.set(methodName, {
      ...config,
      paths: uniq(options.paths),
      method: uniq(options.method),
    });
  } else
    state.methods.set(methodName, {
      method: uniq(options.method),
      paths: uniq(options.paths),
      after: [],
      before: [],
    });

  return state;
}

/**
 * add middleware after request
 */
export function addAfter(
  state: IRouterConfigState,
  name: null | string,
  middleware: Middleware[],
): IRouterConfigState {
  // if name is not null then add after to specific route
  if (name) {
    const route = state.methods.get(name);
    // after add
    if (route) route.after.push(...middleware);
    // if not exit, then
    else
      state.methods.set(name, {
        method: [],
        paths: [],
        before: [],
        after: middleware,
      });
  }
  // add after to all routes
  else state.root.after.push(...middleware);
  // return state
  return state;
}

/**
 * add middleware before request
 */
export function addBefore(
  state: IRouterConfigState,
  name: null | string,
  middleware: Middleware[],
): IRouterConfigState {
  // if name is not null then add before to specific route
  if (name) {
    const route = state.methods.get(name);
    // before add
    if (route) route.before.push(...middleware);
    // if not exit, then
    else
      state.methods.set(name, {
        method: [],
        paths: [],
        before: middleware,
        after: [],
      });
  }
  // add before to all routes
  else state.root.before.push(...middleware);
  // return state
  return state;
}

/**
 * Rolls up state so paths are joined, middleware rolled into
 * the correct order, etc.
 *
 * @param state
 */
export function rollUpState(
  state: IRouterConfigState,
): Map<string, IRouteConfig> {
  const result = new Map<string, IRouteConfig>();
  state.methods.forEach((method, key) => {
    result.set(key, {
      paths: concatPaths(state.root.paths, method.paths),
      method: method.method,
      before: [...state.root.before, ...method.before],
      after: [...method.after, ...state.root.after],
    });
  });
  return result;
}

/**
 * Concatenates root and method paths so we have one for each combination.
 */
function concatPaths(rootPaths: string, methodPaths: string[]) {
  if (!rootPaths) return methodPaths;

  const result: string[] = [];

  methodPaths.forEach((methodPath) => {
    result.push(rootPaths + methodPath);
  });

  return result;
}
