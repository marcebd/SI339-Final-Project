function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} A11y Quest. All rights reserved.
        </p>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-nav-list">
            <li><a href="/about">About</a></li>
            <li><a href="/accessibility">Accessibility Statement</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
