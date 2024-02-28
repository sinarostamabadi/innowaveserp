import { Route } from "react-router-dom";
import { DiscountsLoadingDialog } from "./Discounts-loading-dialog/DiscountsLoadingDialog";
import { DiscountDeleteDialog } from "./Discount-delete-dialog/DiscountDeleteDialog";
import { DiscountsCard } from "./DiscountsCard";
import { DiscountsUIProvider } from "./DiscountsUIContext";

export function DiscountsPage({ history }) {
  const discountsUIEvents = {
    newDiscountButtonClick: () => {
      history.push("/BodyBuilding/Discounts/new");
    },
    openEditDiscountPage: (id) => {
      history.push(`/BodyBuilding/Discounts/${id}/edit`);
    },
    openDeleteDiscountDialog: (id) => {
      history.push(`/BodyBuilding/Discounts/${id}/delete`);
    },
    openDeleteDiscountsDialog: () => {
      history.push(`/BodyBuilding/Discounts/deleteDiscounts`);
    },
    openFetchDiscountsDialog: () => {
      history.push(`/BodyBuilding/Discounts/fetch`);
    },
    openUpdateDiscountsStatusDialog: () => {
      history.push("/BodyBuilding/Discounts/updateStatus");
    },
  };

  return (
    <DiscountsUIProvider discountsUIEvents={discountsUIEvents}>
      <DiscountsLoadingDialog />
      <Route path="/BodyBuilding/Discounts/:id/delete">
        {({ history, match }) => (
          <DiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Discounts");
            }}
          />
        )}
      </Route>
      <DiscountsCard />
    </DiscountsUIProvider>
  );
}
