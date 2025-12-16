import { Spinner } from "react-bootstrap";

function Loading() {
    return (
        <div className="w-100 d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">載入中...</span>
            </Spinner>
        </div>
    )
}

export default Loading;