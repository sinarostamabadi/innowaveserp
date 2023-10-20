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
  ({ currentReceiptId, children, detail, btnRef }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            details.map((d) => {
              let xx = {
                ReceiptDtlId: d.ReceiptDtlId.toString().indexOf("temp") > -1? null: d.ReceiptDtlId,
                BuyDetailId: d.BuyDetailId == ""? null: d.BuyDetailId,
                ProductId: d.ProductId,
                ProductUnitId: d.ProductUnitId,
                Amount: +d.Amount,
                UseDate: !!d.UseDate ? d.UseDate : null,
                ExpireDate: !!d.ExpireDate ? d.ExpireDate : null,
                IsDeleted: d.IsDeleted,
                ReceiptSerials: d.ReceiptSerials.map((s) => {
                  return { SerialNumber: s.SerialNumber };
                }),
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [receiptId, setReceiptId] = useState(currentReceiptId);

    const initDetail = {
      ReceiptDtlId: "",
      ReceiptId: receiptId,
      BuyDetailId: "",
      ProductId: "",
      ProductUnitId: "",
      Amount: "",
      UseDate: "",
      ExpireDate: "",
      IsDeleted: false,
      SerialCount: 0,
      ReceiptSerials: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.receipts.actionsLoading,
        realPersonForEdit: state.receipts.receiptForEdit,
        error: state.receipts.error,
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
    const [activeDetails, setActiveDetails] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setDetails(
        !!realPersonForEdit &&
          !!realPersonForEdit.ReceiptDtls &&
          realPersonForEdit.ReceiptDtls.length > 0 && realPersonForEdit.ReceiptId == currentReceiptId
          ? realPersonForEdit.ReceiptDtls
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.ReceiptDtls &&
          realPersonForEdit.ReceiptDtls.length > 0
          ? realPersonForEdit.ReceiptDtls.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDetail.ReceiptId = currentReceiptId;

      setReceiptId(currentReceiptId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReceiptId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    useEffect(() => {
      setSerialErrors(
        activeDetails.filter((d) => d.ReceiptSerials.length != d.Amount && d.Product.HasSerial)
          .length > 0
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
      setShowSerialDetailDialog(false);
    };

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
        (detail) => detail.ReceiptDtlId == detailId
      )[0];

      return {
        ReceiptDtlId: detailObj.ReceiptDtlId,
        ReceiptId: detailObj.ReceiptId,
        BuyDetailId: detailObj.BuyDetailId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        UseDate: detailObj.UseDate,
        UseDateObj: !!detailObj.UseDate ? EnToFaObjDate(detailObj.UseDate) : "",
        ExpireDate: detailObj.ExpireDate,
        ExpireDateObj: !!detailObj.ExpireDate
          ? EnToFaObjDate(detailObj.ExpireDate)
          : "",
        IsDeleted: false,
        SerialCount: detailObj.ReceiptSerials.length,
        ReceiptSerials: detailObj.ReceiptSerials,
      };
    };

    const addDetail = (detail) => {
      detail.ReceiptDtlId = "temp_" + Math.floor(Math.random() * 100);

      setDetails((details) => [...details, detail]);
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.ReceiptDtlId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.ReceiptDtlId == detail.ReceiptDtlId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.ReceiptSerialId = "temps_" + Math.floor(Math.random() * 1000);
      let detailObj = findDetail(serial.ReceiptDtlId);
      detailObj.ReceiptSerials.push(serial);
      detailObj.SerialCount = detailObj.ReceiptSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let detailObj = findDetail(serial.ReceiptDtlId);
      detailObj.ReceiptSerials = detailObj.ReceiptSerials.filter(
        (x) => x.ReceiptSerialId != serial.ReceiptSerialId
      );
      detailObj.SerialCount = detailObj.ReceiptSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      detail = findDetail(selectedItem.ReceiptDtlId);
      return (
        detail.ReceiptSerials.filter((x) => x.SerialNumber == serial).length > 0
      );
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
      // Serial Actions
      addSerial,
      removeSerial,
      checkSerial,
      actionsLoading,
      receiptId,
      setReceiptId,
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
