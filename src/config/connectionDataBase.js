import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const clientDataBase = new Client({
     user:process.env.user,
     host:process.env.host,
     database:process.env.database,
     password:process.env.password,
     port:process.env.port
})


export default clientDataBase;