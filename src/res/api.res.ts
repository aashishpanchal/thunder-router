import httpStatus from "http-status";
import { HttpRes } from "./http.res";

export class ApiRes {
  static serializer(object: any, value: any) {
    return value && object ? value : value;
  }

  static Ok(data: any, message?: string, cls?: any) {
    return new HttpRes(this.serializer(cls, data), httpStatus.OK, message);
  }

  static Created(data: any, message?: string, cls?: any) {
    return new HttpRes(this.serializer(cls, data), httpStatus.CREATED, message);
  }
}
