
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Homepage from './pages/homepage/homepage';
import About from './pages/about/about';
import Cart from './pages/cart.tsx/cart';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
