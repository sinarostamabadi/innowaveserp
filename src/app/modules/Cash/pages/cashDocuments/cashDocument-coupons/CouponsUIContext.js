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
import { CloneObject } from "src/core/_helpers";
import { CouponTools } from "../quick/Dependency";
import { getConfig } from "src/core/_models/ModelDescriber";
import { CouponModel } from "src/core/_models/Cash/CouponModel";

const CouponsUIContext = createContext();

export function useCouponsUIContext() {
  return useContext(CouponsUIContext);
}

export const CouponsUIConsumer = CouponsUIContext.Consumer;

export const CouponsUIProvider = forwardRef(
  ({ currentDocumentId, children, coupon, btnRef }, ref) => {
    const [coupons, setCoupons] = useState(
      !!coupon ? coupon.map((x) => CouponTools.Clean(x)) : []
    );
    const [selectedId, setSelectedId] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);
    const initCoupon = { ...CouponTools.Model, DocumentId: currentDocumentId };
    const [selectedItem, setSelectedItem] = useState(initCoupon);

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        console.log("coupons > ", coupons);
        fn(
          !!coupons &&
            coupons.length &&
            coupons.map((coupon) => {
              let tempDoc = CouponTools.Clean(coupon);
              if (
                !!tempDoc.CouponId &&
                tempDoc.CouponId.toString().indexOf("temp_") > -1
              ) {
                tempDoc.CouponId = null;
              }

              return tempDoc;
            })
        );
      },
    }));

    const { actionsLoading, documentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        documentForEdit: state.companies.documentForEdit,
        error: state.companies.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(
      getConfig(CouponModel, "DocumentId", "desc").initialFilter
    );

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

    const [activeCoupons, setActiveCoupons] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActiveCoupons(coupons.filter((x) => x.IsDeleted == false));
      setTotalCount(coupons.filter((x) => x.IsDeleted == false).length);
    }, [coupons]);

    useEffect(() => {
      initCoupon.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setSelectedItem(findCoupon(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const [showEditCouponDialog, setShowEditCouponDialog] = useState(false);
    const openNewCouponDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCoupon));

      setTimeout(() => {
        setShowEditCouponDialog(true);
      }, 200);
    };
    const openEditCouponDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findCoupon(selectedId));
      setTimeout(() => {
        setShowEditCouponDialog(true);
      }, 200);
    };
    const closeEditCouponDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCoupon));
      setShowEditCouponDialog(false);
    };

    const [showDeleteCouponDialog, setShowDeleteCouponDialog] = useState(false);
    const openDeleteCouponDialog = (id) => {
      setSelectedId(id);
      setShowDeleteCouponDialog(true);
    };
    const closeDeleteCouponDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initCoupon));
      setShowDeleteCouponDialog(false);
    };

    const [showDeleteCouponsDialog, setShowDeleteCouponsDialog] =
      useState(false);
    const openDeleteCouponsDialog = () => {
      setShowDeleteCouponsDialog(true);
    };
    const closeDeleteCouponsDialog = () => {
      setShowDeleteCouponsDialog(false);
    };

    const [showFetchCouponsDialog, setShowFetchCouponsDialog] = useState(false);
    const openFetchCouponsDialog = () => {
      setShowFetchCouponsDialog(true);
    };
    const closeFetchCouponsDialog = () => {
      setShowFetchCouponsDialog(false);
    };

    const findCoupon = (couponId) => {
      return coupons.filter((coupon) => coupon.CouponId == couponId)[0];
    };

    const addCoupon = (coupon) => {
      coupon.CouponId = "temp_" + Math.floor(Math.random() * 100);
      coupon.DocumentId = +coupon.DocumentId;

      setCoupons((coupons) => [...coupons, coupon]);
    };

    const removeCoupon = (couponId) => {
      if (couponId.toString().indexOf("temp_") > -1) {
        setCoupons((coupons) =>
          coupons.filter((item) => item.CouponId != couponId)
        );
      } else {
        setCoupons((coupons) =>
          coupons.map((item) => {
            let copyCoupon = CloneObject(item);
            if (copyCoupon.CouponId == couponId) copyCoupon.IsDeleted = true;

            return copyCoupon;
          })
        );
      }
    };

    const updateCoupon = (coupon) => {
      coupon.DocumentId = +coupon.DocumentId;
      setCoupons((coupons) =>
        coupons.map((item) =>
          item.CouponId === coupon.CouponId ? coupon : item
        )
      );
    };

    const value = {
      coupons,
      activeCoupons,
      findCoupon,
      addCoupon,
      removeCoupon,
      updateCoupon,
      totalCount,
      setTotalCount,
      actionsLoading,
      documentId,
      setDocumentId,
      initCoupon,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      showEditCouponDialog,
      openEditCouponDialog,
      openNewCouponDialog,
      closeEditCouponDialog,
      showDeleteCouponDialog,
      openDeleteCouponDialog,
      closeDeleteCouponDialog,
      showDeleteCouponsDialog,
      openDeleteCouponsDialog,
      closeDeleteCouponsDialog,
      showFetchCouponsDialog,
      openFetchCouponsDialog,
      closeFetchCouponsDialog,
    };

    return (
      <CouponsUIContext.Provider value={value}>
        {children}
      </CouponsUIContext.Provider>
    );
  }
);
