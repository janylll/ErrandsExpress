function Footer() {
    return (
      <footer className="footer">
        <hr />
        <div className="footer-content">
          <div className="footer-brand">
            <h4 className="footertitle">Errands Express</h4>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
  
          <div className="footer-info">
            <p>Fast and reliable errand services at your fingertips.</p>
            <p>Serving communities since 2025.</p>
            <p>Contact us: support@errandsexpress.com</p>
            <p>Operating hours: 8AM - 8PM, Mon - Sat</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  