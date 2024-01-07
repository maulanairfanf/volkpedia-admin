import axios from 'axios';
import { TOKEN } from 'src/constant/auth';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const fetch = axios.create({
  baseURL: process.env.API_URL, // Replace with your API base URL
});


// Request interceptor
fetch.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = cookie.get(TOKEN, {path: '/'})

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
fetch.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default fetch;