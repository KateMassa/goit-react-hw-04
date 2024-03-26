const LoadMoreBtn = ({ onClick, hasMore }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {hasMore && (
        <button onClick={onClick} style={{ padding: "10px 20px" }}>
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
