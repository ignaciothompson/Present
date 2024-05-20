import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './navbar.module.css';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.navContainer}>
      <div className={styles.imgContainer}>
        <img src="/images/logo.png" id={styles.logoImg} alt="Logo" />
      </div>
      <div className={styles.btnGroup}>
        {isMobile ? (
          <>
            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              &#9776;
            </button>
            {menuOpen && (
              <div className={styles.smallBtnGroup}>
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
            )}
          </>
        ) : (
          <>
            <Link to="/" className={styles.navBtn}>
              Tienda
            </Link>
            <Link to="/sobre-nosotros" className={styles.navBtn}>
              Sobre Nosotros
            </Link>
            <Link to="/carrito" className={styles.navBtn}>
              Carrito
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;