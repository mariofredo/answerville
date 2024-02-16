'use client'
import { useRouter } from 'next/router'
import './ArticleList.css'

const ArticleList = ({ title, created_at, thumbnail, summary, article}) => {
    const router = useRouter();
    return (
        <div className="article_list_box" onClick={() => router.push(`/detail/${article.slug}/${article.id}`)}>
            <div className='article_list_title'>{title}</div>
            <div className='article_list_date'>{created_at}</div>
            <div className='article_list_image'><img src={thumbnail} /></div>
            <div className='article_list_summary'>{summary}</div>
            {/* <div className='like_button'>1200 likes</div> */}
        </div>
    )
}
export default ArticleList;