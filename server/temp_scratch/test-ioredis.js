const Redis = require('ioredis');
const redis = new Redis();
async function test() {
  await redis.set('test:1', '1');
  await redis.set('test:2', '2');
  const keys = ['test:1', 'test:2'];
  try {
    await redis.del(keys);
    console.log('Array works!');
  } catch(e) {
    console.error('Array error:', e.message);
  }
  process.exit(0);
}
test();
