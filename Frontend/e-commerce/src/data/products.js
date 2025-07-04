import watch from '../assets/watch.webp';
import watch2 from '../assets/watch2.webp';
import earphone from '../assets/earphones.jpeg';
import monitor from '../assets/monitor.webp';
import monitor2 from '../assets/monitor2.webp';
import speaker from '../assets/speaker.webp';
import trimmer from '../assets/trimmer.webp';
import hills from '../assets/hills.webp';
import shirt1 from '../assets/shirt1.webp';
import shirt2 from '../assets/shirt2.webp';
import shirt3 from '../assets/shirt3.webp';
import tshirt1 from '../assets/tshirt1.webp';
import slipper1 from '../assets/slipper1.webp';
import tshirt2 from '../assets/tshirt2.webp';
import motophone from '../assets/motophone.webp';
import motophone2 from '../assets/motophone2.webp';
import oppophone from '../assets/oppophone.webp';
import laptopacer from '../assets/laptopacer.webp';
import laptopasus from '../assets/laptopasus.webp';
import laptopsamsung from '../assets/laptopsamsung.webp';
import laptoplenovo from '../assets/laptoplenovo.webp';

const products = [
  { id: 1, title: "Smart Watch", price: 1550, image: watch, category: "Electronics", description: "Stylish and affordable smartwatch with fitness tracking and notifications." },
  { id: 2, title: "Wireless Earbuds", price: 3000, image: earphone, category: "Electronics", description: "High-quality wireless earbuds with immersive sound and long battery life." },
  { id: 3, title: "24-inch Monitor", price: 15000, image: monitor, category: "Electronics", description: "Full HD monitor perfect for work and entertainment, with vibrant colors." },
  { id: 4, title: "Smart Watch Pro", price: 1400, image: watch2, category: "Electronics", description: "Advanced smartwatch with heart rate monitoring and sleek design." },
  { id: 5, title: "Portable Speaker", price: 2000, image: speaker, category: "Electronics", description: "Portable Bluetooth speaker with powerful bass and crystal-clear sound." },
  { id: 6, title: "Beard Trimmer", price: 1600, image: trimmer, category: "Electronics", description: "Easy-to-use trimmer for a smooth and precise grooming experience." },
  { id: 7, title: "Asus Gaming Monitor", price: 25000, image: monitor2, category: "Electronics", description: "High-performance Asus monitor with ultra-clear display and fast refresh rate." },
  { id: 8, title: "Cotton Shirt", price: 2500, image: shirt1, category: "Fashion", description: "Comfortable and stylish cotton shirt perfect for casual or formal occasions." },
  { id: 9, title: "Formal Shirt", price: 2100, image: shirt2, category: "Fashion", description: "Elegant shirt with premium fabric and modern fit." },
  { id: 10, title: "Classic Shirt", price: 1800, image: shirt3, category: "Fashion", description: "Classic design shirt that pairs well with jeans or trousers." },
  { id: 11, title: "Fashion Heels", price: 1600, image: hills, category: "Fashion", description: "Trendy and comfortable heels for stylish everyday wear." },
  { id: 12, title: "Casual Slippers", price: 500, image: slipper1, category: "Fashion", description: "Lightweight and comfy slippers, perfect for indoor and casual use." },
  { id: 13, title: "Graphic T-Shirt", price: 1500, image: tshirt1, category: "Fashion", description: "Soft cotton T-shirt with a cool graphic design." },
  { id: 14, title: "Basic T-Shirt", price: 1200, image: tshirt2, category: "Fashion", description: "Basic T-shirt with a classic fit, ideal for everyday use." },
  { id: 15, title: "Acer Aspire Laptop", price: 80000, image: laptopacer, category: "Electronics", description: "Powerful Acer laptop for multitasking and gaming." },
  { id: 16, title: "Asus Vivobook", price: 75000, image: laptopasus, category: "Electronics", description: "Slim and lightweight Asus laptop with strong performance." },
  { id: 17, title: "Samsung Galaxy Book", price: 90000, image: laptopsamsung, category: "Electronics", description: "Premium Samsung laptop with stunning display and fast storage." },
  { id: 18, title: "Lenovo Yoga i7", price: 85000, image: laptoplenovo, category: "Electronics", description: "Reliable Lenovo Yoga i7 laptop for work, study, and entertainment." },
  { id: 19, title: "Motorola Edge", price: 25000, image: motophone, category: "Electronics", description: "Affordable Motorola smartphone with great camera and battery life." },
  { id: 20, title: "Motorola Edge Plus", price: 28000, image: motophone2, category: "Electronics", description: "Feature-rich Motorola phone with sleek design and fast processor." },
  { id: 21, title: "Oppo Reno", price: 30000, image: oppophone, category: "Electronics", description: "Oppo smartphone with high-resolution camera and stylish design." },
];

export default products;
