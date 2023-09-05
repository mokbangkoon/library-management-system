import moment from 'moment';
const ReviewBookCard = ({
  img,
  title,
  writer,
  content,
  name,
  rating,
  createDateTime,
}: {
  img: string;
  title: string;
  writer: string;
  content: string;
  name: string;
  rating: number;
  createDateTime: Date;
}) => {
  return (
    <div>
      <img src={img}></img>
      <div>{title}</div>
      <div>{writer}</div>
      <div>{content}</div>
      <div>{name}</div>
      <div>{rating}</div>
      <div>{moment(createDateTime).format('YYYY.MM.DD')}</div>
    </div>
  );
};
export default ReviewBookCard;
