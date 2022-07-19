import React, { useState } from "react";

const NodeItem = () => (
  <div>Node item placeholder</div>
);

const NoData = () => (
  <div>No articles found.</div>
);

const NodeList = () => {
  const [content, setContent] = useState(false);

  return (
    <>
      <h2>Site content</h2>
      {content ? (<NodeItem />) : (<NoData />)}
    </>
  );
};

export default NodeList;
