import './Header.css';

function Header() {
  return <>
    <header>
      <h1>One Program A Time</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/projects/">Projects</a></li>
        </ul>
      </nav>
    </header>
  </>
}

export default Header;