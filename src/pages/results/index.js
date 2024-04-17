'use client';
import {useRouter} from 'next/router'; // Correct import statement
import {GoogleTagManager} from '@next/third-parties/google';
import {useEffect, useState} from 'react';
import AdSense from '@/components/AdSense/AdSense';
import SearchList from '@/components/SearchList/SearchList';

const ListPage = () => {
  const router = useRouter();
  const {search} = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/article?keyword=${search}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]); // Run the effect whenever article changes

  //   if (!article) {
  //     // Render loading state or fallback content when article is not available
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      <section className='article_section'>
        {data.length > 0 ? (
          <div className='search_list'>
              {data.map((article) => (
                <SearchList
                  key={article.slug}
                  article={article}
                  thumbnail={article.thumbnail}
                  title={article.title}
                  created_at={formatDate(article.created_at)}
                  summary={article.summary}
                />
              ))}
          </div>
        ) : (
          <div className='article_list_empty'>
            <h3>We are sorry that we can’t find what you are looking for.</h3>
          </div>
        )}
      </section>
      <AdSense />
      <GoogleTagManager gtmId='G-JNZC27WEH5' />
    </>
  );
};
const formatDate = (dateString) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}'`;
};

export default ListPage;
