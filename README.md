# thunder-router

> This package is intended for use with HTTP libraries that want to configure routes using **ESNext decorators**.

# Install

With `npm`:

```
npm install thunder-router
```

With `yarn`

```
yarn add thunder-router
```

With `pnpm`

```
pnpm add thunder-router
```

# Example

The end-user of the routing library will be able to use decorators or set up their routes, middleware and methods.

```ts
// You may re-export these as well.
import { ApiRes, Controller, Get, GetOrPost, Post, UseAfter, UseBefore, ctx } from "thunder-router";

@Controller("/news")
@UseBefore(bodyParse(),...)
export default class NewsController {
  @Get(":id")
  async find(ctx: ctx) {
    return ApiRes.Ok(ctx.req.params, "Custom Message");
  }

  @GetOrPost()
  async get(ctx: ctx) {
    if (ctx.req.method === "GET") return "This is Get Request";
    return "This is Post Request";
  }

  @Post()
  @UseBefore(middleware,...)
  @UseAfter(middleware, ...)
  async save(ctx: ctx) {
    return ApiRes.Created(ctx.req.body, "Created Request")
  }
}
```

```ts
import express from "express";
import { createRouter } from "thunder-router";
import { UserController } from "./user.controller";

const app = express();

app.use(express.json());

app.use(createRouter(UserController));

app.listen(3000, () => console.log("Server Listen On 3000"));
```

# Hom to make custom router

```ts
import { Router } from "thunder-router";

export const Curd = (...paths: string[]) =>
  Router(["GET", "POST", "PUT", "DELETE", "PATCH"], paths);

export const GetOrPost = (...paths: string[]) => Router(["GET", "POST"], paths);

export const PatchOrPut = (...paths: string[]) =>
  Router(["PATCH", "PUT"], paths);

export const PutOrDelete = (...paths: string[]) =>
  Router(["PUT", "DELETE"], paths);

export const GetOrDelete = (...paths: string[]) =>
  Router(["GET", "DELETE"], paths);
```

# Example with typedi

```ts
import "reflect-metadata";
import { Container, Service } from "typedi";
import { makeRouter, wrapper } from "thunder-router";

export const createRouter = (cls: any) => {
  const instance = Container.get(cls);
  return makeRouter(instance, wrapper);
};

// Service
@Service()
export class UserService {
  getName() {
    return "Hello World";
  }
}
// Controller
@Service()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  get() {
    return this.service.getName();
  }
}

// application
app.use("user", createRouter(UserController));
```

same in other ioc package.like typedi, tsyringe.

# Author

Aashish Panchal — [@aashish](https://twitter.com/aashish405)
