import type { IRouterConfigState } from "../interfaces";

export const STATE = Symbol("router-state");

/**
 * create state function help to create new state of class
 */
export function createState(): IRouterConfigState {
  const state: IRouterConfigState = {
    root: {
      paths: "/",
      before: [],
      after: [],
    },
    methods: new Map(),
  };
  return state;
}

/**
 * get state function help to get state of class
 */
export function getState(target: any): IRouterConfigState {
  return (
    (target && (target.prototype ? target.prototype[STATE] : target[STATE])) ||
    createState()
  );
}

/**
 * set state function help to set state of class
 */
export function setState(target: any, state: IRouterConfigState) {
  if (target.prototype) {
    target.prototype[STATE] = state;
  } else {
    target[STATE] = state;
  }
  return state;
}

/**
 * update state function help to update state of class
 */
export function updateState(
  target: any,
  updater: (state: IRouterConfigState) => IRouterConfigState,
) {
  setState(target, updater(getState(target)));
}
