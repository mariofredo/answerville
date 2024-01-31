'use client'
import { useRouter } from "next/navigation";
import './cardcategory.css'

const CardCategory = ({ category, id, image, name, level_2, level_3, showTags, setShowTags}) => {
    const router = useRouter();
    const handleClick = () => {
        if(showTags !== name){
            setShowTags(name);
        }
        else{
            setShowTags('');
        }
    }
    const renderLevel3 = (level2name, level3) => {
        return (
            <ul>
                {level3.map((sublevel) => (
                    <li key={sublevel.id}>
                        <div onClick={() => router.push(`/${category.name}/${level2name}/${sublevel.name}`)}>{sublevel.name}</div>
                    </li>
                ))}
            </ul>
        );
    }
    console.log(level_2);
    return (
    <div className="card_category_box">
        <div className="card_category_image"><img src={image} /></div>
        <div className="card_category_name" onClick={handleClick}><span>{name}</span></div>
        {/* Level 2 and Level 3 Subcategories */}
        {showTags === name && level_2 && level_2.length > 0 && (
                <div className="card_category_dropdown">
                    <ul>
                    {level_2.map((sublevel) => (
                        <li key={sublevel.id} className={`level_2 ${sublevel.level_3 ? 'has_level_3' : ''}`} onClick={sublevel.level_3 ? null : () => router.push(`/${category.name}/${sublevel.name}`)}>
                            <span>{sublevel.name}</span>
                            {sublevel.level_3 && sublevel.level_3.length > 0 && renderLevel3(sublevel.name, sublevel.level_3)}
                        </li>
                    ))}
                    </ul>
                </div>
            )}
    </div>
    )
}
export default CardCategory;