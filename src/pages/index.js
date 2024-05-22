'use client';
import {useEffect, useState} from 'react';
import {GoogleTagManager} from '@next/third-parties/google';
import {useRouter} from 'next/router';
import AdSense from '@/components/AdSense/AdSense';
import CardCategory from '@/components/CardCategory/CardCategory';
import '../styles/main.css';

const Home = () => {
  const router = useRouter();
  const [showTags, setShowTags] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Menggunakan useEffect untuk melakukan fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/category`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setFetchedData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Panggil fungsi fetchData pada saat komponen di-mount
  }, []); // Gunakan array dependencies kosong agar useEffect hanya dijalankan sekali pada saat mount

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Navigate to the results page with the search term as a query parameter
    router.push(`/results?search=${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      handleSearch();
    }
  };
  return (
    <>
      <section className='home_section'>
        <div className='logo_box'>
          <img src='/logo_answerville.png' />
        </div>
        <h3>I Want to know all the answers to...</h3>
        <div className='search_box'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          ></input>
          <button
            className='search_btn'
            onClick={handleSearch}
            disabled={!searchTerm}
          >
            Search
          </button>
        </div>
        <div className='row_flex card_category'>
          {fetchedData.map((category) => (
            <CardCategory
              category={category}
              key={category.id}
              name={category.name}
              image={category.image}
              level_2={category.level_2}
              setShowTags={setShowTags}
              showTags={showTags}
            />
          ))}
        </div>
      </section>

      <AdSense />
      <GoogleTagManager gtmId='G-JNZC27WEH5' />
    </>
  );
};

export default Home;
