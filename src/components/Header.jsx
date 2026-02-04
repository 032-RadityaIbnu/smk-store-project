function Header({ cartCount, onOpenCart }) {
  return (
    <nav className="navbar">
      <div className="brand">⚡ SMK Store</div>

      <button className="cart-btn" onClick={onOpenCart}>
        🛒
        <span
          className={`badge ${cartCount > 0 ? "badge-active" : ""}`}
        >
          {cartCount}
        </span>
      </button>
    </nav>
  );
}

export default Header;