import React from "react";


function ProductCard({ item, onAddToCart }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };


  return (
    <div className="card">
      <img
        src={item.image}
        alt={item.name}
        className="card-img"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />
      <div className="card-body">
        <span className="card-cat">{item.category}</span>
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>


        <div className="card-footer">
          <span className="price">{formatRupiah(item.price)}</span>
          <button className="btn-add" onClick={() => onAddToCart(item)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
