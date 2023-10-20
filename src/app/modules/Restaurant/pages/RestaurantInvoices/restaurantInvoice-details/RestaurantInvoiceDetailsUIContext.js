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
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const RestaurantInvoiceDetailsUIContext = createContext();

export function useRestaurantInvoiceDetailsUIContext() {
  return useContext(RestaurantInvoiceDetailsUIContext);
}

export const RestaurantInvoiceDetailsUIConsumer =
  RestaurantInvoiceDetailsUIContext.Consumer;

export const RestaurantInvoiceDetailsUIProvider = forwardRef(
  (
    {
      invoceId,
      personId,
      invoiceDate,
      children,
      restaurantInvoiceDetail,
      masterSave,
      notifyPrices,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          restaurantInvoiceDetails.map((restaurantInvoiceDetail) => {
            //restaurantInvoiceDetail.RestaurantInvoiceId = null;
            let temp = { ...restaurantInvoiceDetail };

            if (
              !!temp.RestaurantInvoiceDtlId &&
              temp.RestaurantInvoiceDtlId.toString().indexOf("temp_") > -1
            ) {
              temp.RestaurantInvoiceDtlId = null;
              temp.SavedRestaurantInvoiceId = 0;
            }

            return temp;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [restaurantInvoiceId, setRestaurantInvoiceId] = useState(invoceId);

    const initRestaurantInvoiceDetail = {
      RestaurantInvoiceDtlId: undefined,
      RestaurantInvoiceId: invoceId,
      RestaurantInvoiceDetail: null,
      RestaurantInvoiceTimes: [],
    };

    const { actionsLoading, restaurantInvoiceForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.restaurantInvoices.actionsLoading,
        restaurantInvoiceForEdit:
          state.restaurantInvoices.restaurantInvoiceForEdit,
        error: state.restaurantInvoices.error,
      }),
      shallowEqual
    );

    const [restaurantInvoiceDetails, setRestaurantInvoiceDetails] = useState(
      restaurantInvoiceDetail
    );

    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!invoceId &&
        !!restaurantInvoiceForEdit &&
        !!restaurantInvoiceForEdit.RestaurantInvoiceDtl &&
        restaurantInvoiceForEdit.RestaurantInvoiceDtl.length > 0
      ) {
        setRestaurantInvoiceDetails(
          restaurantInvoiceForEdit.RestaurantInvoiceDtl
        );
        setTotalCount(restaurantInvoiceForEdit.RestaurantInvoiceDtl.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantInvoiceForEdit]);

    useEffect(() => {
      if (!!restaurantInvoiceDetails && restaurantInvoiceDetails.length > 0) {
        let menuItemPrice = 0;
        restaurantInvoiceDetails.forEach((element) => {
          menuItemPrice += +element.PayablePrice;
        });

        notifyPrices(menuItemPrice, 0, 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantInvoiceDetails]);

    useEffect(() => {
      initRestaurantInvoiceDetail.RestaurantInvoiceId = invoceId;

      setRestaurantInvoiceId(invoceId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoceId]);

    const findRestaurantInvoiceDetail = (restaurantInvoiceDtlId) => {
      return restaurantInvoiceDetails.filter(
        (restaurantInvoiceDetail) =>
          restaurantInvoiceDetail.RestaurantInvoiceDtlId ==
          restaurantInvoiceDtlId
      )[0];
    };

    const collectDetail = (dtlObj) => {
      var detailObj = restaurantInvoiceDetails.filter(
        (dtl) => dtl.RestaurantMenuItemId == dtlObj.RestaurantMenuItemId
      );
      if (!!detailObj == false || (!!detailObj && detailObj.length == 0))
        return null;

      detailObj = { ...detailObj[0] };
      detailObj.PayablePrice += +dtlObj.PayablePrice;
      detailObj.Price += +dtlObj.Price;
      detailObj.Count += +dtlObj.Count;

      return detailObj;
    };

    const addRestaurantInvoiceDetail = (restaurantInvoiceDetail) => {
      const collected = collectDetail(restaurantInvoiceDetail);
      restaurantInvoiceDetail.RestaurantInvoiceId = +restaurantInvoiceDetail.RestaurantInvoiceId;

      if (!!collected) {
        updateRestaurantInvoiceDetail(collected);
      } else {
        restaurantInvoiceDetail.RestaurantInvoiceDtlId =
          "temp_" + Math.floor(Math.random() * 100);

        setRestaurantInvoiceDetails((RestaurantInvoiceDetails) => [
          ...RestaurantInvoiceDetails,
          restaurantInvoiceDetail,
        ]);
      }
    };

    const removeDetail = (restaurantInvoiceDtlId) => {
      setRestaurantInvoiceDetails(
        restaurantInvoiceDetails.filter(
          (restaurantInvoiceDetail) =>
            restaurantInvoiceDetail.RestaurantInvoiceDtlId !=
            restaurantInvoiceDtlId
        )
      );
    };

    const updateRestaurantInvoiceDetail = (restaurantInvoiceDetail) => {
      restaurantInvoiceDetail.RestaurantInvoiceDetailTypeId = +restaurantInvoiceDetail.RestaurantInvoiceDetailTypeId;
      restaurantInvoiceDetail.RestaurantInvoiceId = +restaurantInvoiceDetail.RestaurantInvoiceId;

      setRestaurantInvoiceDetails((RestaurantInvoiceDetails) =>
        RestaurantInvoiceDetails.map((item) =>
          item.RestaurantInvoiceDtlId ===
            restaurantInvoiceDetail.RestaurantInvoiceDtlId
            ? restaurantInvoiceDetail
            : item
        )
      );
    };

    const [showEditDetailDialog, setShowEditDetailDialog] = useState(false);
    const openEditDetailDialog = (id) => {
      setSelectedId(id);
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

    const value = {
      masterSave,
      selectedId,
      restaurantInvoiceDetails,
      findRestaurantInvoiceDetail,
      addRestaurantInvoiceDetail,
      removeDetail,
      updateRestaurantInvoiceDetail,
      totalCount,
      setTotalCount,
      actionsLoading,
      restaurantInvoiceId,
      setRestaurantInvoiceId,
      initRestaurantInvoiceDetail,
      showEditDetailDialog,
      openEditDetailDialog,
      closeEditDetailDialog,
      showDeleteDetailDialog,
      openDeleteDetailDialog,
      closeDeleteDetailDialog,
      invoiceDate,
      personId,
    };

    return (
      <RestaurantInvoiceDetailsUIContext.Provider value={value}>
        {children}
      </RestaurantInvoiceDetailsUIContext.Provider>
    );
  }
);
