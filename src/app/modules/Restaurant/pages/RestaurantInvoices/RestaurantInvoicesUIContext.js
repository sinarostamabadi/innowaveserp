import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantInvoiceModel } from "../../../../../core/_models/Restaurant/RestaurantInvoiceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { getStorage } from "../../../../../core/_helpers";

const RestaurantInvoicesUIContext = createContext();

export function useRestaurantInvoicesUIContext() {
  return useContext(RestaurantInvoicesUIContext);
}

export const RestaurantInvoicesUIConsumer =
  RestaurantInvoicesUIContext.Consumer;

export function RestaurantInvoicesUIProvider({
  restaurantInvoicesUIEvents,
  children,
}) {
  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;
  const defaultRestaurantFilter = {
    Property: "RestaurantId",
    Operation: 5,
    Values: [!!defaultRestaurant ? defaultRestaurant.RestaurantId : null],
  };
  const defaultFilter = {
    Property: "RestaurantInvoiceStatusId",
    Operation: 5,
    Values: ["1", "2", "4"],
  };

  const [queryParams, setQueryParamsBase] = useState(
    !!defaultRestaurant
      ? {
          ...getConfig(RestaurantInvoiceModel, "InvoiceNumber", "desc")
            .initialFilter,
          Filters: [defaultFilter, defaultRestaurantFilter],
        }
      : {
          ...getConfig(RestaurantInvoiceModel, "InvoiceNumber", "desc")
            .initialFilter,
          Filters: [defaultFilter],
        }
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

  const [showReportDialog, setShowReportDialog] = useState(false);
  const openReportDialog = () => {
    setShowReportDialog(true);
  };
  const closeReportDialog = () => {
    setShowReportDialog(false);
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    dataModel: RestaurantInvoiceModel,
    newClick: restaurantInvoicesUIEvents.newClick,
    openDisplayPage: restaurantInvoicesUIEvents.openDisplayPage,
    openEditPage: restaurantInvoicesUIEvents.openEditPage,
    openDeleteDialog: restaurantInvoicesUIEvents.openDeleteDialog,
    openCheckoutDialog: restaurantInvoicesUIEvents.openCheckoutDialog,
    openDeliveryDialog: restaurantInvoicesUIEvents.openDeliveryDialog,
    openrelocationDialog: restaurantInvoicesUIEvents.openrelocationDialog,
    openReleaseDialog: restaurantInvoicesUIEvents.openReleaseDialog,
    openCancelOrderDialog: restaurantInvoicesUIEvents.openCancelOrderDialog,
    openCancelAndReorderDialog:
      restaurantInvoicesUIEvents.openCancelAndReorderDialog,
    showReportDialog,
    openReportDialog,
    closeReportDialog,
  };
  return (
    <RestaurantInvoicesUIContext.Provider value={value}>
      {children}
    </RestaurantInvoicesUIContext.Provider>
  );
}
