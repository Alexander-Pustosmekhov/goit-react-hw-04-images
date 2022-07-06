import axios from 'axios';

async function FetchImages(name, page) {
  const URL = 'https://pixabay.com/api/';
  const BASE_KEY = '28009365-b13229069e90e89edcbb86dcf';
  const options = new URLSearchParams({
    key: BASE_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });
  return await axios.get(`${URL}?${options}`);
}

export default FetchImages;
