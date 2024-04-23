import React, { useState } from "react";
import styles from "./discounts.module.css";

const Discounts = ({ products }) => {
  const [startIndex, setStartIndex] = useState(0);

  const goToPrevSet = () => {
    const newIndex = Math.max(0, startIndex - 4);
    setStartIndex(newIndex);
  };

  const goToNextSet = () => {
    const newIndex = Math.min(products.length - 1, startIndex + 4);
    setStartIndex(newIndex);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slides}>
        {products.slice(startIndex, startIndex + 4).map((product, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imgContainer}>
              <img
                className={styles.discountImg}
                src={product.image}
                alt={product.name}
              />
            </div>
            <h3 className={styles.discountTitle}>{product.name}</h3>
            <div className={styles.prices}>
              <p className={styles.oldPrice}>{product.price}</p>
              <p className={styles.newPrice}>{product.newPrice}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className={styles.prev}
          onClick={goToPrevSet}
          disabled={startIndex === 0}
        >
          <img src="/images/arrow-left.svg" alt="prev" />
        </button>
        <button
          className={styles.next}
          onClick={goToNextSet}
          disabled={startIndex + 4 >= products.length}
        >
          <img src="/images/arrow-right.svg" alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Discounts;

