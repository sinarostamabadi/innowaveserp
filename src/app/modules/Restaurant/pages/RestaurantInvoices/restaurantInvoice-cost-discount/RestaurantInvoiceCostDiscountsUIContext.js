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

const RestaurantInvoiceCostDiscountsUIContext = createContext();

export function useRestaurantInvoiceCostDiscountsUIContext() {
  return useContext(RestaurantInvoiceCostDiscountsUIContext);
}

export const RestaurantInvoiceCostDiscountsUIConsumer =
  RestaurantInvoiceCostDiscountsUIContext.Consumer;

export const RestaurantInvoiceCostDiscountsUIProvider = forwardRef(
  (
    {
      invoceId,
      invoiceDate,
      personId,
      children,
      restaurantInvoiceCost,
      restaurantInvoiceDiscount,
      timing,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          restaurantInvoiceDiscounts.map((restaurantInvoiceCostDiscount) => {
            console.log(
              "restaurantInvoiceCostDiscount > ",
              restaurantInvoiceCostDiscount
            );

            if (
              restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountId.toString().indexOf(
                "temp_"
              ) > -1
            )
              restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountId =
                null;

            return restaurantInvoiceCostDiscount;
          })
        );
      },
    }));
    console.log("personId > ", personId);
    console.log("invoiceDate > ", invoiceDate);

    const [selectedId, setSelectedId] = useState(null);
    const [restaurantInvoiceId, setRestaurantInvoiceId] = useState(invoceId);

    const initRestaurantInvoiceCostDiscount = {
      RestaurantInvoiceCostDiscountId: undefined,
      RestaurantInvoiceId: invoceId,
      RestaurantInvoiceCostDiscount: null,
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

    const [restaurantInvoiceCosts, setRestaurantInvoiceCosts] = useState(
      restaurantInvoiceCost
    );
    const [restaurantInvoiceDiscounts, setRestaurantInvoiceDiscounts] =
      useState(restaurantInvoiceDiscount);

    const [costDiscounts, setCostDiscounts] = useState([
      ...restaurantInvoiceCost,
      ...restaurantInvoiceDiscount,
    ]);

    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!restaurantInvoiceForEdit &&
        !!restaurantInvoiceForEdit.RestaurantInvoiceDtl &&
        restaurantInvoiceForEdit.RestaurantInvoiceDtl.length > 0
      ) {
        setRestaurantInvoiceCosts(
          restaurantInvoiceForEdit.RestaurantInvoiceCost
        );
        setRestaurantInvoiceDiscounts(
          restaurantInvoiceForEdit.RestaurantInvoiceDiscount
        );

        setTotalCount(
          restaurantInvoiceForEdit.RestaurantInvoiceCost.length +
            restaurantInvoiceForEdit.RestaurantInvoiceDiscount.length
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantInvoiceForEdit]);

    useEffect(() => {
      let newCosts = [];
      restaurantInvoiceCosts.forEach((model) => {
        let obj = {};
        for (const key in model) {
          if (model.hasOwnProperty(key)) {
            const element = model[key];
            obj[key] = element;
          }
        }
        console.log("obj > ", obj);

        obj["Id"] = obj.RestaurantInvoiceCostId;
        obj["mode"] = "cost";
        obj["Title"] = "هزینه";
        obj["TypeId"] = obj.RestaurantCostTypeId;
        obj["Type"] = obj.RestaurantCostType;
        obj["Percent"] = obj.RestaurantCostType.CostPercent;

        newCosts.push(obj);
      });

      let newDiscounts = [];
      restaurantInvoiceDiscounts.forEach((model) => {
        let obj = {};
        for (const key in model) {
          if (model.hasOwnProperty(key)) {
            const element = model[key];
            obj[key] = element;
          }
        }
        console.log("obj > ", obj);

        obj["Id"] = obj.RestaurantInvoiceDiscountId;
        obj["mode"] = "discount";
        obj["Title"] = "تخفیف";
        obj["TypeId"] = obj.RestaurantDiscountTypeId;
        obj["Type"] = obj.RestaurantDiscountType;
        obj["Percent"] = obj.RestaurantDiscountType.DiscountPercent;

        newDiscounts.push(obj);
      });

      setCostDiscounts([...newCosts, ...newDiscounts]);

      console.log("RestaurantInvoiceCost >> ", newCosts);
      console.log("RestaurantInvoiceDiscount >> ", newDiscounts);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantInvoiceCosts, restaurantInvoiceDiscounts]);

    useEffect(() => {
      initRestaurantInvoiceCostDiscount.RestaurantInvoiceId = invoceId;

      setRestaurantInvoiceId(invoceId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoceId]);

    useEffect(() => {
      if (
        !!timing == false ||
        (!!timing &&
          (!!timing.fromDate == false ||
            !!timing.toDate == false ||
            !!timing.days.length == 0))
      )
        return;

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing]);

    const findRestaurantInvoiceCostDiscount = (
      restaurantInvoiceCostDiscountId
    ) => {
      return costDiscounts.filter(
        (restaurantInvoiceCostDiscount) =>
          restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountId ==
          restaurantInvoiceCostDiscountId
      )[0];
    };

    const addRestaurantInvoiceCostDiscount = (
      restaurantInvoiceCostDiscount
    ) => {
      restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountId =
        "temp_" + Math.floor(Math.random() * 100);

      restaurantInvoiceCostDiscount.RestaurantInvoiceId =
        +restaurantInvoiceCostDiscount.RestaurantInvoiceId;

      setCostDiscounts((RestaurantInvoiceCostDiscounts) => [
        ...RestaurantInvoiceCostDiscounts,
        restaurantInvoiceCostDiscount,
      ]);
    };

    const removeRestaurantInvoiceCostDiscount = (
      restaurantInvoiceCostDiscountId
    ) => {
      let restaurantInvoiceCostDiscount = findRestaurantInvoiceCostDiscount(
        restaurantInvoiceCostDiscountId
      );
      restaurantInvoiceCostDiscount["IsDeleted"] = true;
      updateRestaurantInvoiceCostDiscount(restaurantInvoiceCostDiscount);
    };

    const updateRestaurantInvoiceCostDiscount = (
      restaurantInvoiceCostDiscount
    ) => {
      restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountTypeId =
        +restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountTypeId;
      restaurantInvoiceCostDiscount.RestaurantInvoiceId =
        +restaurantInvoiceCostDiscount.RestaurantInvoiceId;

      setCostDiscounts((RestaurantInvoiceCostDiscounts) =>
        RestaurantInvoiceCostDiscounts.map((item) =>
          item.RestaurantInvoiceCostDiscountId ===
          restaurantInvoiceCostDiscount.RestaurantInvoiceCostDiscountId
            ? restaurantInvoiceCostDiscount
            : item
        )
      );
    };

    const value = {
      timing,
      costDiscounts,
      findRestaurantInvoiceCostDiscount,
      addRestaurantInvoiceCostDiscount,
      removeRestaurantInvoiceCostDiscount,
      updateRestaurantInvoiceCostDiscount,
      totalCount,
      setTotalCount,
      actionsLoading,
      restaurantInvoiceId,
      setRestaurantInvoiceId,
      initRestaurantInvoiceCostDiscount,
      invoiceDate,
      personId,
    };

    return (
      <RestaurantInvoiceCostDiscountsUIContext.Provider value={value}>
        {children}
      </RestaurantInvoiceCostDiscountsUIContext.Provider>
    );
  }
);
