// App.jsx
import { useState, useEffect } from "react";
import getImages from "../App/ImagesApi";
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

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    getImages(query, page)
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [query, page]);

  const loadMoreImages = async () => {
    try {
      const response = await getImages(query, page + 1);
      if (!response || response.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...response]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error loading images:", error.message);
    }
  };

  const handleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setLoading(true);
    setImages([]);
    setError(null);
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
        <ErrorMessage message={error} />
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
