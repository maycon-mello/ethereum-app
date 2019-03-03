/* istanbul ignore file */

import axios from 'axios';

axios.defaults.baseURL = `${process.env.API_URL}`;

export default axios;