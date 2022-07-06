import axios from 'axios';
import PropTypes from 'prop-types';

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

FetchImages.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default FetchImages;
