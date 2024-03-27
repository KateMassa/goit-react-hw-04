import { useState, useEffect } from "react";
import getImages from "../imagesAPI";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const handleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setLoading(true);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    getImages(query, page)
      .then((results) => {
        setImages((prevImages) => [...prevImages, ...results]);
        setHasMore(results.length > 0);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const loadMoreImages = async () => {
    try {
      const results = await getImages(query, page + 1);
      if (!results || results.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...results]);
        setPage(page + 1);
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSubmit} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {selectedImage && (
            <ImageModal image={selectedImage} onClose={closeModal} />
          )}
          {hasMore && <LoadMoreBtn onClick={loadMoreImages} />}
        </>
      )}
    </div>
  );
};

export default App;
