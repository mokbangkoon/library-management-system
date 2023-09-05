import { useState } from 'react';
import { mainParam } from '../../../apis/apiParam';
import { getPurchasedBooks } from '../../../apis/mainAndListApi';
export default function PurchasedCard(props: any) {
  const param: mainParam = { type: 1 };
  const [mainData, setMainData] = useState(getPurchasedBooks(param));
  return <div></div>;
}
