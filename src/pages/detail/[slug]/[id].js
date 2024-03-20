// pages/article/[slug].js
'use client';
import AdSense from '@/components/AdSense/AdSense';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import '../../../styles/main.css';

const ArticleDetail = () => {
  const router = useRouter();
  const {slug, id} = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_HOST}/article/details`;
          console.log(apiUrl);
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({slug}),
          });

          const result = await response.json();
          
          if(result.code === 404) return router.push('/404');
          setArticle(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Run the effect whenever slug changes

  if (loading) {
    // Render loading state or fallback content when article is not available
    return <p>Loading...</p>;
  }

  if (!article) {
    // Handle the case when the article is not found
    return <p>Article not found!</p>;
  }

  // /// Extract the image path from a specific section within the content
  // const imageSection = Object.values(article.content).find(
  //   (section) => section.type === 'image'
  // );

  // // Construct the full image URL
  // const fullImageUrl = `${process.env.NEXT_PUBLIC_API_HOST.replace('api', '')}${imageSection.image}`;

  const imageSection = Object.values(article.content).find(
    (section) => section.type === 'image'
  );

  // Construct the full image URL if imageSection exists and has a valid image property
  const fullImageUrl =
    imageSection && imageSection.image
      ? `${process.env.NEXT_PUBLIC_API_HOST.replace('api/', '')}/${
          imageSection.image
        }`
      : null;

  return (
    <>
    <section className='article_detail_section'>
      <div className='container'>
        <h1>{article.title}</h1>

        {/* Render image section */}
        {imageSection && <img src={fullImageUrl} alt={`Image`} />}

        {/* Render text sections */}
        {article.content &&
          Object.values(article.content)
            .filter((section) => section.type === 'text')
            .map((section, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{__html: section.text}}
              />
            ))}
      </div>
    </section>
    <AdSense />
    </>
  );
};

export default ArticleDetail;
