import { NavLink } from 'react-router-dom';
import './navbar.css';
import { list_category } from '../../services/category_service';
import { useEffect, useState } from 'react';
function Navbars() {
    const [category, setCagories] = useState([]);
    const loadCategory = async () => {
        try {
            const rs = await list_category();
            setCagories(rs)
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        loadCategory();
    }, [])
    return (
        <div className='parent_nav'>
            <nav className="nav-bar container d-flex ps-0">
                <div className="menu1">
                    <NavLink to={'/'} className='dropmenu'>Home</NavLink>
                </div>
                {
                    category.map((item, index) => {
                        return <NavLink key={index} to={`/category/${item}`} className={'menu1_item'}>{item}</NavLink>
                    })
                }
                <NavLink to={"/products"} className={'menu1_item'}>Shop</NavLink>
            </nav>
        </div>
    );
}

export default Navbars;