// const { createClient } =require('redis');
import { createClient } from 'redis';
// require('dotenv').config();
const redisClient = createClient({
    username: 'default',
    password: '2hODpMAPkzdtgPxOf5wpmIJJTmIOpoXs',
    socket: {
        host: 'redis-14553.c262.us-east-1-3.ec2.cloud.redislabs.com',
        port: 14553
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export default redisClient;
