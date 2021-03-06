import axios from '@/utils/http';

export const fetchData = api => axios.request({
  baseURL: 'http://localhost:3001', // mock
  url: `/${api}`,
}).catch((e) => {
  console.log(e);
});

export const fetchAssets = filename => axios.request({
  url: `/assets/${filename}`,
});

export const fetchWorldData = date => axios.request({
  baseURL: 'http://map.champyin.com/api',
  url: `/${date}`,
  withCredentials: false,
}).catch((e) => {
  console.log(e);
});

export default {};
