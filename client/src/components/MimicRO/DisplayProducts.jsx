import React from "react";
import { FaWineBottle } from "react-icons/fa";
const products = [
  {
    id: 1,
    name: "Galon Isi Ulang",
    volume: "19 Liter",
    price: 7000,
    stock: 25,
  },
  {
    id: 2,
    name: "Galon RO Premium",
    volume: "19 Liter",
    price: 10000,
    stock: 12,
  },
  {
    id: 3,
    name: "Galon Alkali",
    volume: "19 Liter",
    price: 15000,
    stock: 8,
  },
];

const DisplayProducts = () => {
  return (
    <div className="row">
      {products.map((item) => (
        <div key={item.id} className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src="/images/gallon-water.png"
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              <h5 className="mt-3">{item.name}</h5>

              <p className="text-muted mb-1">{item.volume}</p>

              <h6 className="text-primary">
                Rp {item.price.toLocaleString("id-ID")}
              </h6>

              <span className="badge bg-success">Stok {item.stock}</span>
            </div>
          </div>
        </div>
      ))}
      <FaWineBottle size={90} color="#0d6efd" />
    </div>
  );
};

export default DisplayProducts;
