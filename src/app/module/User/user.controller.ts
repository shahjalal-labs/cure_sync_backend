//

import { RequestHandler } from "express";
import { ObjectType } from "../../../types/objectType";

const createAdmin: RequestHandler = async (req, res) => {
  res.send({
    message: "Hello World",
  });
};

export const UserController: ObjectType<RequestHandler> = {
  createAdmin,
};
