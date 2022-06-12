export const parseArgs = () => {
  const argsArr = process.argv.splice(2);
  let username;
  argsArr.forEach((el) => {
    if (el.replace('--', '').startsWith('username')) {
      username = el.split('=')[1];
    } else{
      username = 'Anonymous';
    }
  });
  return username;
};

