import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingDiscountsLoadingDialog } from "./bodyBuildingDiscounts-loading-dialog/BodyBuildingDiscountsLoadingDialog";
import { BodyBuildingDiscountDeleteDialog } from "./bodyBuildingDiscount-delete-dialog/BodyBuildingDiscountDeleteDialog";
import { BodyBuildingDiscountsCard } from "./BodyBuildingDiscountsCard";
import { BodyBuildingDiscountsUIProvider } from "./BodyBuildingDiscountsUIContext";

export function BodyBuildingDiscountsPage({ history }) {
  const bodyBuildingDiscountsUIEvents = {
    newBodyBuildingDiscountButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingDiscounts/new");
    },
    openEditBodyBuildingDiscountPage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingDiscounts/${id}/edit`);
    },
    openDeleteBodyBuildingDiscountDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingDiscounts/${id}/delete`);
    },
    openDeleteBodyBuildingDiscountsDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingDiscounts/deleteBodyBuildingDiscounts`);
    },
    openFetchBodyBuildingDiscountsDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingDiscounts/fetch`);
    },
    openUpdateBodyBuildingDiscountsStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingDiscounts/updateStatus");
    },
  };
  
  return (
    <BodyBuildingDiscountsUIProvider bodyBuildingDiscountsUIEvents={bodyBuildingDiscountsUIEvents}>
      <BodyBuildingDiscountsLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingDiscounts/:id/delete">
        {({ history, match }) => (
          <BodyBuildingDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingDiscounts");
            }}
          />
        )}
      </Route>
      <BodyBuildingDiscountsCard />
    </BodyBuildingDiscountsUIProvider>
  );
}