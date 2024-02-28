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
import { initialFilter } from "./RestaurantMenuItemIngredientsUIHelper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnToFaObjDate } from "../../../../../../core/_helpers";
import { useTranslation } from "react-i18next";
import { Alerty } from "../../../../../../core/_partials/controls";

const RestaurantMenuItemIngredientsUIContext = createContext();

export function useRestaurantMenuItemIngredientsUIContext() {
  return useContext(RestaurantMenuItemIngredientsUIContext);
}

export const RestaurantMenuItemIngredientsUIConsumer =
  RestaurantMenuItemIngredientsUIContext.Consumer;

export const RestaurantMenuItemIngredientsUIProvider = forwardRef(
  (
    {
      currentRestaurantMenuItemId,
      children,
      restaurantMenuItemIngredient,
      btnRef,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [serialErrors, setSerialErrors] = useState("");

    useImperativeHandle(ref, () => ({
      Collect(fn) {
        !!serialErrors == false &&
          fn(
            restaurantMenuItemIngredients.map((d) => {
              let x = {
                RestaurantMenuItemIngredientId:
                  d.RestaurantMenuItemIngredientId.toString().indexOf("temp") >
                  -1
                    ? null
                    : +d.RestaurantMenuItemIngredientId,
                ProductGroupId: d.ProductGroupId,
                UnitId: d.UnitId,
                Amount: +d.Amount,
                Description: d.Description,
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

    const initRestaurantMenuItemIngredient = {
      RestaurantMenuItemIngredientId: "",
      RestaurantMenuItemId: restaurantMenuItemId,
      ProductGroupId: "",
      UnitId: "",
      Amount: "",
      Description: "",
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

    const [restaurantMenuItemIngredients, setRestaurantMenuItemIngredients] =
      useState(restaurantMenuItemIngredient);
    const [
      activeRestaurantMenuItemIngredients,
      setActiveRestaurantMenuItemIngredients,
    ] = useState(restaurantMenuItemIngredient);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setRestaurantMenuItemIngredients(
        !!restaurantMenuItemForEdit &&
          !!restaurantMenuItemForEdit.RestaurantMenuItemIngredients &&
          restaurantMenuItemForEdit.RestaurantMenuItemIngredients.length > 0
          ? restaurantMenuItemForEdit.RestaurantMenuItemIngredients
          : []
      );
      setTotalCount(
        !!restaurantMenuItemForEdit &&
          !!restaurantMenuItemForEdit.RestaurantMenuItemIngredients &&
          restaurantMenuItemForEdit.RestaurantMenuItemIngredients.length > 0
          ? restaurantMenuItemForEdit.RestaurantMenuItemIngredients.length
          : 0
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantMenuItemForEdit]);

    useEffect(() => {
      initRestaurantMenuItemIngredient.RestaurantMenuItemId =
        currentRestaurantMenuItemId;

      setRestaurantMenuItemId(currentRestaurantMenuItemId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRestaurantMenuItemId]);

    useEffect(() => {
      setActiveRestaurantMenuItemIngredients(
        restaurantMenuItemIngredients.filter((x) => x.IsDeleted == false)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantMenuItemIngredients]);

    // Edit Dialog, New Dialog
    const [
      showEditRestaurantMenuItemIngredientDialog,
      setShowEditRestaurantMenuItemIngredientDialog,
    ] = useState(false);
    const openNewRestaurantMenuItemIngredientDialog = () => {
      setSelectedId(undefined);
      setShowEditRestaurantMenuItemIngredientDialog(true);
    };
    const openEditRestaurantMenuItemIngredientDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findRestaurantMenuItemIngredient(id));
      setShowEditRestaurantMenuItemIngredientDialog(true);
    };
    const closeEditRestaurantMenuItemIngredientDialog = () => {
      setSelectedId(undefined);
      setShowEditRestaurantMenuItemIngredientDialog(false);
    };

    const [
      showDeleteRestaurantMenuItemIngredientDialog,
      setShowDeleteRestaurantMenuItemIngredientDialog,
    ] = useState(false);
    const openDeleteRestaurantMenuItemIngredientDialog = (id) => {
      setSelectedId(id);
      setShowDeleteRestaurantMenuItemIngredientDialog(true);
    };
    const closeDeleteRestaurantMenuItemIngredientDialog = () => {
      setSelectedId(undefined);
      setShowDeleteRestaurantMenuItemIngredientDialog(false);
    };

    const [
      showDeleteRestaurantMenuItemIngredientsDialog,
      setShowDeleteRestaurantMenuItemIngredientsDialog,
    ] = useState(false);
    const openDeleteRestaurantMenuItemIngredientsDialog = () => {
      setShowDeleteRestaurantMenuItemIngredientsDialog(true);
    };
    const closeDeleteRestaurantMenuItemIngredientsDialog = () => {
      setShowDeleteRestaurantMenuItemIngredientsDialog(false);
    };

    const [
      showFetchRestaurantMenuItemIngredientsDialog,
      setShowFetchRestaurantMenuItemIngredientsDialog,
    ] = useState(false);
    const openFetchRestaurantMenuItemIngredientsDialog = () => {
      setShowFetchRestaurantMenuItemIngredientsDialog(true);
    };
    const closeFetchRestaurantMenuItemIngredientsDialog = () => {
      setShowFetchRestaurantMenuItemIngredientsDialog(false);
    };

    const findRestaurantMenuItemIngredient = (
      restaurantMenuItemIngredientId
    ) => {
      if (!!restaurantMenuItemIngredientId == false) return;

      const restaurantMenuItemIngredientObj =
        restaurantMenuItemIngredients.filter(
          (restaurantMenuItemIngredient) =>
            restaurantMenuItemIngredient.RestaurantMenuItemIngredientId ==
            restaurantMenuItemIngredientId
        )[0];

      return {
        RestaurantMenuItemIngredientId:
          restaurantMenuItemIngredientObj.RestaurantMenuItemIngredientId,
        RestaurantMenuItemId:
          restaurantMenuItemIngredientObj.RestaurantMenuItemId,
        RestaurantMenuItem: restaurantMenuItemIngredientObj.RestaurantMenuItem,
        ProductGroupId: restaurantMenuItemIngredientObj.ProductGroupId,
        ProductGroup: restaurantMenuItemIngredientObj.ProductGroup,
        UnitId: restaurantMenuItemIngredientObj.UnitId,
        Unit: restaurantMenuItemIngredientObj.Unit,
        Amount: restaurantMenuItemIngredientObj.Amount,
        Description: restaurantMenuItemIngredientObj.Description,
        IsDeleted: false,
      };
    };

    const addRestaurantMenuItemIngredient = (restaurantMenuItemIngredient) => {
      restaurantMenuItemIngredient.RestaurantMenuItemIngredientId =
        "temp_" + Math.floor(Math.random() * 100);

      setRestaurantMenuItemIngredients((restaurantMenuItemIngredients) => [
        ...restaurantMenuItemIngredients,
        restaurantMenuItemIngredient,
      ]);
    };

    const removeRestaurantMenuItemIngredient = (
      restaurantMenuItemIngredientId
    ) => {
      if (restaurantMenuItemIngredientId.toString().indexOf("temp_") > -1)
        setRestaurantMenuItemIngredients(
          restaurantMenuItemIngredients.filter(
            (x) =>
              x.RestaurantMenuItemIngredientId != restaurantMenuItemIngredientId
          )
        );
      else {
        let restaurantMenuItemIngredient = findRestaurantMenuItemIngredient(
          restaurantMenuItemIngredientId
        );
        restaurantMenuItemIngredient["IsDeleted"] = true;
        updateRestaurantMenuItemIngredient(restaurantMenuItemIngredient);
      }
    };

    const updateRestaurantMenuItemIngredient = (
      restaurantMenuItemIngredient
    ) => {
      setRestaurantMenuItemIngredients((restaurantMenuItemIngredients) =>
        restaurantMenuItemIngredients.map((item) =>
          item.RestaurantMenuItemIngredientId ==
          restaurantMenuItemIngredient.RestaurantMenuItemIngredientId
            ? restaurantMenuItemIngredient
            : item
        )
      );

      setTimeout(() => {
        setSelectedItem(restaurantMenuItemIngredient);
      }, 200);
    };

    const value = {
      restaurantMenuItemIngredients,
      activeRestaurantMenuItemIngredients,
      totalCount,
      setTotalCount,
      findRestaurantMenuItemIngredient,
      addRestaurantMenuItemIngredient,
      removeRestaurantMenuItemIngredient,
      updateRestaurantMenuItemIngredient,
      actionsLoading,
      restaurantMenuItemId,
      setRestaurantMenuItemId,
      initRestaurantMenuItemIngredient,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      // Edit
      showEditRestaurantMenuItemIngredientDialog,
      openEditRestaurantMenuItemIngredientDialog,
      openNewRestaurantMenuItemIngredientDialog,
      closeEditRestaurantMenuItemIngredientDialog,
      // Delete
      showDeleteRestaurantMenuItemIngredientDialog,
      openDeleteRestaurantMenuItemIngredientDialog,
      closeDeleteRestaurantMenuItemIngredientDialog,
      // Deletes
      showDeleteRestaurantMenuItemIngredientsDialog,
      openDeleteRestaurantMenuItemIngredientsDialog,
      closeDeleteRestaurantMenuItemIngredientsDialog,
      // Fetch
      showFetchRestaurantMenuItemIngredientsDialog,
      openFetchRestaurantMenuItemIngredientsDialog,
      closeFetchRestaurantMenuItemIngredientsDialog,
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
        <RestaurantMenuItemIngredientsUIContext.Provider value={value}>
          {children}
        </RestaurantMenuItemIngredientsUIContext.Provider>
      </>
    );
  }
);
