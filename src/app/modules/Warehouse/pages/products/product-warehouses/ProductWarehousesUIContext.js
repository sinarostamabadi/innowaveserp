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
import { initialFilter } from "./ProductWarehousesUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const ProductWarehousesUIContext = createContext();

export function useProductWarehousesUIContext() {
  return useContext(ProductWarehousesUIContext);
}

export const ProductWarehousesUIConsumer = ProductWarehousesUIContext.Consumer;

export const ProductWarehousesUIProvider = forwardRef(
  ({ currentProductId, children, productWarehouse, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            productWarehouses.map((d) => {
              let x = {
                ProductWarehouseId: d.ProductWarehouseId.toString().indexOf("temp") > -1? null: d.ProductWarehouseId,
                WarehouseId: d.WarehouseId,
                PackageTypeId: d.PackageTypeId,
                OrderPoint: +d.OrderPoint,
                MinStock: +d.MinStock,
                MaxStock: +d.MaxStock,
                Location: d.Location,
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

    const initProductWarehouse = {
      ProductWarehouseId: "",
      ProductId: productId,
      WarehouseId: "",
      PackageTypeId: "",
      OrderPoint: "",
      MinStock: "",
      MaxStock: "",
      Location: "",
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

    const [productWarehouses, setProductWarehouses] = useState(productWarehouse);
    const [activeProductWarehouses, setActiveProductWarehouses] = useState(productWarehouse);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setProductWarehouses(
        !!productForEdit &&
          !!productForEdit.ProductWarehouses &&
          productForEdit.ProductWarehouses.length > 0
          ? productForEdit.ProductWarehouses
          : []
      );
      setTotalCount(
        !!productForEdit &&
          !!productForEdit.ProductWarehouses &&
          productForEdit.ProductWarehouses.length > 0
          ? productForEdit.ProductWarehouses.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productForEdit]);

    useEffect(() => {
      initProductWarehouse.ProductId = currentProductId;

      setProductId(currentProductId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProductId]);

    useEffect(() => {
      setActiveProductWarehouses(productWarehouses.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productWarehouses]);

    // Edit Dialog, New Dialog
    const [showEditProductWarehouseDialog, setShowEditProductWarehouseDialog] = useState(false);
    const openNewProductWarehouseDialog = () => {
      setSelectedId(undefined);
      setShowEditProductWarehouseDialog(true);
    };
    const openEditProductWarehouseDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findProductWarehouse(id));
      setShowEditProductWarehouseDialog(true);
    };
    const closeEditProductWarehouseDialog = () => {
      setSelectedId(undefined);
      setShowEditProductWarehouseDialog(false);
    };

    const [showDeleteProductWarehouseDialog, setShowDeleteProductWarehouseDialog] = useState(false);
    const openDeleteProductWarehouseDialog = (id) => {
      setSelectedId(id);
      setShowDeleteProductWarehouseDialog(true);
    };
    const closeDeleteProductWarehouseDialog = () => {
      setSelectedId(undefined);
      setShowDeleteProductWarehouseDialog(false);
    };

    const [showDeleteProductWarehousesDialog, setShowDeleteProductWarehousesDialog] = useState(
      false
    );
    const openDeleteProductWarehousesDialog = () => {
      setShowDeleteProductWarehousesDialog(true);
    };
    const closeDeleteProductWarehousesDialog = () => {
      setShowDeleteProductWarehousesDialog(false);
    };

    const [showFetchProductWarehousesDialog, setShowFetchProductWarehousesDialog] = useState(false);
    const openFetchProductWarehousesDialog = () => {
      setShowFetchProductWarehousesDialog(true);
    };
    const closeFetchProductWarehousesDialog = () => {
      setShowFetchProductWarehousesDialog(false);
    };

    const findProductWarehouse = (productWarehouseId) => {
      if (!!productWarehouseId == false) return;

      const productWarehouseObj = productWarehouses.filter(
        (productWarehouse) => productWarehouse.ProductWarehouseId == productWarehouseId
      )[0];

      return {
        ProductWarehouseId: productWarehouseObj.ProductWarehouseId,
        ProductId: productWarehouseObj.ProductId,
        Product: productWarehouseObj.Product,
        WarehouseId: productWarehouseObj.WarehouseId,
        Warehouse: productWarehouseObj.Warehouse,
        PackageTypeId: productWarehouseObj.PackageTypeId,
        PackageType: productWarehouseObj.PackageType,
        OrderPoint: productWarehouseObj.OrderPoint,
        MinStock: productWarehouseObj.MinStock,
        MaxStock: productWarehouseObj.MaxStock,
        Location: productWarehouseObj.Location,
        IsDeleted: false,
      };
    };

    const addProductWarehouse = (productWarehouse) => {
      productWarehouse.ProductWarehouseId = "temp_" + Math.floor(Math.random() * 100);

      setProductWarehouses((productWarehouses) => [...productWarehouses, productWarehouse]);
    };

    const removeProductWarehouse = (productWarehouseId) => {
      if (productWarehouseId.toString().indexOf("temp_") > -1)
        setProductWarehouses(productWarehouses.filter((x) => x.ProductWarehouseId != productWarehouseId));
      else {
        let productWarehouse = findProductWarehouse(productWarehouseId);
        productWarehouse["IsDeleted"] = true;
        updateProductWarehouse(productWarehouse);
      }
    };

    const updateProductWarehouse = (productWarehouse) => {
      setProductWarehouses((productWarehouses) =>
        productWarehouses.map((item) =>
          item.ProductWarehouseId == productWarehouse.ProductWarehouseId ? productWarehouse : item
        )
      );

      setTimeout(() => {
        setSelectedItem(productWarehouse);
      }, 200);
    };

    const value = {
      productWarehouses,
      activeProductWarehouses,
      totalCount,
      setTotalCount,
      findProductWarehouse,
      addProductWarehouse,
      removeProductWarehouse,
      updateProductWarehouse,
      actionsLoading,
      productId,
      setProductId,
      initProductWarehouse,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditProductWarehouseDialog,
      openEditProductWarehouseDialog,
      openNewProductWarehouseDialog,
      closeEditProductWarehouseDialog,
      // Delete
      showDeleteProductWarehouseDialog,
      openDeleteProductWarehouseDialog,
      closeDeleteProductWarehouseDialog,
      // Deletes
      showDeleteProductWarehousesDialog,
      openDeleteProductWarehousesDialog,
      closeDeleteProductWarehousesDialog,
      // Fetch
      showFetchProductWarehousesDialog,
      openFetchProductWarehousesDialog,
      closeFetchProductWarehousesDialog,
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
        <ProductWarehousesUIContext.Provider value={value}>
          {children}
        </ProductWarehousesUIContext.Provider>
      </>
    );
  }
);
