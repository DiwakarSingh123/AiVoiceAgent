// const { createClient } =require('redis');
import { createClient } from 'redis';
// require('dotenv').config();
const redisClient = createClient({
    username: 'default',
    password: '1qP8EdOAA4dOz4WEJFnmPcJZEZddHHlZ',
    socket: {
        host: 'redis-18216.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18216
    }
});


export default redisClient;
