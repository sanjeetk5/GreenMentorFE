import React from "react";
import { Comment } from "react-loader-spinner";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Comment
        visible={true}
        height="180"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#1976d2"
      />
    </div>
  );
};

export default Loading;
