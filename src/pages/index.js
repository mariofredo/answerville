"use client"
import CardCategory from "@/components/CardCategory/CardCategory";
import { useEffect, useState } from "react";
import "../styles/main.css"

const Home = () => {
  const [showTags, setShowTags] = useState('');
  const [fetchedData, setFetchedData] = useState([]);

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

  return (
    <>
    <section className="home_section">
      <div className="logo_box"><img src="/logo_answerville.png" /></div>
      <h3>I Want to know all the answers to...</h3>
      <div className="row_flex card_category">
        {fetchedData.map((category) => (
          <CardCategory category={category} key={category.id} name={category.name} image={category.image} level_2={category.level_2} setShowTags={setShowTags} showTags={showTags} />
        ))}
      </div>
    </section>
    </>
  );
}

export default Home;