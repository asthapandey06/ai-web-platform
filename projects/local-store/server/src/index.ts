import { app } from "./app.js";
import { getPort } from "./config/port.js";

const port = getPort(process.env.PORT);

const server = app.listen(port, () => {
  console.info(`Local Store API listening on port ${port}.`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  console.error("Local Store API failed to start.", error);
  process.exitCode = 1;
});
