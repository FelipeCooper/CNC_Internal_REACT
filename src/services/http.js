import axios from 'axios'
const https = require('https');
export const http = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      }),
  baseURL: 'https://localhost:3001/api/'
})