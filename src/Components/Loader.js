import React, { useEffect, useState } from 'react';

function Loader({ loaderPercentage }) {
  const [newTime, setNewTime] = useState(0);

  useEffect(() => {
    const myTime = setInterval(loading, 150); // Decreased the interval to 100ms

    return () => {
      clearInterval(myTime);
    };
  }, []);

  useEffect(() => {
    // Update newTime based on the loaderPercentage prop
    if (loaderPercentage >= 0 && loaderPercentage <= 100) {
      setNewTime(loaderPercentage);
    }
  }, [loaderPercentage]);

  function loading() {
    setNewTime((prevTime) => {
      let updatedTime = prevTime + 2; // Increased the update value
      if (updatedTime > 100) {
        updatedTime = 0;
      }
      return updatedTime;
    });
  }

  return (
    <div>
      <div className="loader-center" id="loading">
        <div className="loader-list">
          <div className="one loader-top"></div>
          <div className="two loader-top"></div>
          <div className="three loader-top"></div>
          <div className="four loader-top"></div>
          <div className="loader" id="loader">
            {newTime}%
          </div>
          <div className="one loader-bottom"></div>
          <div className="two loader-bottom"></div>
          <div className="three loader-bottom"></div>
          <div className="four loader-bottom"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
