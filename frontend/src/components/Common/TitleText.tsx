import { useEffect, useState } from 'react';
const TitleText = ({ title, subTitle }) => {
  const [titleClass, setTitleClass] = useState('h-48 flex justify-center m-0');
  useEffect(() => {
    let backgroundColor = '';
    if (title.includes('부서')) {
      backgroundColor = 'bg-gradient-team';
    }
    if (title.includes('구매')) {
      backgroundColor = 'bg-gradient-purchase';
    }
    if (title.includes('리뷰')) {
      backgroundColor = 'bg-gradient-review';
    }
    if (title.includes('찾고')) {
      backgroundColor = 'bg-gradient-find';
    }
    if (title.includes('공유')) {
      backgroundColor = 'bg-gradient-share';
    }
    if (title.includes('베스트')) {
      backgroundColor = 'bg-gradient-best';
    }
    if (title.includes('카테고리')) {
      backgroundColor = 'bg-gradient-category';
    }
    setTitleClass(`h-48 flex justify-center ${backgroundColor} m-0`);
  }, [title]);
  return (
    <div className={titleClass}>
      <div className="flex items-center font-B w-full max-w-[75rem]">
        <div className="text-4xl leading-[2.875rem] tracking-[-0.6px] mr-3">
          {title}
        </div>
        <div className="text-xl leading-7 tracking-[-0.6px] text-[#343A40]">
          총 {subTitle} 권
        </div>
      </div>
    </div>
  );
};
export default TitleText;
