export function getPort(rawPort: string | undefined): number {
  if (rawPort === undefined || rawPort.trim() === "") {
    return 3001;
  }

  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
}
