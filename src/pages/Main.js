import Bulletin from "../components/Bulletin";

function Main({ datas, isLoading, setClickedPost }) {
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
export default Main;
