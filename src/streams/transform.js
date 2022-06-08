import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export const transform = async () => {
  console.log(`To exit press press CTRL + C`);
  const input = process.stdin;
  const output = process.stdout;
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      const chunkString = chunk.toString().trim();
      const chunkReverse = chunkString.split('').reverse().join('');
      callback(null, chunkReverse + '\n');
    },
  });
  try {
    await pipeline(input, transform, output);
  } catch (error) {
    process.stderr.write('Error:' + ' ' + error.message);
    process.exit(1);
  }
};

transform();

