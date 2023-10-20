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
import { initialFilter } from "./DiscountsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const DiscountsUIContext = createContext();

export function useDiscountsUIContext() {
  return useContext(DiscountsUIContext);
}

export const DiscountsUIConsumer = DiscountsUIContext.Consumer;

export const DiscountsUIProvider = forwardRef(
      ({ currentBuyReturnId, children, discount, btnRef, updateBuyReturn, editable, buyReturnSum}, ref) => {
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          discounts.map((d) => {
            let xx = {
              BuyReturnDiscountId: d.BuyReturnDiscountId.toString().indexOf("temp") > -1? null: d.BuyReturnDiscountId,
              DiscountTypeId: d.DiscountTypeId,
              DiscountPercent: d.DiscountPercent,
              PricePercent: Math.ceil(+d.PricePercent),
              IsDeleted: d.IsDeleted
            };

            return xx;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buyReturnId, setBuyReturnId] = useState(currentBuyReturnId);

    const initDiscount = {
      BuyReturnDiscountId: "",
      BuyReturnId: buyReturnId,
      DiscountTypeId: "",
      DiscountPercent: "",
      PricePercent: "",
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

    const [discounts, setDiscounts] = useState(discount);
    const [activeDiscounts, setActiveDiscounts] = useState(discount);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setDiscounts(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyReturnDiscounts &&
          realPersonForEdit.BuyReturnDiscounts.length > 0 && realPersonForEdit.BuyReturnId == currentBuyReturnId
          ? realPersonForEdit.BuyReturnDiscounts
          : []
      );
      setTotalCount(
        !!realPersonForEdit &&
          !!realPersonForEdit.BuyReturnDiscounts &&
          realPersonForEdit.BuyReturnDiscounts.length > 0
          ? realPersonForEdit.BuyReturnDiscounts.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realPersonForEdit]);

    useEffect(() => {
      initDiscount.BuyReturnId = currentBuyReturnId;

      setBuyReturnId(currentBuyReturnId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBuyReturnId]);

    useEffect(() => {
      setActiveDiscounts(discounts.filter((x) => x.IsDeleted == false));
      updateBuyReturn(
        !!discounts && discounts.length > 0 && discounts.filter((x) => x.IsDeleted == false).length > 0
          ? discounts
              .filter((x) => x.IsDeleted == false)
              .map((x) => x.PricePercent)
              .reduce((a, b) => a + b)
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discounts]);

    // Edit Dialog, New Dialog
    const [showEditDiscountDialog, setShowEditDiscountDialog] = useState(false);
    const openNewDiscountDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDiscountDialog(true);
    };
    const openEditDiscountDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findDiscount(id));
      setShowEditDiscountDialog(true);
    };
    const closeEditDiscountDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowEditDiscountDialog(false);
    };

    const [showDeleteDiscountDialog, setShowDeleteDiscountDialog] = useState(
      false
    );
    const openDeleteDiscountDialog = (id) => {
      setSelectedId(id);
      setShowDeleteDiscountDialog(true);
    };
    const closeDeleteDiscountDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(undefined);
      setShowDeleteDiscountDialog(false);
    };

    const [showDeleteDiscountsDialog, setShowDeleteDiscountsDialog] = useState(
      false
    );
    const openDeleteDiscountsDialog = () => {
      setShowDeleteDiscountsDialog(true);
    };
    const closeDeleteDiscountsDialog = () => {
      setShowDeleteDiscountsDialog(false);
    };

    const [showFetchDiscountsDialog, setShowFetchDiscountsDialog] = useState(
      false
    );
    const openFetchDiscountsDialog = () => {
      setShowFetchDiscountsDialog(true);
    };
    const closeFetchDiscountsDialog = () => {
      setShowFetchDiscountsDialog(false);
    };

    const findDiscount = (discountId) => {
      if (!!discountId == false) return;

      const discountObj = discounts.filter(
        (discount) => discount.BuyReturnDiscountId == discountId
      )[0];

      return {
        BuyReturnDiscountId: discountObj.BuyReturnDiscountId,
        BuyReturnId: discountObj.BuyReturnId,
        DiscountTypeId: discountObj.DiscountTypeId,
        Product: discountObj.Product,
        DiscountPercent: discountObj.DiscountPercent,
        ProductUnit: discountObj.ProductUnit,
        PricePercent: discountObj.PricePercent,
      };
    };

    const addDiscount = (discount) => {
      discount.BuyReturnDiscountId = "temp_" + Math.floor(Math.random() * 100);
      if(+discount.DiscountPercent > 0)
        discount.PricePercent = (+buyReturnSum.SumPayable * +discount.DiscountPercent) / 100;

      setDiscounts((discounts) => [...discounts, discount]);
    };

    const removeDiscount = (discountId) => {
      if (discountId.toString().indexOf("temp_") > -1)
        setDiscounts(discounts.filter((x) => x.BuyReturnDiscountId != discountId));
      else {
        let discount = findDiscount(discountId);
        discount["IsDeleted"] = true;
        updateDiscount(discount);
      }
    };

    const updateDiscount = (discount) => {
      if(+discount.DiscountPercent > 0)
        discount.PricePercent = (+buyReturnSum.SumPayable * +discount.DiscountPercent) / 100;

      setDiscounts((discounts) =>
        discounts.map((item) =>
          item.BuyReturnDiscountId == discount.BuyReturnDiscountId ? discount : item
        )
      );

      setTimeout(() => {
        setSelectedItem(discount);
      }, 200);
    };

    const value = {
      discounts,
      activeDiscounts,
      totalCount,
      setTotalCount,
      findDiscount,
      addDiscount,
      removeDiscount,
      updateDiscount,
      actionsLoading,
      buyReturnId,
      editable,
      setBuyReturnId,
      initDiscount,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      buyReturnSum,
      // Edit
      showEditDiscountDialog,
      openEditDiscountDialog,
      openNewDiscountDialog,
      closeEditDiscountDialog,
      // Delete
      showDeleteDiscountDialog,
      openDeleteDiscountDialog,
      closeDeleteDiscountDialog,
      // Deletes
      showDeleteDiscountsDialog,
      openDeleteDiscountsDialog,
      closeDeleteDiscountsDialog,
      // Fetch
      showFetchDiscountsDialog,
      openFetchDiscountsDialog,
      closeFetchDiscountsDialog,
    };

    return (
      <DiscountsUIContext.Provider value={value}>
        {children}
      </DiscountsUIContext.Provider>
    );
  }
);
