// import '../styles/styles.css';
function Header() {
  return (
    <>
      {/* Skip link for screen readers and keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <h1 className="site-title">
            <a href="/" className="site-title-link">A11y Quest</a>
          </h1>

          <nav className="main-nav" aria-label="Main navigation">
            <ul className="nav-list">
              <li><a href="/" aria-current="page" >Home</a></li>
              <li><a href="/level-1">Level 1</a></li>
              <li><a href="/level-2">Level 2</a></li>
              <li><a href="/level-3">Level 3</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header

