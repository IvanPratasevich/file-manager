export const currentDirectory = () => {
  const currentDir = process.cwd();
  process.stdout.write(`You are currently in ${currentDir}\n`);
};