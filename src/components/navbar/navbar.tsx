import React from "react";

import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
        <div className={styles.imgContainer}>
            <img src="" id={styles.logoImg}/>
            <h1>Present</h1>
        </div>
        <div className={styles.btnGroup}>
            <button className={styles.navBtn} >Tienda</button>
            <button className={styles.navBtn}>Sobre Nosotros</button>
            <button className={styles.navBtn}>Carrito</button>
        </div>
    </div>
  )
}

export default Navbar