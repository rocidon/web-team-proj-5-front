import { useEffect, useState } from "react";
import Post from "./components/Post";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const getDatas = async () => {
    const dataJson = await (await fetch("http://localhost:8080/posts")).json();
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
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          {datas.map((data) => (
            <Post
              key={data.no}
              creator={data.creator}
              title={data.title}
              text={data.text}
              likecount={data.likecount}
              timestamp={data.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
