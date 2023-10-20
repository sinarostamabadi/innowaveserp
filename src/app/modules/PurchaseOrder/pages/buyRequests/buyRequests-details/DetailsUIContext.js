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
import { initialFilter } from "./DetailsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const DetailsUIContext = createContext();

export function useDetailsUIContext() {
  return useContext(DetailsUIContext);
}

export const DetailsUIConsumer = DetailsUIContext.Consumer;

export const DetailsUIProvider = forwardRef(
  ({ currentBuyRequestId, children, detail, btnRef, mode }, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          activeDetails.map((d) => {
            let xx = {
              BuyRequestDetailId: !!d.BuyRequestId
                ? d.BuyRequestDetailId
                : null,
              ProductId: d.ProductId,
              ProductUnitId: d.ProductUnitId,
              Amount: +d.Amount,
              ManagerApproveStatusId: +d.ManagerApproveStatusId,
              ManagerDescription: d.ManagerDescription,
              ManagerAmount: +d.ManagerAmount,
              MainWarehouseStatusId: +d.MainWarehouseStatusId,
              MainWarehouseAmount: +d.MainWarehouseAmount,
              MainWarehouseProductUnitId: +d.MainWarehouseProductUnitId,
              MainWarehouseDescription: d.MainWarehouseDescription,
            };

            return xx;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buyRequestId, setBuyRequestId] = useState(currentBuyRequestId);

    const initDetail = {
      BuyRequestDetailId: "",
      BuyRequestId: buyRequestId,
      ProductId: "",
      ProductUnitId: "",
      Amount: "",
      ManagerApproveStatusId: "",
      ManagerDescription: "",
      ManagerAmount: "",
      MainWarehouseStatusId: "",
      MainWarehouseAmount: "",
      MainWarehouseProductUnitId: "",
      MainWarehouseDescription: "",
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.buyRequests.actionsLoading,
        realPersonForEdit: state.buyRequests.buyRequestForEdit,
        error: state.buyRequests.error,
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

    const [details, setDetails] = useState(detail);
    const [activeDetails, setActiveDetails] = useState(detail);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setDetails(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyRequestDetails &&
          realPersonForEdit.BuyRequestDetails.length > 0
          ? realPersonForEdit.BuyRequestDetails
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyRequestDetails &&
          realPersonForEdit.BuyRequestDetails.length > 0
          ? realPersonForEdit.BuyRequestDetails.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDetail.BuyRequestId = currentBuyRequestId;

      setBuyRequestId(currentBuyRequestId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBuyRequestId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    // Edit Dialog, New Dialog
    const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
    const openNewDetailDialog = () => {
      setSelectedId(undefined);
      setShowEditDetailDialog(true);
    };
    const openEditDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowEditDetailDialog(true);
    };
    const closeEditDetailDialog = () => {
      setSelectedId(undefined);
      setShowEditDetailDialog(false);
    };

    const [showDeleteDetailDialog, setShowDeleteDetailDialog] = useState(false);
    const openDeleteDetailDialog = (id) => {
      setSelectedId(id);
      setShowDeleteDetailDialog(true);
    };
    const closeDeleteDetailDialog = () => {
      setSelectedId(undefined);
      setShowDeleteDetailDialog(false);
    };

    const [showDeleteDetailsDialog, setShowDeleteDetailsDialog] = useState(
      false
    );
    const openDeleteDetailsDialog = () => {
      setShowDeleteDetailsDialog(true);
    };
    const closeDeleteDetailsDialog = () => {
      setShowDeleteDetailsDialog(false);
    };

    const [showFetchDetailsDialog, setShowFetchDetailsDialog] = useState(false);
    const openFetchDetailsDialog = () => {
      setShowFetchDetailsDialog(true);
    };
    const closeFetchDetailsDialog = () => {
      setShowFetchDetailsDialog(false);
    };

    const findDetail = (detailId) => {
      if (!!detailId == false) return;

      const detailObj = details.filter(
        (detail) => detail.BuyRequestDetailId == detailId
      )[0];

      return {
        BuyRequestDetailId: detailObj.BuyRequestDetailId,
        BuyRequestId: detailObj.BuyRequestId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        ManagerApproveStatusId: +detailObj.ManagerApproveStatusId,
        ManagerDescription: detailObj.ManagerDescription,
        ManagerAmount: +detailObj.ManagerAmount,
        MainWarehouseStatusId: +detailObj.MainWarehouseStatusId,
        MainWarehouseAmount: +detailObj.MainWarehouseAmount,
        MainWarehouseProductUnitId: +detailObj.MainWarehouseProductUnitId,
        MainWarehouseDescription: detailObj.MainWarehouseDescription,
      };
    };

    const addDetail = (detail) => {
      detail.BuyRequestDetailId = "temp_" + Math.floor(Math.random() * 100);

      setDetails((details) => [...details, detail]);
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.BuyRequestDetailId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.BuyRequestDetailId == detail.BuyRequestDetailId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const value = {
      details,
      activeDetails,
      totalCount,
      setTotalCount,
      findDetail,
      addDetail,
      removeDetail,
      updateDetail,
      actionsLoading,
      buyRequestId,
      setBuyRequestId,
      initDetail,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      mode,
      // Edit
      showEditDetailDialog,
      openEditDetailDialog,
      openNewDetailDialog,
      closeEditDetailDialog,
      // Delete
      showDeleteDetailDialog,
      openDeleteDetailDialog,
      closeDeleteDetailDialog,
      // Deletes
      showDeleteDetailsDialog,
      openDeleteDetailsDialog,
      closeDeleteDetailsDialog,
      // Fetch
      showFetchDetailsDialog,
      openFetchDetailsDialog,
      closeFetchDetailsDialog,
    };

    return (
      <DetailsUIContext.Provider value={value}>
        {children}
      </DetailsUIContext.Provider>
    );
  }
);
