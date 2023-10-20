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
  ({ currentSellDiscountId, children, detail, mode }, ref) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            details.map((d) => {
              let xx = {
                SellDiscountDetailId: d.SellDiscountDetailId.toString().indexOf("temp") > -1? null: d.SellDiscountDetailId,
                FromAmount: d.FromAmount,
                ToAmount: d.ToAmount,
                FromPrice: d.FromPrice,
                ToPrice: d.ToPrice,
                DiscountPercent: d.DiscountPercent,
                DiscountPrice: d.DiscountPrice,
                RewardAmount: d.RewardAmount,
                IsDeleted: d.IsDeleted,
                SellDiscountDetailInfos: !!d.SellDiscountDetailInfos && d.SellDiscountDetailInfos.map((s) => {
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
    const [sellDiscountId, setSellDiscountId] = useState(currentSellDiscountId);

    const initDetail = {
      SellDiscountDetailId: "",
      SellDiscountId: sellDiscountId,
      FromAmount: null,
      ToAmount: null,
      FromPrice: null,
      ToPrice: null,
      DiscountPercent: null,
      DiscountPrice: null,
      RewardAmount: null,
      IsDeleted: false,
      SerialCount: 0,
      SellDiscountDetailInfos: [],
    };

    const { actionsLoading, realPersonForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.sellDiscounts.actionsLoading,
        realPersonForEdit: state.sellDiscounts.sellDiscountForEdit,
        error: state.sellDiscounts.error,
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
          !!realPersonForEdit.SellDiscountDetails &&
          realPersonForEdit.SellDiscountDetails.length > 0 && realPersonForEdit.SellDiscountId == currentSellDiscountId
          ? realPersonForEdit.SellDiscountDetails
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.SellDiscountDetails &&
          realPersonForEdit.SellDiscountDetails.length > 0
          ? realPersonForEdit.SellDiscountDetails.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDetail.SellDiscountId = currentSellDiscountId;

      setSellDiscountId(currentSellDiscountId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSellDiscountId]);

    useEffect(() => {
      setActiveDetails(details.filter((x) => x.IsDeleted == false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

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
        (detail) => detail.SellDiscountDetailId == detailId
      )[0];

      return {
        SellDiscountDetailId: detailObj.SellDiscountDetailId,
        SellDiscountId: detailObj.SellDiscountId,
        FromAmount: detailObj.FromAmount,
        ToAmount: detailObj.ToAmount,
        FromPrice: detailObj.FromPrice,
        ToPrice: detailObj.ToPrice,
        DiscountPercent: detailObj.DiscountPercent,
        DiscountPrice: detailObj.DiscountPrice,
        RewardAmount: detailObj.RewardAmount,
        IsDeleted: false,
        SerialCount: !!detailObj.SellDiscountDetailInfos? detailObj.SellDiscountDetailInfos.length: 0,
        SellDiscountDetailInfos: detailObj.SellDiscountDetailInfos,
      };
    };

    const addDetail = (detail) => {
      detail.SellDiscountDetailId = "temp_" + Math.floor(Math.random() * 100);

      setDetails((details) => [...details, detail]);
    };

    const removeDetail = (detailId) => {
      if (detailId.toString().indexOf("temp_") > -1)
        setDetails(details.filter((x) => x.SellDiscountDetailId != detailId));
      else {
        let detail = findDetail(detailId);
        detail["IsDeleted"] = true;
        updateDetail(detail);
      }
    };

    const updateDetail = (detail) => {
      setDetails((details) =>
        details.map((item) =>
          item.SellDiscountDetailId == detail.SellDiscountDetailId ? detail : item
        )
      );

      setTimeout(() => {
        setSelectedItem(detail);
      }, 200);
    };

    const addSerial = (serial) => {
      serial.SellDiscountSerialId = "temps_" + Math.floor(Math.random() * 1000);
      let detailObj = findDetail(serial.SellDiscountDetailId);
      detailObj.SellDiscountDetailInfos.push(serial);
      detailObj.SerialCount = detailObj.SellDiscountDetailInfos.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const removeSerial = (serial) => {
      let detailObj = findDetail(serial.SellDiscountDetailId);
      detailObj.SellDiscountDetailInfos = detailObj.SellDiscountDetailInfos.filter(
        (x) => x.SellDiscountSerialId != serial.SellDiscountSerialId
      );
      detailObj.SerialCount = detailObj.SellDiscountDetailInfos.length;

      updateDetail(detailObj);

      setTimeout(() => {
        setSelectedItem(detailObj);
      }, 200);
    };

    const checkSerial = (serial) => {
      detail = findDetail(selectedItem.SellDiscountDetailId);
      return (
        detail.SellDiscountDetailInfos.filter((x) => x.SerialNumber == serial).length > 0
      );
    };

    const value = {
      details,
      activeDetails,
      totalCount,
      mode,
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
      sellDiscountId,
      setSellDiscountId,
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
