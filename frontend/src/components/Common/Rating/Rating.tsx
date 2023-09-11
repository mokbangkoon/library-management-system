import { FaStar } from 'react-icons/fa';
export default function Rating() {
  return (
    <div>
      {[...Array(5)].map(star => { return <FaStar size={50} /> })}
    </div>
  )
}
