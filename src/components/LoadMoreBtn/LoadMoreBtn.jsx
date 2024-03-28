import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div className={css.loadMoreWrapper}>
      <button onClick={onLoadMore} className={css.loadMoreButton} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
