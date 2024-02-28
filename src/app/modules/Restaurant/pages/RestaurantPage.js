import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { RestaurantInvoicesPage } from "./RestaurantInvoices/RestaurantInvoicesPage";
import { RestaurantMenuItemsPage } from "./RestaurantMenuItems/RestaurantMenuItemsPage";
import { RestaurantDiscountTypesPage } from "./RestaurantDiscountTypes/RestaurantDiscountTypesPage";

import { RestaurantDashboard } from "../dashboard/RestaurantDashboard";

import { RestaurantInvoiceEdit } from "./RestaurantInvoices/RestaurantInvoice-edit/RestaurantInvoiceEdit";
import { RestaurantMenuItemEdit } from "./RestaurantMenuItems/RestaurantMenuItem-edit/RestaurantMenuItemEdit";
import { RestaurantDiscountTypeEdit } from "./RestaurantDiscountTypes/RestaurantDiscountType-edit/RestaurantDiscountTypeEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/Restaurant"
            to="/Restaurant/dashboard"
          />
        }

        {/* begin RestaurantDashboard */}
        <ContentRoute
          path="/Restaurant/dashboard"
          component={RestaurantDashboard}
        />
        {/* end RestaurantDashboard */}

        {/* begin RestaurantInvoices */}
        <ContentRoute
          path="/Restaurant/RestaurantInvoices/new"
          component={RestaurantInvoiceEdit}
        />
        <ContentRoute
          path="/Restaurant/RestaurantInvoices/:id/edit"
          component={RestaurantInvoiceEdit}
        />
        <ContentRoute
          path="/Restaurant/RestaurantInvoices/:id/show"
          component={RestaurantInvoiceEdit}
        />
        <ContentRoute
          path="/Restaurant/RestaurantInvoices"
          component={RestaurantInvoicesPage}
        />
        {/* end RestaurantInvoices */}

        {/* begin RestaurantMenuItem */}
        <ContentRoute
          path="/Restaurant/restaurantMenuItems/new"
          component={RestaurantMenuItemEdit}
        />
        <ContentRoute
          path="/Restaurant/restaurantMenuItems/:id/edit"
          component={RestaurantMenuItemEdit}
        />
        <ContentRoute
          path="/Restaurant/restaurantMenuItems"
          component={RestaurantMenuItemsPage}
        />
        {/* end RestaurantMenuItem */}

        {/* begin RestaurantDiscountType */}
        <ContentRoute
          path="/Restaurant/RestaurantDiscountTypes/new"
          component={RestaurantDiscountTypeEdit}
        />
        <ContentRoute
          path="/Restaurant/RestaurantDiscountTypes/:id/edit"
          component={RestaurantDiscountTypeEdit}
        />
        <ContentRoute
          path="/Restaurant/RestaurantDiscountTypes"
          component={RestaurantDiscountTypesPage}
        />
        {/* end RestaurantDiscountType */}
      </Switch>
    </Suspense>
  );
}
