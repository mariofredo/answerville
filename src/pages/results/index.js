'use client';
import {useRouter} from 'next/router'; // Correct import statement
import {GoogleTagManager} from '@next/third-parties/google';
import {useEffect, useState} from 'react';
import AdSense from '@/components/AdSense/AdSense';
import SearchList from '@/components/SearchList/SearchList';

// change the value of GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID with your own
const GOOGLE_API_KEY = 'AIzaSyAM3XtZPe5yTcYgGfFFKM4UFUocEkmecSM';
const GOOGLE_SEARCH_ENGINE_ID = '213fc3f28e4ce46bf';

const ListPage = () => {
  const router = useRouter();
  const {search} = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGoogleData, setIsGoogleData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/article?keyword=${search}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if(result.data.length > 0) {
          setData(result.data);
          setIsGoogleData(false);
        } else {
          const googleResults = await fetchGoogleResults(search);
          setData(googleResults);
          setIsGoogleData(true);
        }

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

  const fetchGoogleResults = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&safe=active`
      );
      const result = await response.json();
      return result.items.map((item) => ({
        slug: item.cacheId,
        thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || '',
        title: item.title,
        created_at: item.snippet, // Adjust this if necessary
        summary: item.snippet,
        link: item.link,
      })) || [];
    } catch (error) {
      console.error('Error fetching data from Google:', error);
      return [];
    }
  };

  return (
    <>
      <section className='article_section'>
        {data.length > 0 ? (
          isGoogleData ? (
            <div className='search_list'>
              {data.map((article) => (
                <div key={article.slug}  className="search_list_box">
                  <div className='search_list_image'><a href={article.link} target='_blank' rel='noopener noreferrer'><img src={article.thumbnail} /></a></div>
                  <div className='search_list_content'>
                      <div className='search_list_title'><a style={{color:'#000'}} href={article.link} target='_blank' rel='noopener noreferrer'>{article.title}</a></div>
                      <div className='search_list_summary'>{article.summary}</div>
                      <div className='pbgoogle'></div>
                  </div>
              </div>
              ))}
            </div>
          ) : (
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
          )
        ) : (
          <div className='search_list_empty'>
            <h3>Please wait... <br />More Article will coming</h3>
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
