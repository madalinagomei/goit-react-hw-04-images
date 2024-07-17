import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from './API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery || page !== 1) {
      getImages();
    }
  }, [searchQuery, page]);

  const formSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageURL => {
    setLargeImageURL(imageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={formSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loadMore && <Button onLoadMore={onLoadMore} page={page} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onCloseModal={closeModal} />
      )}
    </>
  );
};
