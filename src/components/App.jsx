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

class App extends React.Component {
  state = {
    name: '',
    content: [],
    page: 1,
    status: 'idle',
    showModal: false,
    url: null,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const name = this.state.name.trim().toLowerCase();
    const page = this.state.page;
    if (prevState.name !== name) {
      setTimeout(() => {
        FetchImages(name, page)
          .then(res => {
            this.setState({
              content: res.data.hits,
              status: 'resolved',
              total: res.data.total,
            });
          })
          .catch(error => console.log(error));
      }, 1000);
    }
  }

  getFind = idName => {
    const { content } = this.state;
    const URL = content.find(({ id }) => id === idName);
    this.setState({ url: URL?.webformatURL });
  };

  toggleModal = () => {
    return this.setState(prev => ({
      showModal: !prev.showModal,
    }));
  };

  getSubmitName = (name, page) => {
    this.setState({ name: name, page: page, status: 'pending' });
  };

  handleClick = () => {
    this.setState({ status: 'pending' });
    const name = this.state.name;
    const page = this.state.page + 1;
    setTimeout(() => {
      FetchImages(name, page)
        .then(res => {
          this.setState(prev => ({
            content: [...prev.content, ...res.data.hits],
            page,
            status: 'resolved',
          }));
        })
        .catch(error => console.log(error));
    }, 1000);
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.getSubmitName} />
        {this.state.total === 0 && <Notification />}
        <ImageGallery>
          <ImageGalleryItem
            content={this.state.content}
            toggle={this.toggleModal}
            getFind={this.getFind}
          />
        </ImageGallery>

        {this.state.content.length > 0 && this.state.status === 'resolved' && (
          <Button onClick={this.handleClick} />
        )}
        {this.state.status === 'pending' && <Loader />}
        {this.state.showModal && (
          <Modal getFind={this.state.url} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
