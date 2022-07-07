import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ content, toggle, getFind }) {
  return (
    <>
      {content.map(({ id, largeImageURL, user }) => {
        return (
          <li
            className={s.ImageGalleryItem}
            key={id}
            onClick={() => {
              getFind(id);
              toggle();
            }}
          >
            <img
              src={largeImageURL}
              alt={user}
              className={s.ImageGalleryItemImage}
            />
          </li>
        );
      })}
    </>
  );
}

ImageGalleryItem.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  getFind: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
