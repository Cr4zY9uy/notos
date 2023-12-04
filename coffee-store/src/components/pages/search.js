import './category_detail.css';
import ProductList from "../layouts/product_list";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { search_product } from '../../services/product_service';
function Search() {
    window.scrollTo(0, 0);
    const { pro } = useParams();
    const [product, setProduct] = useState([]);
    const loadProduct = async () => {
        const rs = await search_product(pro);
        setProduct(rs);
    }
    useEffect(() => {
        loadProduct();
    }, [pro])
    return (
        <>
            <div className='banner_category'>
                <h1>{pro}</h1>
            </div>
            <div className="products container product-list ">
                <div className='row'>
                    {
                        product.map((item, index) => {
                            return <ProductList productList={item} key={index} />
                        })
                    }
                </div>
            </div>
            <ScrollToTop smooth color="#000" />

        </>
    );
}
export default Search;