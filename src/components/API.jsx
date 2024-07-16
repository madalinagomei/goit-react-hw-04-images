import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '34187261-edb3bdfe414ee3b7adebeccc5',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};
