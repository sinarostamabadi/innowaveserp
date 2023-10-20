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
import { initialFilter } from "./SellPricingDetailsUIHelper";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";
import { CloneObject } from "../../../../../../core/_helpers";

const SellPricingDetailsUIContext = createContext();

export function useSellPricingDetailsUIContext() {
  return useContext(SellPricingDetailsUIContext);
}

export const SellPricingDetailsUIConsumer =
  SellPricingDetailsUIContext.Consumer;

export const SellPricingDetailsUIProvider = forwardRef(
  ({ currentSellPricingId, children, sellPricingDetail, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            sellPricingDetails.map((d) => {
              let x = {
                SellPricingDetailId:
                  d.SellPricingDetailId.toString().indexOf("temp") > -1
                    ? null
                    : d.SellPricingDetailId,
                ProductId: d.ProductId,
                Price: +d.Price,
                OnlinePrice: !!d.OnlinePrice? +d.OnlinePrice: null,
                PayablePrice: +d.PayablePrice,
                IsAccepted: d.IsAccepted,
                IsDeleted: d.IsDeleted,
              };

              return x;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sellPricingId, setSellPricingId] = useState(currentSellPricingId);

    const initSellPricingDetail = {
      SellPricingDetailId: "",
      SellPricingId: sellPricingId,
      SellPricing: null,
      ProductId: "",
      Product: null,
      Price: "",
      OnlinePrice: "",
      PayablePrice: "",
      IsAccepted: false,
      IsDeleted: false,
    };

    const { actionsLoading, sellPricingForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.sellPricings.actionsLoading,
        sellPricingForEdit: state.sellPricings.sellPricingForEdit,
        error: state.sellPricings.error,
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

    const [sellPricingDetails, setSellPricingDetails] = useState(
      sellPricingDetail
    );
    const [activeSellPricingDetails, setActiveSellPricingDetails] = useState(
      []
    );
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setSellPricingDetails(
        !!sellPricingForEdit &&
          !!sellPricingForEdit.SellPricingDetails &&
          sellPricingForEdit.SellPricingDetails.length > 0 &&
          sellPricingForEdit.SellPricingId == currentSellPricingId
          ? sellPricingForEdit.SellPricingDetails
          : []
      );
      setTotalCount(
        !!sellPricingForEdit &&
          !!sellPricingForEdit.SellPricingDetails &&
          sellPricingForEdit.SellPricingDetails.length > 0
          ? sellPricingForEdit.SellPricingDetails.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellPricingForEdit]);

    useEffect(() => {
      initSellPricingDetail.SellPricingId = currentSellPricingId;

      setSellPricingId(currentSellPricingId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSellPricingId]);

    useEffect(() => {
      setActiveSellPricingDetails(
        sellPricingDetails.filter((x) => x.IsDeleted == false)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellPricingDetails]);

    // Edit Dialog, New Dialog
    const [
      showEditSellPricingDetailDialog,
      setShowEditSellPricingDetailDialog,
    ] = useState(false);
    const openNewSellPricingDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initSellPricingDetail));
      setShowEditSellPricingDetailDialog(true);
    };
    const openEditSellPricingDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findSellPricingDetail(id));
      setShowEditSellPricingDetailDialog(true);
    };
    const closeEditSellPricingDetailDialog = () => {
      setSelectedId(undefined);
      setShowEditSellPricingDetailDialog(false);
    };

    const [
      showDeleteSellPricingDetailDialog,
      setShowDeleteSellPricingDetailDialog,
    ] = useState(false);
    const openDeleteSellPricingDetailDialog = (id) => {
      setSelectedId(id);
      setShowDeleteSellPricingDetailDialog(true);
    };
    const closeDeleteSellPricingDetailDialog = () => {
      setSelectedId(undefined);
      setShowDeleteSellPricingDetailDialog(false);
    };

    const [
      showDeleteSellPricingDetailsDialog,
      setShowDeleteSellPricingDetailsDialog,
    ] = useState(false);
    const openDeleteSellPricingDetailsDialog = () => {
      setShowDeleteSellPricingDetailsDialog(true);
    };
    const closeDeleteSellPricingDetailsDialog = () => {
      setShowDeleteSellPricingDetailsDialog(false);
    };

    const [
      showFetchSellPricingDetailsDialog,
      setShowFetchSellPricingDetailsDialog,
    ] = useState(false);
    const openFetchSellPricingDetailsDialog = () => {
      setShowFetchSellPricingDetailsDialog(true);
    };
    const closeFetchSellPricingDetailsDialog = () => {
      setShowFetchSellPricingDetailsDialog(false);
    };

    const findSellPricingDetail = (sellPricingDetailId) => {
      if (!!sellPricingDetailId == false) return;

      const sellPricingDetailObj = sellPricingDetails.filter(
        (sellPricingDetail) =>
          sellPricingDetail.SellPricingDetailId == sellPricingDetailId
      )[0];

      return {
        SellPricingDetailId: sellPricingDetailObj.SellPricingDetailId,
        SellPricingId: sellPricingDetailObj.SellPricingId,
        ProductId: [sellPricingDetailObj.Product],
        Product: sellPricingDetailObj.Product,
        Price: +sellPricingDetailObj.Price,
        OnlinePrice: !!sellPricingDetailObj.OnlinePrice? +sellPricingDetailObj.OnlinePrice: null,
        PayablePrice: +sellPricingDetailObj.PayablePrice,
        IsAccepted: sellPricingDetailObj.IsAccepted,
        IsDeleted: false,
      };
    };

    const findByProductOnDetail = (productId) => {
      if (!!productId == false) return;

      const sellPricingDetailObj = sellPricingDetails.filter(
        (sellPricingDetail) => sellPricingDetail.ProductId == productId
      )[0];

      if (!!sellPricingDetailObj == false) return null;

      return {
        SellPricingDetailId: sellPricingDetailObj.SellPricingDetailId,
        SellPricingId: sellPricingDetailObj.SellPricingId,
        ProductId: sellPricingDetailObj.ProductId,
        Product: sellPricingDetailObj.Product,
        Price: +sellPricingDetailObj.Price,
        OnlinePrice: !!sellPricingDetailObj.OnlinePrice? +sellPricingDetailObj.OnlinePrice: null,
        PayablePrice: +sellPricingDetailObj.PayablePrice,
        IsAccepted: sellPricingDetailObj.IsAccepted,
        IsDeleted: false,
      };
    };

    const addSellPricingDetail = (sellPricingDetail) => {
      if (!sellPricingDetail.SellPricingDetailId) {
        sellPricingDetail.SellPricingDetailId =
          "temp_" + Math.floor(Math.random() * 100);

        setSellPricingDetails((sellPricingDetails) => [
          ...sellPricingDetails,
          sellPricingDetail,
        ]);
      } else updateSellPricingDetail(sellPricingDetail);
    };

    const removeSellPricingDetail = (sellPricingDetailId) => {
      if (sellPricingDetailId.toString().indexOf("temp_") > -1)
        setSellPricingDetails(
          sellPricingDetails.filter(
            (x) => x.SellPricingDetailId != sellPricingDetailId
          )
        );
      else {
        let sellPricingDetail = findSellPricingDetail(sellPricingDetailId);
        sellPricingDetail["IsDeleted"] = true;
        updateSellPricingDetail(sellPricingDetail);
      }
    };

    const updateSellPricingDetail = (sellPricingDetail) => {
      setSellPricingDetails((sellPricingDetails) =>
        sellPricingDetails.map((item) =>
          item.SellPricingDetailId == sellPricingDetail.SellPricingDetailId
            ? sellPricingDetail
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(sellPricingDetail);
      }, 200);
    };

    const value = {
      sellPricingDetails,
      activeSellPricingDetails,
      totalCount,
      setTotalCount,
      findSellPricingDetail,
      findByProductOnDetail,
      addSellPricingDetail,
      removeSellPricingDetail,
      updateSellPricingDetail,
      actionsLoading,
      sellPricingId,
      setSellPricingId,
      initSellPricingDetail,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditSellPricingDetailDialog,
      openEditSellPricingDetailDialog,
      openNewSellPricingDetailDialog,
      closeEditSellPricingDetailDialog,
      // Delete
      showDeleteSellPricingDetailDialog,
      openDeleteSellPricingDetailDialog,
      closeDeleteSellPricingDetailDialog,
      // Deletes
      showDeleteSellPricingDetailsDialog,
      openDeleteSellPricingDetailsDialog,
      closeDeleteSellPricingDetailsDialog,
      // Fetch
      showFetchSellPricingDetailsDialog,
      openFetchSellPricingDetailsDialog,
      closeFetchSellPricingDetailsDialog,
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
        <SellPricingDetailsUIContext.Provider value={value}>
          {children}
        </SellPricingDetailsUIContext.Provider>
      </>
    );
  }
);
