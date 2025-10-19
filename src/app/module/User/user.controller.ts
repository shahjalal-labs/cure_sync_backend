//

import { RequestHandler } from "express";

const createAdmin: RequestHandler = async (req, res) => {
  res.send({
    message: "Hello World",
  });
};

export const UserController = {
  createAdmin,
};
