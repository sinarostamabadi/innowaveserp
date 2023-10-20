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
import { initialFilter } from "./ProductUnitsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const ProductUnitsUIContext = createContext();

export function useProductUnitsUIContext() {
  return useContext(ProductUnitsUIContext);
}

export const ProductUnitsUIConsumer = ProductUnitsUIContext.Consumer;

export const ProductUnitsUIProvider = forwardRef(
  ({ currentProductId, children, productUnit, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            productUnits.map((d) => {
              let x = {
                ProductUnitId: d.ProductUnitId.toString().indexOf("temp") > -1? null: d.ProductUnitId,
                UnitId: d.UnitId,
                IsDeleted: d.IsDeleted,
              };

              return x;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [productId, setProductId] = useState(currentProductId);

    const initProductUnit = {
      ProductUnitId: "",
      ProductId: productId,
      UnitId: "",
      IsDeleted: false,
    };

    const { actionsLoading, productForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.products.actionsLoading,
        productForEdit: state.products.productForEdit,
        error: state.products.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const setQueryParams = useCallback((nextQueryParams) => {
      setQueryParamsBase((prevQueryParams) => {
        if (isFunction(nextQueryParams)) {
          nextQueryParams = nextQueryParams(prevQueryParams);
        }

        if (isEqual(prevQueryParams, nextQueryParams)) {
          return prevQueryParams;
        }

        return nextQueryParams;
      });
    }, []);

    const [productUnits, setProductUnits] = useState(productUnit);
    const [activeProductUnits, setActiveProductUnits] = useState(productUnit);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setProductUnits(
        !!productForEdit &&
          !!productForEdit.ProductUnits &&
          productForEdit.ProductUnits.length > 0
          ? productForEdit.ProductUnits
          : []
      );
      setTotalCount(
        !!productForEdit &&
          !!productForEdit.ProductUnits &&
          productForEdit.ProductUnits.length > 0
          ? productForEdit.ProductUnits.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productForEdit]);

    useEffect(() => {
      initProductUnit.ProductId = currentProductId;

      setProductId(currentProductId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProductId]);

    useEffect(() => {
      setActiveProductUnits(productUnits.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productUnits]);

    // Edit Dialog, New Dialog
    const [showEditProductUnitDialog, setShowEditProductUnitDialog] = useState(false);
    const openNewProductUnitDialog = () => {
      setSelectedId(undefined);
      setShowEditProductUnitDialog(true);
    };
    const openEditProductUnitDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findProductUnit(id));
      setShowEditProductUnitDialog(true);
    };
    const closeEditProductUnitDialog = () => {
      setSelectedId(undefined);
      setShowEditProductUnitDialog(false);
    };

    const [showDeleteProductUnitDialog, setShowDeleteProductUnitDialog] = useState(false);
    const openDeleteProductUnitDialog = (id) => {
      setSelectedId(id);
      setShowDeleteProductUnitDialog(true);
    };
    const closeDeleteProductUnitDialog = () => {
      setSelectedId(undefined);
      setShowDeleteProductUnitDialog(false);
    };

    const [showDeleteProductUnitsDialog, setShowDeleteProductUnitsDialog] = useState(
      false
    );
    const openDeleteProductUnitsDialog = () => {
      setShowDeleteProductUnitsDialog(true);
    };
    const closeDeleteProductUnitsDialog = () => {
      setShowDeleteProductUnitsDialog(false);
    };

    const [showFetchProductUnitsDialog, setShowFetchProductUnitsDialog] = useState(false);
    const openFetchProductUnitsDialog = () => {
      setShowFetchProductUnitsDialog(true);
    };
    const closeFetchProductUnitsDialog = () => {
      setShowFetchProductUnitsDialog(false);
    };

    const findProductUnit = (productUnitId) => {
      if (!!productUnitId == false) return;

      const productUnitObj = productUnits.filter(
        (productUnit) => productUnit.ProductUnitId == productUnitId
      )[0];

      return {
        ProductUnitId: productUnitObj.ProductUnitId,
        ProductId: productUnitObj.ProductId,
        Product: productUnitObj.Product,
        UnitId: productUnitObj.UnitId,
        Unit: productUnitObj.Unit,
        IsDeleted: false,
      };
    };

    const addProductUnit = (productUnit) => {
      productUnit.ProductUnitId = "temp_" + Math.floor(Math.random() * 100);

      setProductUnits((productUnits) => [...productUnits, productUnit]);
    };

    const removeProductUnit = (productUnitId) => {
      if (productUnitId.toString().indexOf("temp_") > -1)
        setProductUnits(productUnits.filter((x) => x.ProductUnitId != productUnitId));
      else {
        let productUnit = findProductUnit(productUnitId);
        productUnit["IsDeleted"] = true;
        updateProductUnit(productUnit);
      }
    };

    const updateProductUnit = (productUnit) => {
      setProductUnits((productUnits) =>
        productUnits.map((item) =>
          item.ProductUnitId == productUnit.ProductUnitId ? productUnit : item
        )
      );

      setTimeout(() => {
        setSelectedItem(productUnit);
      }, 200);
    };

    const value = {
      productUnits,
      activeProductUnits,
      totalCount,
      setTotalCount,
      findProductUnit,
      addProductUnit,
      removeProductUnit,
      updateProductUnit,
      actionsLoading,
      productId,
      setProductId,
      initProductUnit,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditProductUnitDialog,
      openEditProductUnitDialog,
      openNewProductUnitDialog,
      closeEditProductUnitDialog,
      // Delete
      showDeleteProductUnitDialog,
      openDeleteProductUnitDialog,
      closeDeleteProductUnitDialog,
      // Deletes
      showDeleteProductUnitsDialog,
      openDeleteProductUnitsDialog,
      closeDeleteProductUnitsDialog,
      // Fetch
      showFetchProductUnitsDialog,
      openFetchProductUnitsDialog,
      closeFetchProductUnitsDialog,
    };

    return (
      <>
        {!!serialErrors && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={serialErrors}
            className=""
          ></Alerty>
        )}
        <ProductUnitsUIContext.Provider value={value}>
          {children}
        </ProductUnitsUIContext.Provider>
      </>
    );
  }
);
