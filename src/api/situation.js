import axios from '@/utils/http';

export const fetchData = options => axios.request({
  url: '/data',
  baseURL: 'http://localhost:3001',
  ...options,
}).catch((e) => {
  console.log(e);
});
export default {};
