import './category_detail.css';
import ProductList from "../layouts/product_list";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detail_category } from '../../services/category_service';
import ScrollToTop from 'react-scroll-to-top';
function CategoryDetail() {
    window.scrollTo(0, 0);
    const { name } = useParams();
    const [categoryD, setCategoryD] = useState([]);
    const loadCategoryD = async () => {
        const rs = await detail_category(name);
        setCategoryD(rs);
    }
    useEffect(() => {
        loadCategoryD();
    }, [name])
    return (
        <>
            <div className='banner_category'>
                <h1>{name}</h1>
            </div>
            <div className="products container product-list ">
                <div className='row'>
                    {
                        categoryD.map((item, index) => {
                            return <ProductList productList={item} key={index} />
                        })
                    }
                </div>
            </div>
            <ScrollToTop smooth color="#000" />

        </>
    );
}
export default CategoryDetail;