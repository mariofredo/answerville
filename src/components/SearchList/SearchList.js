'use client'
import { useRouter } from 'next/router'
import './SearchList.css'

const SearchList = ({ title, created_at, thumbnail, summary, article}) => {
    const router = useRouter();
    return (
        <div className="search_list_box" onClick={() => router.push(`/detail/${article.slug}/${article.id}`)}>
            <div className='search_list_image'><img src={thumbnail} /></div>
            <div className='search_list_content'>
                <div className='search_list_date'>{created_at}</div>
                <div className='search_list_title'>{title}</div>
                <div className='search_list_summary'>{summary}</div>
            </div>
        </div>
    )
}
export default SearchList;