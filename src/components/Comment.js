import "../css/Comment.css"

function Comment() {
    return (<div className="comment">
        <h4>작성자</h4>
        <div style={{ color: "gray", fontSize: "10px" }}>작성시간</div>
        <div>댓글내용</div>
        <div style={{ fontSize: "14px" }}> Like🤍 </div>
        <div style={{ color: "gray", fontSize: "14px" }}> + Reply</div>
    </div>)
}
export default Comment;