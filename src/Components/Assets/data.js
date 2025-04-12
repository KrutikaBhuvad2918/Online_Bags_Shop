import p1_img from './Clutches/picture_1.jpg'
import p2_img from './Clutches/picture_2.jpg'
import p3_img from './Clutches/picture_3.jpg'
import p4_img from './Clutches/picture_4.jpg'

import p1_product_i1 from '../Assets/Clutches/pic5_product_i1.jpg'
import p1_product_i2 from '../Assets/Clutches/pic5_product_i2.jpg'
import p1_product_i3 from '../Assets/Clutches/pic5_product_i3.jpg'

import p2_product_i1 from '../Assets/Clutches/pic2_product_i1.jpg'
import p2_product_i2 from '../Assets/Clutches/pic2_product_i2.jpg'
import p2_product_i3 from '../Assets/Clutches/pic2_product_i3.jpg'

import p3_product_i1 from '../Assets/Clutches/pic3_product_i1.jpg'
import p3_product_i2 from '../Assets/Clutches/pic3_product_i2.jpg'
import p3_product_i3 from '../Assets/Clutches/pic3_product_i3.jpg'

import p4_product_i1 from '../Assets/Clutches/pic4_product_i1.png'
import p4_product_i2 from '../Assets/Clutches/pic4_product_i2.png'
import p4_product_i3 from '../Assets/Clutches/pic4_product_i3.jpg'

let data_product = [
  {
    id: 1,
    name: "Midnight Elegance Clutch",
    category: "clutch",
    image: p1_img,
    images: [p1_img, p1_product_i1, p1_product_i2, p1_product_i3],
    desc: " A sleek and stylish dark blue clutch designed for evening glamour. The compact yet spacious interior keeps your essentials organized. Perfect for parties, weddings, and formal occasions.",
    new_price: 500.0,
    old_price: 800.0,
  },
  {
    id: 2,
    name: "Emerald Luxe Clutch",
    category: "clutch",
    image: p2_img,
    images: [p2_img, p2_product_i1, p2_product_i2, p2_product_i3],
    desc : "A luxurious green clutch that adds a bold statement to any outfit. Crafted with a smooth finish and a secure closure for convenience. Ideal for elegant gatherings and special events.",
    new_price: 385.0,
    old_price: 420.5,
  },
  {
    id: 3,
    name: "Pink Glam Chain Clutch",
    category: "clutch",
    image: p3_img,
    images: [p3_img, p3_product_i1, p3_product_i2, p3_product_i3],
    desc: " A chic pink clutch featuring a gold chain strap for added sophistication. Lightweight and fashionable, making it a must-have accessory. Suited for casual outings and fancy dinners alike.",
    new_price: 520.0,
    old_price: 580.5,
  },
  {
    id: 4,
    name: "Silver Chic Clutch",
    category: "clutch",
    image: p4_img,
    images: [p4_img, p4_product_i1, p4_product_i2, p4_product_i3],
    desc: " A shimmering silver clutch that radiates elegance and charm. Designed with a secure closure and a stylish look for any occasion. The perfect addition to your evening wear collection.",
    new_price: 100.0,
    old_price: 150.0,
  },
];

export default data_product;
