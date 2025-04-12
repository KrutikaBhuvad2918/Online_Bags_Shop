import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product, searchQuery } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('default'); 
  const [sortedProducts, setSortedProducts] = useState([]);

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = all_product.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (props.category === item.category || props.category === "all")
      );
    });

    // Apply sorting based on the selected option
    if (sortOption === "price-low-high") {
      filtered.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === "price-high-low") {
      filtered.sort((a, b) => b.new_price - a.new_price);
    } else if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSortedProducts(filtered); // Update state with sorted products
  }, [all_product, searchQuery, props.category, sortOption]);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length}</span> products
        </p>
        <div className="shopcategory-sort">
          {/* <label htmlFor="sort">Sort by:</label> */}
          <select 
            id="sort" 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by : Default</option>
            <option value="price-low-high">Sort by : Low to High Price</option>
            <option value="price-high-low">Sort by : High to Low Price</option>
            <option value="alphabetical">Sort by : Alphabetical</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
