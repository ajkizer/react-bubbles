import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      });
  }, [updateStatus]);

  const updateHandler = () => {
    setUpdateStatus(!updateStatus);
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        update={updateHandler}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
