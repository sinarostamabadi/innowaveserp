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
import { initialFilter } from "./RestaurantMenuItemPricesUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const RestaurantMenuItemPricesUIContext = createContext();

export function useRestaurantMenuItemPricesUIContext() {
  return useContext(RestaurantMenuItemPricesUIContext);
}

export const RestaurantMenuItemPricesUIConsumer =
  RestaurantMenuItemPricesUIContext.Consumer;

export const RestaurantMenuItemPricesUIProvider = forwardRef(
  (
    { currentRestaurantMenuItemId, children, restaurantMenuItemPrice, btnRef },
    ref
  ) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            restaurantMenuItemPrices.map((d) => {
              let x = {
                RestaurantMenuItemPriceId:
                  d.RestaurantMenuItemPriceId.toString().indexOf("temp") > -1
                    ? null
                    : +d.RestaurantMenuItemPriceId,
                Price: d.Price,
                ActiveDate: d.ActiveDate,
                IsDeleted: d.IsDeleted,
              };

              return x;
            })
          );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [restaurantMenuItemId, setRestaurantMenuItemId] = useState(
      currentRestaurantMenuItemId
    );

    const initRestaurantMenuItemPrice = {
      RestaurantMenuItemPriceId: "",
      RestaurantMenuItemId: restaurantMenuItemId,
      Price: "",
      ActiveDate: "",
      ActiveDateObj: "",
      IsDeleted: false,
    };

    const { actionsLoading, restaurantMenuItemForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.restaurantMenuItems.actionsLoading,
        restaurantMenuItemForEdit:
          state.restaurantMenuItems.restaurantMenuItemForEdit,
        error: state.restaurantMenuItems.error,
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

    const [restaurantMenuItemPrices, setRestaurantMenuItemPrices] = useState(
      restaurantMenuItemPrice
    );
    const [activeRestaurantMenuItemPrices, setActiveRestaurantMenuItemPrices] =
      useState(restaurantMenuItemPrice);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setRestaurantMenuItemPrices(
        !!restaurantMenuItemForEdit &&
          !!restaurantMenuItemForEdit.RestaurantMenuItemPrices &&
          restaurantMenuItemForEdit.RestaurantMenuItemPrices.length > 0
          ? restaurantMenuItemForEdit.RestaurantMenuItemPrices
          : []
      );
      setTotalCount(
        !!restaurantMenuItemForEdit &&
          !!restaurantMenuItemForEdit.RestaurantMenuItemPrices &&
          restaurantMenuItemForEdit.RestaurantMenuItemPrices.length > 0
          ? restaurantMenuItemForEdit.RestaurantMenuItemPrices.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantMenuItemForEdit]);

    useEffect(() => {
      initRestaurantMenuItemPrice.RestaurantMenuItemId =
        currentRestaurantMenuItemId;

      setRestaurantMenuItemId(currentRestaurantMenuItemId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRestaurantMenuItemId]);

    useEffect(() => {
      setActiveRestaurantMenuItemPrices(
        restaurantMenuItemPrices.filter((x) => x.IsDeleted == false)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantMenuItemPrices]);

    // Edit Dialog, New Dialog
    const [
      showEditRestaurantMenuItemPriceDialog,
      setShowEditRestaurantMenuItemPriceDialog,
    ] = useState(false);
    const openNewRestaurantMenuItemPriceDialog = () => {
      setSelectedId(undefined);
      setShowEditRestaurantMenuItemPriceDialog(true);
    };
    const openEditRestaurantMenuItemPriceDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findRestaurantMenuItemPrice(id));
      setShowEditRestaurantMenuItemPriceDialog(true);
    };
    const closeEditRestaurantMenuItemPriceDialog = () => {
      setSelectedId(undefined);
      setShowEditRestaurantMenuItemPriceDialog(false);
    };

    const [
      showDeleteRestaurantMenuItemPriceDialog,
      setShowDeleteRestaurantMenuItemPriceDialog,
    ] = useState(false);
    const openDeleteRestaurantMenuItemPriceDialog = (id) => {
      setSelectedId(id);
      setShowDeleteRestaurantMenuItemPriceDialog(true);
    };
    const closeDeleteRestaurantMenuItemPriceDialog = () => {
      setSelectedId(undefined);
      setShowDeleteRestaurantMenuItemPriceDialog(false);
    };

    const [
      showDeleteRestaurantMenuItemPricesDialog,
      setShowDeleteRestaurantMenuItemPricesDialog,
    ] = useState(false);
    const openDeleteRestaurantMenuItemPricesDialog = () => {
      setShowDeleteRestaurantMenuItemPricesDialog(true);
    };
    const closeDeleteRestaurantMenuItemPricesDialog = () => {
      setShowDeleteRestaurantMenuItemPricesDialog(false);
    };

    const [
      showFetchRestaurantMenuItemPricesDialog,
      setShowFetchRestaurantMenuItemPricesDialog,
    ] = useState(false);
    const openFetchRestaurantMenuItemPricesDialog = () => {
      setShowFetchRestaurantMenuItemPricesDialog(true);
    };
    const closeFetchRestaurantMenuItemPricesDialog = () => {
      setShowFetchRestaurantMenuItemPricesDialog(false);
    };

    const findRestaurantMenuItemPrice = (restaurantMenuItemPriceId) => {
      if (!!restaurantMenuItemPriceId == false) return;

      const restaurantMenuItemPriceObj = restaurantMenuItemPrices.filter(
        (restaurantMenuItemPrice) =>
          restaurantMenuItemPrice.RestaurantMenuItemPriceId ==
          restaurantMenuItemPriceId
      )[0];

      return {
        RestaurantMenuItemPriceId:
          restaurantMenuItemPriceObj.RestaurantMenuItemPriceId,
        RestaurantMenuItemId: restaurantMenuItemPriceObj.RestaurantMenuItemId,
        RestaurantMenuItem: restaurantMenuItemPriceObj.RestaurantMenuItem,
        Price: restaurantMenuItemPriceObj.Price,
        ActiveDate: restaurantMenuItemPriceObj.ActiveDate,
        ActiveDateObj: EnToFaObjDate(restaurantMenuItemPriceObj.ActiveDate),
        IsDeleted: false,
      };
    };

    const addRestaurantMenuItemPrice = (restaurantMenuItemPrice) => {
      restaurantMenuItemPrice.RestaurantMenuItemPriceId =
        "temp_" + Math.floor(Math.random() * 100);

      setRestaurantMenuItemPrices((restaurantMenuItemPrices) => [
        ...restaurantMenuItemPrices,
        restaurantMenuItemPrice,
      ]);
    };

    const removeRestaurantMenuItemPrice = (restaurantMenuItemPriceId) => {
      if (restaurantMenuItemPriceId.toString().indexOf("temp_") > -1)
        setRestaurantMenuItemPrices(
          restaurantMenuItemPrices.filter(
            (x) => x.RestaurantMenuItemPriceId != restaurantMenuItemPriceId
          )
        );
      else {
        let restaurantMenuItemPrice = findRestaurantMenuItemPrice(
          restaurantMenuItemPriceId
        );
        restaurantMenuItemPrice["IsDeleted"] = true;
        updateRestaurantMenuItemPrice(restaurantMenuItemPrice);
      }
    };

    const updateRestaurantMenuItemPrice = (restaurantMenuItemPrice) => {
      console.log("restaurantMenuItemPrice > ", restaurantMenuItemPrice);
      setRestaurantMenuItemPrices((restaurantMenuItemPrices) =>
        restaurantMenuItemPrices.map((item) =>
          item.RestaurantMenuItemPriceId ==
          restaurantMenuItemPrice.RestaurantMenuItemPriceId
            ? restaurantMenuItemPrice
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(restaurantMenuItemPrice);
      }, 200);
    };

    const value = {
      restaurantMenuItemPrices,
      activeRestaurantMenuItemPrices,
      totalCount,
      setTotalCount,
      findRestaurantMenuItemPrice,
      addRestaurantMenuItemPrice,
      removeRestaurantMenuItemPrice,
      updateRestaurantMenuItemPrice,
      actionsLoading,
      restaurantMenuItemId,
      setRestaurantMenuItemId,
      initRestaurantMenuItemPrice,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditRestaurantMenuItemPriceDialog,
      openEditRestaurantMenuItemPriceDialog,
      openNewRestaurantMenuItemPriceDialog,
      closeEditRestaurantMenuItemPriceDialog,
      // Delete
      showDeleteRestaurantMenuItemPriceDialog,
      openDeleteRestaurantMenuItemPriceDialog,
      closeDeleteRestaurantMenuItemPriceDialog,
      // Deletes
      showDeleteRestaurantMenuItemPricesDialog,
      openDeleteRestaurantMenuItemPricesDialog,
      closeDeleteRestaurantMenuItemPricesDialog,
      // Fetch
      showFetchRestaurantMenuItemPricesDialog,
      openFetchRestaurantMenuItemPricesDialog,
      closeFetchRestaurantMenuItemPricesDialog,
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
        <RestaurantMenuItemPricesUIContext.Provider value={value}>
          {children}
        </RestaurantMenuItemPricesUIContext.Provider>
      </>
    );
  }
);
