const PurchasedBookCard = ({
  img,
  title,
  writer,
  categories,
}: {
  img: string;
  title: string;
  writer: string;
  categories: string;
}) => {
  return (
    <div>
      <img src={img}></img>
      <div>{title}</div>
      <div>{writer}</div>
      <div>{categories}</div>
    </div>
  );
};

export default PurchasedBookCard;
