import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal = ({ image, onClose, isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className="image-modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <img src={image.url} alt={image.alt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
