import React from "react";
import { Link } from "react-router-dom";
import styles from "./products.module.css";
import { Product, CartItem, ProductsProps } from "../../types";
import ReactPaginate from "react-paginate";

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [showAlert, setShowAlert] = React.useState<number | null>(null);
  const [quantities, setQuantities] = React.useState<number[]>(
    products.map(() => 1)
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  // const productsPerPage = 16;

  const [productsPerPage, setProductsPerPage] = React.useState(window.innerWidth >= 768 ? 16 : 8);

  React.useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(window.innerWidth >= 768 ? 16 : 8);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    const existingCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [];

    const existingCartItemIndex = existingCartItems.findIndex(
      (item: CartItem) => item.product.id === product.id
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...existingCartItems];
      updatedCartItems[existingCartItemIndex].quantity += quantity;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const newCartItem = {
        product,
        quantity,
      };

      const updatedCartItems = [...existingCartItems, newCartItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className={styles.productsContainer}>
      {currentProducts.map((product, index) => {
        return (
          <div className={styles.card} key={product.id}>
            {showAlert === index && (
            <div className={styles.alert + " alert-primary"}>
              <p>Agregaste el producto al carrito</p>
              <span className={"mdi mdi-open-in-new open"}>
                <Link to="/carrito"><img src="/images/open.svg" alt="Ver carrito" /></Link>
              </span>
              <span className="mdi mdi-close close" onClick={() => setShowAlert(null)}>
                <img src="/images/close.svg" alt="Cerrar" />
              </span>
            </div>
            )}
            <Link to={`/product/${product.id}`} state={{ product }}>
              <div className={styles.cardContent}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.productImg}
                    // src={product.photoPath ?? "/images/default.jpg"} uncomment when the api is ready
                    src="/images/detergente.jpg"
                    alt={product.name}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>
                    {product.name.length >= 30
                      ? product.name.substring(0, product.name.lastIndexOf(' ')).trim() + product.name.substring(product.name.lastIndexOf(' ') + 1)
                      : product.name}
                  </h3>
                  <p className={styles.regularPrice}>
                    ${Math.round(product.price)}
                  </p>
                </div>
              </div>
            </Link>
            <div className={styles.buttons}>
              <input
                type="number"
                className={styles.quantity}
                value={quantities[index]}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value, 10))
                }
                min="1"
              />
              <button
                className={styles.button}
                onClick={() => {
                  handleAddToCart(product, quantities[index]);
                  setShowAlert(index);
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        );
      })}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(products.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pageLink}
        previousLinkClassName={styles.previousLink}
        nextLinkClassName={styles.nextLink}
        breakLinkClassName={styles.breakLink}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default Products;
