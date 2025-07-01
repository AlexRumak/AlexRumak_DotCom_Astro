import styles from './Header.module.css';

function Header() {
  return <>
    <header className={styles.header}>
      <h1 className={styles.h1}>One Program A Time</h1>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li><a href="/">Home</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/projects/">Projects</a></li>
          <li><a href="/resume/">Resume</a></li>
        </ul>
      </nav>
    </header>
  </>
}

export default Header;