'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const isHomePage = router.pathname === '/';

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const handleSearch = () => {
        // Navigate to the results page with the search term as a query parameter
        router.push(`/results?search=${searchTerm}`);
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
    return (
        <header>
            {isHomePage ? (
                <Link href="/" style={{display:'none'}}>Home</Link>
            ) : (
                <Link href="/" className='home_btn'>Home</Link>
            )}
            <div className="search_box">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}></input>
                <button className="search_btn"  onClick={handleSearch}>Seach</button>
            </div>
        </header>
    )
}
export default Header;