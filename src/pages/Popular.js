import Bulletin from "../components/Bulletin";
import { useState, useEffect } from "react";

function Popular({ setClickedPost }) {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDatas = async () => {
    const dataJson = await (
      await fetch("http://localhost:8080/populars")
    ).json();
    //console.log(dataJson);
    setDatas(dataJson);
    setIsLoading(false);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div>
      {isLoading ? (
        <span>로딩중</span>
      ) : (
        datas.map((data) => {
          return (
            <Bulletin
              key={data.uuid}
              data={data}
              setClickedPost={setClickedPost}
            />
          );
        })
      )}
    </div>
  );
}
export default Popular;
