'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import './cardcategory.css';

const CardCategory = ({
  category,
  id,
  image,
  name,
  level_2,
  level_3,
  showTags,
  setShowTags,
}) => {
  const router = useRouter();
  const [ctgFlag, setCtgFlag] = useState('');
  const handleClick = () => {
    if (showTags !== name) {
      setShowTags(name);
    } else {
      setShowTags('');
    }
  };
  const renderLevel3 = (level2slug, level3) => {
    return (
      <ul>
        {level3.map((sublevel) => (
          <li key={sublevel.id}>
            <div
              onClick={() =>
                router.push(`/${category.slug}/${level2slug}/${sublevel.slug}`)
              }
            >
              {sublevel.name}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='card_category_box'>
      <div
        className={`card_category_image ${showTags === name ? 'active' : ' '}`}
      >
        <img src={image} />
        <div className='card_category_name' onClick={handleClick}>
          <span>{name}</span>
        </div>
      </div>
      {/* Level 2 and Level 3 Subcategories */}
      {showTags === name && level_2 && level_2.length > 0 && (
        <div className='ccd_wrapper'>
          <div className='card_category_dropdown'>
            <ul>
              {level_2.map((sublevel) => (
                <li
                  key={sublevel.id}
                  className={`level_2 ${sublevel.level_3 ? 'has_level_3' : ''}`}
                  onClick={
                    sublevel.level_3
                      ? null
                      : () => router.push(`/${category.slug}/${sublevel.slug}`)
                  }
                >
                  <span>{sublevel.name}</span>
                  {sublevel.level_3 &&
                    sublevel.level_3.length > 0 &&
                    renderLevel3(sublevel.slug, sublevel.level_3)}
                </li>
              ))}
            </ul>
          </div>
          <div className='see_all_btn' onClick={() => router.push(`/${category.slug}`)}>See All Articles &gt;&gt;&gt;</div>
        </div>
      )}
    </div>
  );
};
export default CardCategory;
