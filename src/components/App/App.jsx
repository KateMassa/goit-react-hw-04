import { useState, useEffect } from "react";
import getImages from "../../imagesAPI";
import SearchBar from "../App/SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [hasMore, setHasMore] = useState(0);

  async function searchImages(inputValue) {
    setQuery(`${Date.now()}/${inputValue}`);
    setImages([]);
    setPage(1);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);
        const response = await getImages(query, page);
        const data = response.data;
        if (!data.results.length) {
          toast.error(
            "Oops, something went wrong. Give it another shot by refreshing the page.",
            {
              position: "top-right",
            }
          );
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
        setHasMore(page <= data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
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
      console.error("Error loading more images:", error);
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
    <div className={css.container}>
      <Toaster />
      <SearchBar onSearch={searchImages} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {selectedImage && (
            <ImageModal
              isOpen={selectedImage.isModalOpen}
              bigImage={selectedImage.bigImage}
              imageDescription={selectedImage.imageDescription}
              onClose={closeModal}
            />
          )}
          {images.length > 0 && !loading && hasMore > page && (
            <LoadMoreBtn onLoadMore={loadMoreImages} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
