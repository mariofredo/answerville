'use client'
import ArticleList from '@/components/ArticleList/ArticleList';
import { useRouter } from 'next/router';  // Correct import statement
import { useEffect, useState } from 'react';

const ListPage = () => {
  const router = useRouter();
  const { level1, level2, article } = router.query;
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          const found = fetchedData.find(key => key.name === level1)
          console.log(found);
          const id = found.level_2.find(key => key.name === level2)
          const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/article?category=${id.id}`;
          const response = await fetch(apiUrl);
          const result = await response.json();
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    if(fetchedData.length>0){
      fetchData();
    }
  }, [fetchedData]);  // Run the effect whenever article changes

//   if (!article) {
//     // Render loading state or fallback content when article is not available
//     return <p>Loading...</p>;
//   }

  return (
    <section className='article_section'>
      <div className='article_list'>
        {data.map((article) => (
          <ArticleList key={article.slug} slug={article.slug} thumbnail={article.thumbnail} title={article.title} created_at={article.created_at} summary={article.summary}  />
        ))}
      </div>
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.slug}>{item.title}</li>
          ))}
        </ul>
      )} */}
    </section>
  );
};

export default ListPage;
