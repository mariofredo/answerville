'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const isHomePage = router.pathname === '/';

    useEffect(() => {
      // Reset the search term when the route changes
      setSearchTerm('');
  }, [router.pathname]);

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
        {isHomePage ? (
          <header style={{display:'none'}}></header>
        ) : (
          <header>
            <div className='container'>
              <Link href="/" className='home_btn'>Home</Link>
              <div className="search_box">
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} onKeyPress={handleKeyPress}></input>
                  <button className="search_btn" onClick={handleSearch} disabled={!searchTerm}>Seach</button>
              </div>
            </div>
          </header>
        )}
      </>
    )
}
export default Header;