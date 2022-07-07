import React from 'react';
import FetchImages from '../service/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Notification from './Notification/Notification';
import s from './App.module.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [total, setTotal] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTimeout(() => {
      FetchImages(name, page)
        .then(res => {
          setContent(prev => {
            return page === 1 ? res.data.hits : [...prev, ...res.data.hits];
          });
          setStatus('resolved');
          setTotal(res.data.total);
        })
        .catch(error => console.log(error))
        .finally(() => {
          if (page === 1) window.scrollTo(0, 0);
        });
    }, 1000);
  }, [name, page]);

  const getFind = idName => {
    const URL = content.find(({ id }) => id === idName);
    setUrl(URL?.webformatURL);
  };

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  const getSubmitName = (name, page) => {
    setName(name);
    setPage(page);
    setStatus('pending');
  };

  const handleClick = () => {
    setStatus('pending');
    setPage(prev => prev + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={getSubmitName} />
      {total === 0 && <Notification />}
      <ImageGallery>
        <ImageGalleryItem
          content={content}
          toggle={toggleModal}
          getFind={getFind}
        />
      </ImageGallery>

      {content.length > 0 && status === 'resolved' && (
        <Button onClick={handleClick} />
      )}
      {status === 'pending' && <Loader />}
      {showModal && <Modal getFind={url} onClose={toggleModal} />}
    </div>
  );
}

export default App;
