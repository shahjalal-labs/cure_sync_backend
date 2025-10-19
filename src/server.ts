//
import { Server } from "http";
import { app } from "./app.js";

const PORT = 6009;
export let server: Server;

async function main() {
  server = app.listen(PORT, () => {
    console.log("server running on port:", PORT);
  });
}

main();
