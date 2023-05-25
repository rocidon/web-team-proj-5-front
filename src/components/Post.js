import styles from "../css/Post.module.css";

function Post({ creator, title, text, likecount, timestamp }) {
  return (
    <div className={styles.postContainer}>
      <h1>{title}</h1>
      <span>작성자:{creator} </span>
      <span>좋아요:{likecount} </span>
      <span>작성 시간:{timestamp} </span>
      <p>{text}</p>
    </div>
  );
}

export default Post;
