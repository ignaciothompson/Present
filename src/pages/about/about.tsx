import styles from './about.module.css'

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>Present</h1>
      <h3>Facilitando la limpieza desde 1985</h3>
      <div className={styles.container}>
        <div className={styles.history}>
          <h3>Nuestra Historia</h3>
          <p>Desde 1985, Present, bajo la dirección del ingeniero Charles Thompson, ha sido un referente en la fabricación de productos químicos para lavado de ropa y limpieza. Con más de tres décadas de experiencia, nuestra empresa familiar se destaca por su compromiso con la satisfacción del cliente, involucrando a todo el equipo y a nuestros proveedores en esta misión. Basados en una filosofía de colaboración responsable, creatividad y eficiencia, nos esforzamos por fabricar productos que se adapten a las necesidades específicas de nuestros clientes, destacándose por su calidad y efectividad. A través de un sistema de gestión de calidad enfocado en la mejora continua, nos mantenemos siempre a la vanguardia, innovando constantemente para satisfacer las demandas cambiantes del mercado y asegurar la excelencia en cada paso.</p>
        </div>
        <div className={styles.history}>
          <h3>Nuestra Misión</h3>
          <p>Nuestra misión en Present es ser líderes en la venta y distribución de productos dedicados a la higiene, limpieza y desinfección, tanto de fabricación propia como de terceros. Nos dedicamos plenamente a satisfacer las necesidades de nuestros clientes, brindándoles apoyo constante para su crecimiento y eficiencia en el servicio a los consumidores. Además, asumimos un compromiso firme con la comunidad y la preservación del medio ambiente en todas nuestras operaciones. Con una presencia destacada en el 80% del mercado de lavaderos domésticos e industriales, nos esforzamos por ofrecer soluciones que marquen la diferencia en la calidad y sostenibilidad de los procesos de limpieza.</p>
        </div>
      </div>
      <div className={styles.clientsInfo}>
        <p className={styles.clients}>Tenemos la confianza de más de <span className={styles.clientsNum}>3000</span> clientes</p>
      </div>
    </div>
  )
}

export default About