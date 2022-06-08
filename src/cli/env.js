export const parseEnv = () => {
  const envs = [];
  for (let key in process.env) {
    if (key.match(/RSS_/)) {
      envs.push(`${key}=${process.env[key]}`);
    }
  }
  console.log(envs.join(';'));
};

parseEnv();

