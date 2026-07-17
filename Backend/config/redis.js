// const { createClient } =require('redis');
import { createClient } from 'redis';
// require('dotenv').config();
const redisClient = createClient({
     username: 'default',
    password: '857oLzgkbM4oHmDy56arTbKTAiTTxWgb',
    socket: {
        host: 'redis-15839.c262.us-east-1-3.ec2.cloud.redislabs.com',
        port: 15839
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export default redisClient;
