import React, { useState, useEffect, useCallback } from 'react';
import Projectfile from './projectfile/projectfile';
import Uploadproject from './uploadproject/uploadproject';

export default function Myprojects() {
  const [display, setDisplay] = useState(
    JSON.parse(localStorage.getItem('display')) || false
  );

  useEffect(() => {
    if (!display) {
      localStorage.removeItem('display');
    } else {
      localStorage.setItem('display', JSON.stringify(display));
    }
  }, [display]);

  const handleDisplay = () => {
    setDisplay(!display);
  };
  const handleUpdateDisplay = () => {
    setDisplay(!display);
  };
  return (
    <>
      <article>
        {!display ? (
          <Projectfile handleDisplay={handleDisplay} />
        ) : (
          <Uploadproject display={handleUpdateDisplay} />
        )}
      </article>
    </>
  );
}
