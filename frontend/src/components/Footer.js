import React from "react";

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="footer">
      <p>© {currentYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
