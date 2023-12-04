import './loading.css';
import { Modal } from 'antd';
function Loading(props) {
    const isModalOpen = props.status;
    return (
        <Modal open={isModalOpen} footer={null} closable={false} width={250} bodyStyle={{ height: 200 }} centered={true} className='loading'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} id="loading">
                <img src='/images/loading.gif' alt="loading" width={200} height={200} />
            </div>
        </Modal>
    );
}

export default Loading;