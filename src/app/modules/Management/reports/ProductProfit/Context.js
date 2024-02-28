import React, { createContext, useContext, useState, useEffect } from "react";
const ProductProfitContext = createContext();

export function useProductProfitContext() {
  return useContext(ProductProfitContext);
}

export const ProductProfitConsumer = ProductProfitContext.Consumer;

export function ProductProfitProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    FromDate: "",
    ToDate: "",
    ProductId: "",
  });

  const value = {
    items,
    filters,
    setFilters,
  };

  return (
    <ProductProfitContext.Provider value={value}>
      {children}
    </ProductProfitContext.Provider>
  );
}
