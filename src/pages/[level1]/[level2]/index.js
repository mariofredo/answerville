'use client';
import ArticleList from '@/components/ArticleList/ArticleList';
import MasonryLayout from '@/components/MasonryLayout/MasonryLayout';
import AdSense from '@/components/AdSense/AdSense';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';

const ListPage = () => {
  const router = useRouter();
  const {level1, level2} = router.query;
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  let isLoading = useRef();

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/category`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setFetchedData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataCategory(); // Panggil fungsi fetchData pada saat komponen di-mount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (level2) {
          setLoading(true);
          isLoading.current = true
          const found1 = fetchedData.find((key) => key.slug === level1);
          const found2 = found1.level_2.find((key) => key.slug === level2);
          const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/article?category=${found2.id}&page=${page}&limit=5`;
          const response = await fetch(apiUrl);
          const result = await response.json();
          //setData(result.data);
          setTimeout(() => {
            setData(prevData => (page === 1 ? result.data : [...prevData, ...result.data]));
            isLoading.current = false;
            setLoading(false);
            if(!isFirst){
              setIsFirst(true);
            }
        }, 1500);

          if (result.data.length === 0) {
            window.removeEventListener('scroll', handleScroll);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      } finally {
      }
    };
    if (fetchedData.length > 0) {
      fetchData();
    }
  }, [fetchedData, page]); // Run the effect whenever article changes

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if(!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      // Increment the page number to fetch the next set of data
      if(!isLoading.current){
        console.log('called')
        setPage(prevPage => prevPage + 1);}
    }
  };

  // useEffect(() => {
  // }, [loading])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <>
    <section className='article_section'>
      {/* Display loading message only if there's more data to load */}
      {data.length > 0 ? (
        <div className='article_list'>
          <MasonryLayout>
            {data.map((article) => (
              <ArticleList
                key={article.id}
                article={article}
                id={article.id}
                slug={article.slug}
                thumbnail={article.thumbnail}
                title={article.title}
                created_at={formatDate(article.created_at)}
                summary={article.summary}
              />
            ))}
          </MasonryLayout>
        </div>
      ) : (
        <>
          {(isFirst && data.length == 0) && (
            <div className='article_list_empty'>
              <h3>More Article will be coming!</h3>
            </div>
          )}
        </>
      )}

      {loading && (
        <div className='article_list_empty loading'>
          <h3>Loading more content...</h3>
        </div>
      )}
    </section>
    <AdSense />
    </>
  );
};
const formatDate = (dateString) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}'`;
};
export default ListPage;
