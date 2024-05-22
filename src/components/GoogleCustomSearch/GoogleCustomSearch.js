import { useEffect } from 'react';

const GoogleCustomSearch = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=213fc3f28e4ce46bf';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div className="gcse-search"></div>;
};

export default GoogleCustomSearch;