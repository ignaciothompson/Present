
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Homepage from './pages/homepage/homepage';
import About from './pages/about/about';
import CartPage from './pages/cart.tsx/cart';
import ProductPage from './pages/productPage/productPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/carrito" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
