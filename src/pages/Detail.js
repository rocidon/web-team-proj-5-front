import Bulletin from "../components/Bulletin";
import Comment from "../components/Comment";
import { Button } from "react-bootstrap";
import "../css/Detail.css";
import { useState } from "react";

function Detail() {
    let [comment, setComment] = useState('');
    return (<div>
        <Bulletin />
        <div className="inputComment">
            <h4>Add Comment</h4>
            <textarea placeholder="댓글입력하는곳"></textarea>
            <br />
            <Button variant="outline-primary">등록</Button>{' '}
            <br />
            <Button variant="outline-danger">삭제</Button>{' '}
            <Button variant="outline-secondary">수정</Button>{' '}
        </div>
        <Comment />
    </div>)
}
export default Detail;