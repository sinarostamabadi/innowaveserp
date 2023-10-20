/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { isEqual, isFunction } from "lodash";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const ProductsUIContext = createContext();

export function useProductsUIContext() {
  return useContext(ProductsUIContext);
}

export const ProductsUIConsumer = ProductsUIContext.Consumer;

export const ProductsUIProvider = forwardRef(
  ({ currentSellDiscountId, children, product, mode }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          products.map((x) => {
            return {
              SellDiscountProductId: x.SellDiscountProductId.toString().indexOf("temp") > -1 ? null: x.SellDiscountProductId,
              ProductId: x.ProductId,
              IsDeleted: !ids.some((i) => i == x.ProductId),
            };
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [sellDiscountId, setSellDiscountId] = useState(currentSellDiscountId);

    const initProduct = {
      SellDiscountProductId: undefined,
      ProductNumber: "",
      DiscountPercent: "",
    };

    const { actionsLoading, SellDiscountForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.sellDiscounts.actionsLoading,
        SellDiscountForEdit: state.sellDiscounts.SellDiscountForEdit,
        error: state.sellDiscounts.error,
      }),
      shallowEqual
    );

    const [products, setProducts] = useState(product);
    const [ids, setIds] = useState(
      product && product.length > 0 ? product.map((x) => x.ProductId) : []
    );
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!SellDiscountForEdit &&
        !!SellDiscountForEdit.SellDiscountProducts &&
        SellDiscountForEdit.SellDiscountProducts.length > 0 && SellDiscountForEdit.SellDiscountId == currentSellDiscountId
      ) {
        setProducts(SellDiscountForEdit.SellDiscountProducts);
        setIds(
          SellDiscountForEdit.SellDiscountProducts.map((x) => x.ProductId)
        );
        setTotalCount(SellDiscountForEdit.SellDiscountProducts.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SellDiscountForEdit]);

    useEffect(() => {
      initProduct.SellDiscountId = currentSellDiscountId;

      setSellDiscountId(currentSellDiscountId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSellDiscountId]);

    const [showEditProductDialog, setShowEditProductDialog] = useState(false);
    const openNewProductDialog = () => {
      setSelectedId(undefined);
      setShowEditProductDialog(true);
    };
    const openEditProductDialog = (id) => {
      setSelectedId(id);
      setShowEditProductDialog(true);
    };
    const closeEditProductDialog = () => {
      setSelectedId(undefined);
      setShowEditProductDialog(false);
    };

    const [showDeleteProductDialog, setShowDeleteProductDialog] = useState(
      false
    );
    const openDeleteProductDialog = (id) => {
      setSelectedId(id);
      setShowDeleteProductDialog(true);
    };
    const closeDeleteProductDialog = () => {
      setSelectedId(undefined);
      setShowDeleteProductDialog(false);
    };

    const [showDeleteProductsDialog, setShowDeleteProductsDialog] = useState(
      false
    );
    const openDeleteProductsDialog = () => {
      setShowDeleteProductsDialog(true);
    };
    const closeDeleteProductsDialog = () => {
      setShowDeleteProductsDialog(false);
    };

    const [showFetchProductsDialog, setShowFetchProductsDialog] = useState(
      false
    );
    const openFetchProductsDialog = () => {
      setShowFetchProductsDialog(true);
    };
    const closeFetchProductsDialog = () => {
      setShowFetchProductsDialog(false);
    };

    const findProduct = (sellDiscountProductId) => {
      return products.filter(
        (product) => product.SellDiscountProductId == sellDiscountProductId
      )[0];
    };

    const addProduct = (product) => {
      product.SellDiscountProductId = "temp_" + Math.floor(Math.random() * 100);

      setProducts((products) => [...product, ...products]);
    };

    const removeProduct = (sellDiscountProductId) => {
      console.log("sellDiscountProductId > ", sellDiscountProductId);
      setProducts((products) => [
        ...products.filter(
          (product) => product.ProductId != sellDiscountProductId
        ),
      ]);
    };

    const updateProduct = (product) => {
      setProducts((products) =>
        products.map((item) =>
          item.SellDiscountProductId === product.SellDiscountProductId
            ? product
            : item
        )
      );
    };

    const value = {
      ids,
      setIds,
      products,
      mode,
      findProduct,
      addProduct,
      removeProduct,
      updateProduct,
      totalCount,
      setTotalCount,
      actionsLoading,
      sellDiscountId,
      setSellDiscountId,
      initProduct,
      selectedId,
      showEditProductDialog,
      openEditProductDialog,
      openNewProductDialog,
      closeEditProductDialog,
      showDeleteProductDialog,
      openDeleteProductDialog,
      closeDeleteProductDialog,
      showDeleteProductsDialog,
      openDeleteProductsDialog,
      closeDeleteProductsDialog,
      showFetchProductsDialog,
      openFetchProductsDialog,
      closeFetchProductsDialog,
    };

    return (
      <ProductsUIContext.Provider value={value}>
        {children}
      </ProductsUIContext.Provider>
    );
  }
);
