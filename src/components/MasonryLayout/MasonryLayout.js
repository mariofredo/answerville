// MasonryLayout.js
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

const MasonryLayout = ({ children }) => {
  const [columns, setColumns] = useState(3);

  const handleResize = () => {
    if (window.innerWidth >= 1100) {
      setColumns(3);
    } else if (window.innerWidth >= 700) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Masonry
      breakpointCols={{ default: columns, 1100: 3, 700: 2, 500: 1 }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
