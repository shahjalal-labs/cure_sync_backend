//
import { Server } from "http";
import { app } from "./app";
import config from "./config";

export let server: Server;

async function main() {
  server = app.listen(config.port, () => {
    console.log("server running on port:", config.port);
  });
}

main();
