import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.locations}>
          <p>Nos pueden encontrar en nuestros dos locales:</p>
          <div className={styles.location}>
            <p>Montevideo</p>
            <a 
            href='https://maps.app.goo.gl/bSLDgvJf2osUm34Z8' 
            target="_blank" 
            rel="noopener noreferrer">
              Cooper 2109
            </a>
          </div>
          <div className={styles.location}>
            <p>Maldonado</p>
            <a 
            href='https://maps.app.goo.gl/AiUAe7HQvGwQvXye7' 
            target="_blank" 
            rel="noopener noreferrer">
              Román Bergalli 1037
            </a>
          </div>
        </div>
        {/* <p className={styles.contactInfo}>Si quiere contactarnos directamente mandanos un mensaje a <a href="https://wa.me/59898384646" target="_blank" rel="noopener noreferrer" className={styles.wpLink}>Whatsapp</a></p> */}
      <div className={styles.socialMedia}>
        <p>Si quiere contactarnos directamente mandanos un mensaje a <a href="https://wa.me/59898384646" target="_blank" rel="noopener noreferrer" className={styles.wpLink}>Whatsapp, </a></p>
        <p>tambien pueden encontrarnos en nuestras redes sociales</p>
        <div className={styles.socialMediaIcons}>
        <a href="https://www.instagram.com/present.uy/" target="_blank" rel="noopener noreferrer">
          <img src='/images/instagram.svg' alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/present.uy/" target="_blank" rel="noopener noreferrer">
          <img src='/images/facebook.svg' alt="Facebook" />
        </a>
        </div>
      </div>
      <p className={styles.copyright}>© 2024 Thompson Ltda.</p>
    </footer>
  );
};

export default Footer;

