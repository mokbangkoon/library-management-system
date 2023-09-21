const TitleText = ({ title, subTitle }) => {
  return (
    <div className="flex items-center font-B mt-24 mb-24">
      <div className="text-4xl leading-[2.875rem] tracking-[-0.6px] mr-3">
        {title}
      </div>
      <div className="text-xl leading-7 tracking-[-0.6px] text-[#CED4DA]">
        총 {subTitle} 권
      </div>
    </div>
  );
};
export default TitleText;
