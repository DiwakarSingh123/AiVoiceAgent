// const { createClient } =require('redis');
import { createClient } from 'redis';
// require('dotenv').config();
const redisClient = createClient({
    url: process.env.REDIS_URL || undefined,
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || '857oLzgkbM4oHmDy56arTbKTAiTTxWgb',
    socket: process.env.REDIS_URL ? undefined : {
        host: process.env.REDIS_HOST || 'redis-15839.c262.us-east-1-3.ec2.cloud.redislabs.com',
        port: parseInt(process.env.REDIS_PORT || '15839')
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export default redisClient;
