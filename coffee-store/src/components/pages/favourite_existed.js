import Modal from 'antd/es/modal/Modal';
import './favourite_existed.css';
function FavouriteExisted(props) {
    const isModalOpen = props.status;
    return (
        <Modal open={isModalOpen} footer={null} closable={false} width={620} centered={true} className='loading'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p className='words'>This product has already been in your wishlist</p>
            </div>
        </Modal>
    );
}
export default FavouriteExisted;