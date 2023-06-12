import Posts from "../components/Posts";
import { useState, useEffect } from "react";

function Popular({ setClickedPost }) {
  // /populars에서 fetch한 json 담아두는 Array
  const [datas, setDatas] = useState([]);
  // fetch가 완료 되었는지를 나타내는 boolean
  const [isLoading, setIsLoading] = useState(true);

  const getDatas = async () => {
    const dataJson = await (
      await fetch("http://localhost:8080/posts/all/populars")
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
            <Posts
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
