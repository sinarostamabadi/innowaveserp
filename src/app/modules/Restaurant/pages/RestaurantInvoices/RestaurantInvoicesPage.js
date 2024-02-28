import React from "react";
import { Route } from "react-router-dom";

import { RestaurantInvoicesLoadingDialog } from "./RestaurantInvoices-loading-dialog/RestaurantInvoicesLoadingDialog";
import { RestaurantInvoiceDeleteDialog } from "./RestaurantInvoice-delete-dialog/RestaurantInvoiceDeleteDialog";
import { RestaurantInvoicesCard } from "./RestaurantInvoicesCard";
import { RestaurantInvoicesUIProvider } from "./RestaurantInvoicesUIContext";

import { RestaurantInvoiceCheckout } from "./RestaurantInvoice-checkout/RestaurantInvoiceCheckout";
import { RestaurantInvoiceDelivery } from "./RestaurantInvoice-delivery/RestaurantInvoiceDelivery";
import { RestaurantInvoiceRelocation } from "./RestaurantInvoice-relocation/RestaurantInvoiceRelocation";
import { RestaurantInvoiceRelease } from "./RestaurantInvoice-release/RestaurantInvoiceRelease";
import { RestaurantInvoiceCancelOrder } from "./RestaurantInvoice-cancelOrder/RestaurantInvoiceCancelOrder";
import { RestaurantInvoiceCancelAndReorder } from "./RestaurantInvoice-cancelAndReorder/RestaurantInvoiceCancelAndReorder";

import { RestaurantInvoiceReport } from "./RestaurantInvoice-report/RestaurantInvoiceReport";

export function RestaurantInvoicesPage({ history }) {
  const restaurantInvoicesUIEvents = {
    newClick: () => {
      history.push("/restaurant/restaurantInvoices/new");
    },
    openEditPage: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/edit`);
    },
    openDeleteDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/delete`);
    },
    openCheckoutDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/checkout`);
    },
    openDeliveryDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/delivery`);
    },
    openrelocationDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/relocation`);
    },
    openReleaseDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/release`);
    },
    openCancelOrderDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/cancelOrder`);
    },
    openCancelAndReorderDialog: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/cancelAndReorder`);
    },
    openDisplayPage: (id) => {
      history.push(`/restaurant/restaurantInvoices/${id}/show`);
    },
  };

  return (
    <RestaurantInvoicesUIProvider
      restaurantInvoicesUIEvents={restaurantInvoicesUIEvents}
    >
      <RestaurantInvoiceReport />
      <RestaurantInvoicesLoadingDialog />
      <Route path="/restaurant/restaurantInvoices/:id/delete">
        {({ history, match }) => (
          <RestaurantInvoiceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/checkout">
        {({ history, match }) => (
          <RestaurantInvoiceCheckout
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/delivery">
        {({ history, match }) => (
          <RestaurantInvoiceDelivery
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/relocation">
        {({ history, match }) => (
          <RestaurantInvoiceRelocation
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/release">
        {({ history, match }) => (
          <RestaurantInvoiceRelease
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/cancelOrder">
        {({ history, match }) => (
          <RestaurantInvoiceCancelOrder
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoices");
            }}
          />
        )}
      </Route>

      <Route path="/restaurant/restaurantInvoices/:id/cancelAndReorder">
        {({ history, match }) => (
          <RestaurantInvoiceCancelAndReorder
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              !!match &&
                !!match.params.id &&
                history.push(
                  `/restaurant/restaurantInvoices/${match.params.id}/edit`
                );
            }}
          />
        )}
      </Route>
      <RestaurantInvoicesCard />
    </RestaurantInvoicesUIProvider>
  );
}
