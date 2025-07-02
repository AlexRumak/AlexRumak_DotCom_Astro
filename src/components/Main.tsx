import styles from "./Main.module.css";
import AboutMe from "./content/AboutMe.tsx";
import ContactMe from "./content/ContactMe.tsx";

function Main() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mainColumn}>
          <article className={styles.article}>
            <h2 className={styles.h2}>Welcome to my website</h2>
            <p>This page is under construction. Please explore around while we work on building it up.</p>
            <p>Do note :) It will probably be broken somewhere haha.</p>
          </article>
          <div className={styles.article}>
            <ContactMe />
          </div>
        </div>
        <div className={styles.sideColumn}>
          <AboutMe />
        </div>
      </div>
    </>
  );
}

export default Main;
