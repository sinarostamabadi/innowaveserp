import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { PoolCentersPage } from "./poolCenters/PoolCentersPage";
import { PoolDiscountsPage } from "./poolDiscounts/PoolDiscountsPage";
import { PoolReservesPage } from "./poolReserves/PoolReservesPage";
import { PoolReservePricesPage } from "./poolReservePrices/PoolReservePricesPage";
import { PoolTimePriceingPage } from "./poolTimePriceing/PoolTimePriceingPage";

import { PoolDashboard } from "../dashboard/PoolDashboard";

import { PoolCenterEdit } from "./poolCenters/poolCenter-edit/PoolCenterEdit";
import { PoolDiscountEdit } from "./poolDiscounts/poolDiscount-edit/PoolDiscountEdit";
import { PoolReserveEdit } from "./poolReserves/poolReserve-edit/PoolReserveEdit";
import { PoolReservePriceEdit } from "./poolReservePrices/poolReservePrice-edit/PoolReservePriceEdit";
import { PoolTimePriceingEdit } from "./poolTimePriceing/poolTimePriceing-edit/PoolTimePriceingEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Pool" to="/Pool/dashboard" />}

        {/* begin PoolDashboard */}
        <ContentRoute path="/Pool/dashboard" component={PoolDashboard} />
        {/* end PoolDashboard */}

        {/* begin PoolCenters */}
        <ContentRoute path="/Pool/poolCenters/new" component={PoolCenterEdit} />
        <ContentRoute
          path="/Pool/poolCenters/:id/edit"
          component={PoolCenterEdit}
        />
        <ContentRoute path="/Pool/poolCenters" component={PoolCentersPage} />
        {/* end PoolCenters */}

        {/* begin PoolDiscounts */}
        <ContentRoute
          path="/Pool/poolDiscounts/new"
          component={PoolDiscountEdit}
        />
        <ContentRoute
          path="/Pool/poolDiscounts/:id/edit"
          component={PoolDiscountEdit}
        />
        <ContentRoute
          path="/Pool/poolDiscounts"
          component={PoolDiscountsPage}
        />
        {/* end PoolDiscounts */}

        {/* begin PoolReserves */}
        <ContentRoute
          path="/Pool/poolReserves/new"
          component={PoolReserveEdit}
        />
        <ContentRoute
          path="/Pool/poolReserves/:id/edit"
          component={PoolReserveEdit}
        />
        <ContentRoute path="/Pool/poolReserves" component={PoolReservesPage} />
        {/* end PoolReserves */}

        {/* begin PoolReservePrices */}
        <ContentRoute
          path="/Pool/poolReservePrices/new"
          component={PoolReservePriceEdit}
        />
        <ContentRoute
          path="/Pool/poolReservePrices/:id/edit"
          component={PoolReservePriceEdit}
        />
        <ContentRoute
          path="/Pool/poolReservePrices"
          component={PoolReservePricesPage}
        />
        {/* end PoolReservePrices */}

        {/* begin PoolTimePriceing */}
        <ContentRoute
          path="/Pool/poolTimePriceing/new"
          component={PoolTimePriceingEdit}
        />
        <ContentRoute
          path="/Pool/poolTimePriceing/:id/edit"
          component={PoolTimePriceingEdit}
        />
        <ContentRoute
          path="/Pool/poolTimePriceing"
          component={PoolTimePriceingPage}
        />
        {/* end PoolTimePriceing */}
      </Switch>
    </Suspense>
  );
}
