import { getBook } from "@apis/api";
import { detailParam } from "@apis/apiParam";
import { bookDetail } from "@apis/apiResponse";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const param: detailParam = { bookId: 1, };
  const [detailData, setDetailData] = useState<bookDetail>({});
  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getBook(param);
          setDetailData(data);
        } catch (error) {}
      };

      fetchData();
    }, []);

  return (
    <div>
      
    </div>
  )
};
export default DetailPage;
