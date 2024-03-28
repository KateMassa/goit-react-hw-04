import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ hasMore }) => {
  return (
    <div className={css.loadMoreWrapper}>
      <button onClick={hasMore} className={css.loadMoreButton} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
