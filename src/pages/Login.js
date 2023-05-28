import { Modal, Button } from "react-bootstrap";
function Login() {
    return (<div>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">로그인</Button>
                    <Button variant="primary">회원가입</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    </div>)
}
export default Login;