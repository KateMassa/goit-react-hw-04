// import css from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  const handleImageClick = () => {
    openModal({
      isModalOpen: true,
      bigImg: image.url,
      imgAltDescription: image.alt,
      imgLikes: image.likes,
    });
  };

  return (
    <div>
      <img src={image.url} alt={image.alt} onClick={handleImageClick} />
    </div>
  );
};

export default ImageCard;
