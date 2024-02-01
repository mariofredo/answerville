// // pages/results.js
// import { useRouter } from 'next/router';

// const ResultsPage = () => {
//   const router = useRouter();
//   const { searchTerm } = router.query;

//   return (
//     <section className='result_section'>
//     <div className='container'>
//       <h1>Results Page</h1>
//       <p>Displaying results for: {searchTerm}</p>
//       {/* Add your logic to fetch and display search results here */}
//     </div>
//     </section>
//   );
// };

// export default ResultsPage;

'use client'
import ArticleList from '@/components/ArticleList/ArticleList';
import { useRouter } from 'next/router';  // Correct import statement
import { useEffect, useState } from 'react';

const ListPage = () => {
  const router = useRouter();
  const { search } = router.query;
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
    
  }, [search]);  // Run the effect whenever article changes

//   if (!article) {
//     // Render loading state or fallback content when article is not available
//     return <p>Loading...</p>;
//   }

  return (
    <section className='article_section'>
      {data.length > 0 ? (
      <div className='article_list'>
        {data.map((article) => (
          <ArticleList key={article.slug} slug={article.slug} thumbnail={article.thumbnail} title={article.title} created_at={article.created_at} summary={article.summary}  />
        ))}
      </div>
      ) : (
        <div className="article_list_empty">
          <h3>More Article will be coming!</h3>
        </div>
      )}
    </section>
  );
};

export default ListPage;
