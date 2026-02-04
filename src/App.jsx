
import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Endpoint MockAPI Siswa
  const API_URL = "https://698337629c3efeb892a4dc5e.mockapi.io/SMK-STORE";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error ambil data:", err));
  }, []);

  // Fitur: Tambah ke Keranjang (Cek Duplikat)
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setIsCartOpen(true);
  };

  // Fitur: Update Qty (+/-)
  const updateQty = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return {...item, qty: Math.max(1, item.qty + amount)};
      }
      return item;
    }));
  };

  // Fitur: Hapus Item
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Header 
        cartCount={cart.reduce((a, c) => a + c.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        closeCart={() => setIsCartOpen(false)} 
        cartItems={cart} 
        updateQty={updateQty} 
        removeItem={removeItem} 
      />

      <main className="container">
        <h1 className="hero-title">🛍️ Katalog Produk Resmi</h1>
        {loading ? <p style={{textAlign:'center'}}>⏳ Sedang memuat...</p> : 
          <ProductList products={products} onAddToCart={addToCart} />
        }
      </main>
    </>
  );
}

export default App;
