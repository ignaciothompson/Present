import { Link } from "react-router-dom";
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.imgContainer}>
        <img src="/images/logo.png" id={styles.logoImg} alt="Logo" />
      </div>
      <div className={styles.btnGroup}>
        <Link to="/" className={styles.navBtn}>
          Tienda
        </Link>
        <Link to="/sobre-nosotros" className={styles.navBtn}>
          Sobre Nosotros
        </Link>
        <Link to="/carrito" className={styles.navBtn}>
          Carrito
        </Link>
      </div>
    </div>
  );
};

export default Navbar;