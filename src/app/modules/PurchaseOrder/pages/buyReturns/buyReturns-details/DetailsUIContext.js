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
  (
    { currentBuyReturnId, children, detail, btnRef, editable, updateBuyReturn },
    ref
  ) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");
    console.log("detail > ", detail);
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            details.map((d) => {
              let xx = {
                BuyReturnDetailId:
                  d.BuyReturnDetailId.toString().indexOf("temp") > -1
                    ? null
                    : d.BuyReturnDetailId,
                ProductId: d.ProductId,
                ProductUnitId: d.ProductUnitId,
                Amount: d.Amount && +d.Amount,
                Price: d.Price && +d.Price,
                DiscountPrice: d.DiscountPrice && +d.DiscountPrice,
                DiscountPercent: d.DiscountPercent && +d.DiscountPercent,
                CostPrice: d.CostPrice && +d.CostPrice,
                PayablePrice: d.PayablePrice && +d.PayablePrice,
                IsDeleted: d.IsDeleted,
                BuyReturnSerials: d.BuyReturnSerials.map((s) => {
                  return { SerialNumber: s.SerialNumber };
                }),
                BuyReturnDetailRequestDetails: d.BuyReturnDetailRequestDetails,
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buyReturnId, setBuyReturnId] = useState(currentBuyReturnId);

    const initDetail = {
      BuyReturnDetailId: "",
      BuyReturnId: buyReturnId,
      ProductId: "",
      ProductUnitId: "",
      Amount: "",
      Price: "",
      DiscountPrice: "",
      DiscountPercent: "",
      CostPrice: "",
      PayablePrice: "",
      IsDeleted: false,
      SerialCount: 0,
      BuyReturnSerials: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.buyReturns.actionsLoading,
        realPersonForEdit: state.buyReturns.buyReturnForEdit,
        error: state.buyReturns.error,
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

    const [activeDetails, setActiveDetails] = useState([]);
    const [details, setDetails] = useState(detail);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!realPersonForEdit &&
        !!realPersonForEdit.BuyReturnDetails &&
        realPersonForEdit.BuyReturnDetails.length > 0 &&
        realPersonForEdit.BuyReturnId == currentBuyReturnId
      ) {
        setDetails(realPersonForEdit.BuyReturnDetails);
        setTotalCount(realPersonForEdit.BuyReturnDetails.length);
      } else if (!!detail && detail.length > 0) {
        setDetails(detail);
        setTotalCount(detail.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit, detail]);

    useEffect(() => {
      initDetail.BuyReturnId = currentBuyReturnId;

      setBuyReturnId(currentBuyReturnId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBuyReturnId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));

      updateBuyReturn({
        DetailCount:
          !!details &&
          details.length > 0 &&
          details.filter((x) => x.IsDeleted == false).length > 0
            ? details.filter((x) => x.IsDeleted == false).length
            : 0,
        SumPrice:
          !!details &&
          details.length > 0 &&
          details.filter((x) => x.IsDeleted == false).length > 0
            ? details
                .filter((x) => x.IsDeleted == false)
                .map((x) => +x.Amount * +x.Price)
                .reduce((a, b) => a + b)
            : 0,
        SumPayable:
          !!details &&
          details.length > 0 &&
          details.filter((x) => x.IsDeleted == false).length > 0
            ? details
                .filter((x) => x.IsDeleted == false)
                .map(
                  (x) => +x.Amount * +x.Price - +x.DiscountPrice + +x.CostPrice
                )
                .reduce((a, b) => a + b)
            : 0,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    useEffect(() => {
      setSerialErrors(
        activeDetails.filter(
          (d) => d.BuyReturnSerials.length != d.Amount && d.Product.HasSerial
        ).length > 0
          ? "تعداد سریال‌های کالاهای سریالی باید با مقدار یکسان باشد."
          : ""
      );
    }, [activeDetails]);

    // Serials Dialog
    const [showSerialDetailDialog, setShowSerialDetailDialog] = useState(false);
    const openSerialDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowSerialDetailDialog(true);
    };
    const closeSerialDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowSerialDetailDialog(false);
    };

    // Edit Dialog, New Dialog
    const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
    const openNewDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDetailDialog(true);
    };
    const openEditDetailDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDetail(id));
      setShowEditDetailDialog(true);
    };
    const closeEditDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDetailDialog(false);
    };

    const [showDeleteDetailDialog, setShowDeleteDetailDialog] = useState(false);
    const openDeleteDetailDialog = (id) => {
      setSelectedId(id);
      setShowDeleteDetailDialog(true);
    };
    const closeDeleteDetailDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteDetailDialog(false);
    };

    const [showDeleteDetailsDialog, setShowDeleteDetailsDialog] =
      useState(false);
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
        (detail) => detail.BuyReturnDetailId == detailId
      )[0];

      return {
        BuyReturnDetailId: detailObj.BuyReturnDetailId,
        BuyReturnId: detailObj.BuyReturnId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        Price: detailObj.Price,
        DiscountPrice: detailObj.DiscountPrice,
        DiscountPercent: detailObj.DiscountPercent,
        CostPrice: detailObj.CostPrice,
        PayablePrice: detailObj.PayablePrice,
        IsDeleted: false,
        SerialCount: detailObj.BuyReturnSerials.length,
        BuyReturnSerials: detailObj.BuyReturnSerials,
      };
    };

    const addDetail = (detail) => {
      detail.BuyReturnDetailId = "temp_" + Math.floor(Math.random() * 100);

      setDetails((details) => [...details, detail]);
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.BuyReturnDetailId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.BuyReturnDetailId == detail.BuyReturnDetailId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.BuyReturnSerialId = "temps_" + Math.floor(Math.random() * 1000);
      let detailObj = findDetail(serial.BuyReturnDetailId);
      detailObj.BuyReturnSerials.push(serial);
      detailObj.SerialCount = detailObj.BuyReturnSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let detailObj = findDetail(serial.BuyReturnDetailId);
      detailObj.BuyReturnSerials = detailObj.BuyReturnSerials.filter(
        (x) => x.BuyReturnSerialId != serial.BuyReturnSerialId
      );
      detailObj.SerialCount = detailObj.BuyReturnSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      detail = findDetail(selectedItem.BuyReturnDetailId);
      return (
        detail.BuyReturnSerials.filter((x) => x.SerialNumber == serial).length >
        0
      );
    };
    console.log("details > ", details);
    console.log("activeDetails > ", activeDetails);
    const value = {
      details,
      activeDetails,
      totalCount,
      setTotalCount,
      findDetail,
      addDetail,
      removeDetail,
      updateDetail,
      // Serial Actions
      addSerial,
      removeSerial,
      checkSerial,
      actionsLoading,
      buyReturnId,
      editable,
      setBuyReturnId,
      initDetail,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Serials
      showSerialDetailDialog,
      openSerialDetailDialog,
      closeSerialDetailDialog,
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
      <>
        {!!serialErrors && (
          <Alerty
            variant="danger"
            title={t("err.Error")}
            description={serialErrors}
            className=""
          ></Alerty>
        )}
        <DetailsUIContext.Provider value={value}>
          {children}
        </DetailsUIContext.Provider>
      </>
    );
  }
);
