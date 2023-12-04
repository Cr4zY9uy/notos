import './filterCateAndPrice.css';

function FilterCateAndPrice() {
    return (
        <div className="filterCAP">
            <div className='clear'>
                <span className='clear_all'>Clear all</span>
            </div>
            <div className='filterCate'>
                <h5>Filter by Category</h5>
                <p className='cate_hidden'></p>
                <span className='categories'>All categories</span>
                <span className='beans'>Coffee beans</span>
                <span className='drinks'>Coffee drinks</span>
                <span className='sweets'>Coffee sweets</span>
            </div>
            <div className='filterPrice'>
                <h5>Filter by Price</h5>
                <p className='price_hidden'></p>
                <span>100$ - 200$</span>
                <span>200$ - 350$</span>
                <span>350$ - 500$</span>
            </div>
        </div>
    );
}

export default FilterCateAndPrice;