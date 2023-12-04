import './product_grid.css';
function Product_grid() {
    return (
        <section className="container product-grid">
            <div className="item-1">
                <img src='/images/beans1.jpg' alt="a" />
            </div>
            <div className="item-2">
                <img src='/images/grid_1.webp' alt="a" />
            </div>
            <div className="item-3">
                <img src='/images/grid_2.webp' alt="a" />
            </div>
            <div className="item-4">
                <img src='/images/choco1.jpg' alt="a" />
            </div>
        </section>
    );
}
export default Product_grid;