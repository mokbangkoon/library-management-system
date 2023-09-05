const ShareAndBookCard = ({
  img,
  title,
  writer,
}: {
  img: string;
  title: string;
  writer: string;
}) => {
  return (
    <div>
      <img src={img}></img>
      <div>{title}</div>
      <div>{writer}</div>
    </div>
  );
};
export default ShareAndBookCard;
