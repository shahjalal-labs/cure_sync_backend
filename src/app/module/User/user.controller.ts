//

import { RequestHandler } from "express";
import { UserService } from "./user.service";

const createAdmin: RequestHandler = async (req, res) => {
  const result = await UserService.createAdminIntoDB(req.body);
  res.send({
    message: "Hello World",
    data: result,
  });
};

export const UserController = {
  createAdmin,
};
