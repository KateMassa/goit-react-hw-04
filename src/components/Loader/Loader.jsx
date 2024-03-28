import { InfinitySpin } from "react-loader-spinner";

const Loader = ({ color = "#4fa94d", width = 200 }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <InfinitySpin
        visible={true}
        width={width}
        color={color}
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
