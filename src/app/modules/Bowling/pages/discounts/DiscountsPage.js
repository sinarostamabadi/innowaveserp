
import { Route } from "react-router-dom";
import { DiscountsLoadingDialog } from "./discounts-loading-dialog/DiscountsLoadingDialog";
import { DiscountDeleteDialog } from "./discount-delete-dialog/DiscountDeleteDialog";
import { DiscountsCard } from "./DiscountsCard";
import { DiscountsUIProvider } from "./DiscountsUIContext";

export function DiscountsPage({ history }) {
  const discountsUIEvents = {
    newDiscountButtonClick: () => {
      history.push("/bowling/discount/new");
    },
    openEditDiscountPage: (id) => {
      history.push(`/bowling/discount/${id}/edit`);
    },
    openDeleteDiscountDialog: (id) => {
      history.push(`/bowling/discount/${id}/delete`);
    },
    openDeleteDiscountsDialog: () => {
      history.push(`/bowling/discount/deleteDiscounts`);
    },
    openFetchDiscountsDialog: () => {
      history.push(`/bowling/discount/fetch`);
    },
    openUpdateDiscountsStatusDialog: () => {
      history.push("/bowling/discount/updateStatus");
    },
  };

  
  return (
    <DiscountsUIProvider discountsUIEvents={discountsUIEvents}>
      
      <DiscountsLoadingDialog />
      <Route path="/bowling/discount/:id/delete">
        {({ history, match }) => (
          <DiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/discount");
            }}
          />
        )}
      </Route>
      <DiscountsCard />
    </DiscountsUIProvider>
  );
}