import { Pagination } from 'antd';
import './pagination.css';

function PaginationProduct() {
    return (
        <div className='pagination'>
            <Pagination defaultCurrent={1} total={50} colorBgContainer/>
        </div>
    );
}

export default PaginationProduct;