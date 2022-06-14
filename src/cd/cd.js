export const cd = async (pathToDir) => {
  try {
    process.chdir(pathToDir[0]);
  } catch (error) {
    console.log('Operation failed');
  }
};

