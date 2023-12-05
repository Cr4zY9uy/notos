import './products.css'
import ProductsCate from "../layouts/products_cate";
import { useState, useEffect } from 'react';
import { paginate_product, product_price, product_price_cate } from '../../services/product_service';
import { Pagination } from 'antd';
import ScrollToTop from 'react-scroll-to-top';
import { detail_category, list_category } from '../../services/category_service';
function Products() {
    window.scrollTo(0, 150);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(8);
    const [[startPrice, endPrice], setPrice] = useState([50, 3000]);
    const [category, setCategory] = useState([]);
    const [cateFind, setCateFind] = useState("");
    const loadCategory = async () => {
        try {
            const rs = await list_category();
            setCategory(rs);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const loadProduct = async () => {
        try {
            const rs = await paginate_product(page);
            setTotalProducts(rs._totalProduct);
            setProducts(rs.products);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const loadPriceFilter = async () => {
        try {
            const rs = await product_price(startPrice, endPrice, page);
            setPage(1);
            setTotalProducts(rs._totalProduct);
            setProducts(rs.products);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const loadPriceAndCateFilter = async () => {
        try {
            const rs = await product_price_cate(startPrice, endPrice, cateFind, page);
            setPage(1);
            setTotalProducts(rs._totalProduct);
            setProducts(rs.products);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const loadCateFilter = async () => {
        try {
            const rs = await detail_category(cateFind);
            setPage(1);
            setTotalProducts(rs._totalProduct);
            setProducts(rs);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const handlePrice = (e) => {
        const [newStartPrice, newEndPrice] = e.target.value.split('-').map(Number);
        setPrice([newStartPrice, newEndPrice]);
    }
    const clearAllFilters = () => {
        setPrice([50, 3000]);
        setPage(1);
        setCateFind("");
    };
    const handleCategory = (e) => {
        setCateFind(e.target.dataset.category);
    }
    useEffect(() => {
        loadCategory();
    }, [])
    useEffect(() => {
        const hasCategoryFilter = cateFind !== "";
        const hasPriceFilter = startPrice !== 50 && endPrice !== 3000;
        if (hasCategoryFilter && hasPriceFilter) {
            // Apply both category and price filter
            loadPriceAndCateFilter();
        } else if (hasCategoryFilter) {
            // Apply category filter
            loadCateFilter();
        } else if (hasPriceFilter) {
            // Apply price filter
            loadPriceFilter();
        } else {
            // No filters, load all products
            loadProduct();
        }
        console.log(totalProducts)
    }, [page, cateFind, startPrice, endPrice])
    return (
        <div className='products_filter '>
            <div className="filterCAP">
                <div className='clear'>
                    <span className='clear_all' onClick={clearAllFilters} style={(cateFind || (startPrice && endPrice)) ? { display: "block" } : { display: "none" }}>Clear all</span>
                </div>
                <div className='filterCate'>
                    <h5>Filter by Category</h5>
                    <p className='cate_hidden'>{cateFind}</p>
                    <span className='categories' onClick={() => {
                        setCateFind("");
                    }}>All categories</span>
                    {
                        category.map((item, index) => {
                            return <span className='coffee' key={index} data-category={item} onClick={(e) => { handleCategory(e) }}>{item}</span>

                        })
                    }

                </div>
                <div className='filterPrice'>
                    <h5>Filter by Price</h5>
                    <p className='price_hidden' style={(startPrice === 50 && endPrice === 3000) ? { visibility: "hidden" } : { visibility: "visible" }}>{startPrice}$ - {endPrice}$</p>
                    <span onClick={() => setPrice([100, 500])}>100$ - 500$</span>
                    <span onClick={() => setPrice([500, 1000])}>500$ - 1000$</span>
                    <span onClick={() => setPrice([1000, 2000])}>1000$ - 2000$</span>
                </div>
            </div>
            <div className="products_cate d-flex flex-column">
                <div className='result'><h3>Showing {products && products.length !== undefined ? products.length : "0"} results</h3></div>
                <div className="products_result d-flex row">
                    {
                        products && products.length !== undefined ? (products.map((item, index) => {
                            return <ProductsCate product={item} key={index} />
                        })) : <p>Nothing to show</p>
                    }
                </div>
                {products && products.length !== undefined ? (<Pagination
                    total={totalProducts}
                 pageSize={8}
                    current={page}
                    onChange={(page) => setPage(page)}
                />) : <div></div>}
            </div>
            <ScrollToTop smooth color="#000" />
        </div>
    );
}
export default Products;
