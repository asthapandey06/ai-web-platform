const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

let timer: ReturnType<typeof setInterval> | undefined;
let frame = 0;

export function startProgress(message: string): void {
  frame = 0;

  process.stdout.write(`${frames[frame]} ${message}`);

  timer = setInterval(() => {
    frame = (frame + 1) % frames.length;

    process.stdout.write(
      `\r${frames[frame]} ${message}`
    );
  }, 80);
}

export function finishProgress(
  message: string,
  success = true
): void {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }

  process.stdout.write(
    `\r${success ? "✓" : "✗"} ${message}\n`
  );
}