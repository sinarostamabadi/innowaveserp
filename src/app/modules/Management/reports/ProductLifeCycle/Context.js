import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductLifeCycleModel } from "../../../../../core/_models/Report/ProductLifeCycleModel";
import { get } from "../../_data/ProductLifeCycle";
const ProductLifeCycleContext = createContext();

export function useProductLifeCycleContext() {
  return useContext(ProductLifeCycleContext);
}

export const ProductLifeCycleConsumer = ProductLifeCycleContext.Consumer;

export function ProductLifeCycleProvider({ events, children }) {
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
    dataModel: ProductLifeCycleModel,
    gotoEditBuy: events.gotoEditBuy,
    gotoEditAssignment: events.gotoEditAssignment,
    gotoEditSellPricing: events.gotoEditSellPricing,
    gotoEditReceipt: events.gotoEditReceipt,
    gotoEditSellDiscount: events.gotoEditSellDiscount,
  };

  useEffect(() => {
    setItems([]);

    if (!!filters.ProductId)
      get(filters).then(({ data }) => {
        setItems(data.Items);
      });
  }, [filters]);

  return (
    <ProductLifeCycleContext.Provider value={value}>
      {children}
    </ProductLifeCycleContext.Provider>
  );
}
