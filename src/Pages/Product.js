import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_product,addToWishlist,removeFromWishlist,wishlist} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId));

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  return (
    <div>
      <Breadcrum product = {product}/>
      <ProductDisplay 
        product = {product}
        isWishlisted={isWishlisted} 
        addToWishlist={addToWishlist} 
        removeFromWishlist={removeFromWishlist} 
      />
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
