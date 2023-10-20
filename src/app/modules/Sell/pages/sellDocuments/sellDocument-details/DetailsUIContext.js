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
import { saveSellDocumentDetail, removeSellDocumentDetail } from "../../../_redux/sellDocumentDetails/sellDocumentDetailsCrud";

const DetailsUIContext = createContext();

export function useDetailsUIContext() {
  return useContext(DetailsUIContext);
}

export const DetailsUIConsumer = DetailsUIContext.Consumer;

export const DetailsUIProvider = forwardRef(
  ({ currentSellDocumentId, children, detail, btnRef, sellDocument, setSellDocument }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            activeDetails.map((d) => {
              let xx = {
                SellDocumentDetailId: null,
                ProductId: d.ProductId,
                ProductUnitId: d.ProductUnitId,
                Amount: +d.Amount,
                Price: +d.Price,
                PayablePrice: +d.PayablePrice,
                SellDiscountDetailInfoId: d.SellDiscountDetailInfoId,
                DiscountPrice: +d.DiscountPrice,
                FinalPrice: +d.FinalPrice,
                IsDeleted: false,
                SellDocumentDetailSerials: d.SellDocumentDetailSerials.map(
                  (s) => {
                    return { SerialNumber: s.SerialNumber };
                  }
                ),
              };

              return xx;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sellDocumentId, setSellDocumentId] = useState(currentSellDocumentId);

    const initDetail = {
      SellDocumentDetailId: "",
      SellDocumentId: sellDocumentId,
      ProductId: "",
      ProductUnitId: "",
      Amount: "",
      Price: "",
      PayablePrice: "",
      SellDiscountDetailInfoId: "",
      DiscountPrice: "",
      FinalPrice: "",
      IsDeleted: false,
      SerialCount: 0,
      SellDocumentDetailSerials: [],
    };

    const { actionsLoading, sellDocumentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.sellDocuments.actionsLoading,
        sellDocumentForEdit: state.sellDocuments.sellDocumentForEdit,
        error: state.sellDocuments.error,
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
    const [totalCount, setTotalCount] = useState(detail.length);

    useEffect(() => {
      // setDetails(
      //   !!sellDocumentForEdit &&
      //     !!sellDocumentForEdit.SellDocumentDetails &&
      //     sellDocumentForEdit.SellDocumentDetails.length > 0
      //     ? sellDocumentForEdit.SellDocumentDetails
      //     : []
      // );
      // setTotalCount(
      //   !!sellDocumentForEdit &&
      //     !!sellDocumentForEdit.SellDocumentDetails &&
      //     sellDocumentForEdit.SellDocumentDetails.length > 0
      //     ? sellDocumentForEdit.SellDocumentDetails.length
      //     : 0
      // );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellDocumentForEdit]);

    useEffect(() => {
      initDetail.SellDocumentId = currentSellDocumentId;

      setSellDocumentId(currentSellDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSellDocumentId]);

    useEffect(() => {
      setActiveDetails(details);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    useEffect(() => {
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
        (detail) => detail.SellDocumentDetailId == detailId
      )[0];

      return {
        SellDocumentDetailId: detailObj.SellDocumentDetailId,
        SellDocumentId: detailObj.SellDocumentId,
        ProductId: detailObj.ProductId,
        Product: detailObj.Product,
        ProductUnitId: detailObj.ProductUnitId,
        ProductUnit: detailObj.ProductUnit,
        Amount: detailObj.Amount,
        IsDeleted: false,
        SerialCount: !!detailObj.SellDocumentDetailSerials? detailObj.SellDocumentDetailSerials.length: 0,
        SellDocumentDetailSerials: detailObj.SellDocumentDetailSerials,
      };
    };

    const addDetail = (detail) => {
      detail.SellDocumentId = sellDocument.SellDocumentId;
      saveSellDocumentDetail(detail).then(({data}) => {
        setSellDocument(data);
        setDetails(data.SellDocumentDetails);
        setSelectedId(undefined);
      });
    };

    const removeDetail = (detailId) => {
      removeSellDocumentDetail(detailId).then(()=>{
        setDetails(details.filter((x) => x.SellDocumentDetailId != detailId));
      });
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.SellDocumentDetailId == detail.SellDocumentDetailId
            ? detail
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.SellDocumentDetailSerialId =
        "temps_" + Math.floor(Math.random() * 1000);
      let detailObj = findDetail(serial.SellDocumentDetailId);
      detailObj.SellDocumentDetailSerials.push(serial);
      detailObj.SerialCount = detailObj.SellDocumentDetailSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let detailObj = findDetail(serial.SellDocumentDetailId);
      detailObj.SellDocumentDetailSerials = detailObj.SellDocumentDetailSerials.filter(
        (x) => x.SellDocumentDetailSerialId != serial.SellDocumentDetailSerialId
      );
      detailObj.SerialCount = detailObj.SellDocumentDetailSerials.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      detail = findDetail(selectedItem.SellDocumentDetailId);
      return (
        detail.SellDocumentDetailSerials.filter((x) => x.SerialNumber == serial)
          .length > 0
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
      sellDocument,
      sellDocumentId,
      setSellDocumentId,
      initDetail,
      selectedId,
      setSelectedId,
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
