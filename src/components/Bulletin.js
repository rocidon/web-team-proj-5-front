import { useNavigate } from "react-router-dom";
import "../css/Bulletin.css";

function Bulletin() {
    const navigate = useNavigate();
    //해당게시글 클릭시 detail 페이지로 이동
    const goToDetail = () => {
        navigate("/detail");
    };
    return (<div className="bulletin" onClick={goToDetail}>
        <h1>title</h1>
        <div style={{ color: "gray", fontSize: "10px" }}>작성자 / 작성시간</div>
        <div>글내용</div>
        <div style={{ fontSize: "14px" }}>Like🤍</div>
    </div>)
}
export default Bulletin;