import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { FutsalCentersPage } from "./futsalCenters/FutsalCentersPage";
import { FutsalDiscountsPage } from "./futsalDiscounts/FutsalDiscountsPage";
import { FutsalReservesPage } from "./futsalReserves/FutsalReservesPage";
import { FutsalReserveDatesPage } from "./futsalReserveDates/FutsalReserveDatesPage";
import { FutsalReservePricesPage } from "./futsalReservePrices/FutsalReservePricesPage";
import { FutsalReserveTypesPage } from "./futsalReserveTypes/FutsalReserveTypesPage";
import { FutsalTimePriceingPage } from "./futsalTimePriceing/FutsalTimePriceingPage";
import { FutsalTimingPage } from "./futsalTiming/FutsalTimingPage";

import { FutsalDashboard } from "../dashboard/FutsalDashboard";

import { FutsalCenterEdit } from "./futsalCenters/futsalCenter-edit/FutsalCenterEdit";
import { FutsalDiscountEdit } from "./futsalDiscounts/futsalDiscount-edit/FutsalDiscountEdit";
import { FutsalReserveEdit } from "./futsalReserves/futsalReserve-edit/FutsalReserveEdit";
import { FutsalReserveDateEdit } from "./futsalReserveDates/futsalReserveDate-edit/FutsalReserveDateEdit";
import { FutsalReservePriceEdit } from "./futsalReservePrices/futsalReservePrice-edit/FutsalReservePriceEdit";
import { FutsalReserveTypeEdit } from "./futsalReserveTypes/futsalReserveType-edit/FutsalReserveTypeEdit";
import { FutsalTimePriceingEdit } from "./futsalTimePriceing/futsalTimePriceing-edit/FutsalTimePriceingEdit";
import { FutsalTimingEdit } from "./futsalTiming/futsalTiming-edit/FutsalTimingEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Futsal" to="/Futsal/dashboard" />}

        {/* begin FutsalDashboard */}
        <ContentRoute path="/Futsal/dashboard" component={FutsalDashboard} />
        {/* end FutsalDashboard */}

        {/* begin FutsalCenters */}
        <ContentRoute
          path="/Futsal/futsalCenters/new"
          component={FutsalCenterEdit}
        />
        <ContentRoute
          path="/Futsal/futsalCenters/:id/edit"
          component={FutsalCenterEdit}
        />
        <ContentRoute
          path="/Futsal/futsalCenters"
          component={FutsalCentersPage}
        />
        {/* end FutsalCenters */}

        {/* begin FutsalDiscounts */}
        <ContentRoute
          path="/Futsal/futsalDiscounts/new"
          component={FutsalDiscountEdit}
        />
        <ContentRoute
          path="/Futsal/futsalDiscounts/:id/edit"
          component={FutsalDiscountEdit}
        />
        <ContentRoute
          path="/Futsal/futsalDiscounts"
          component={FutsalDiscountsPage}
        />
        {/* end FutsalDiscounts */}

        {/* begin FutsalReserves */}
        <ContentRoute
          path="/Futsal/futsalReserves/new"
          component={FutsalReserveEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserves/:id/edit"
          component={FutsalReserveEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserves"
          component={FutsalReservesPage}
        />
        {/* end FutsalReserves */}

        {/* begin FutsalReserveDates */}
        <ContentRoute
          path="/Futsal/futsalReserveDates/new"
          component={FutsalReserveDateEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserveDates/:id/edit"
          component={FutsalReserveDateEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserveDates"
          component={FutsalReserveDatesPage}
        />
        {/* end FutsalReserveDates */}

        {/* begin FutsalReservePrices */}
        <ContentRoute
          path="/Futsal/futsalReservePrices/new"
          component={FutsalReservePriceEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReservePrices/:id/edit"
          component={FutsalReservePriceEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReservePrices"
          component={FutsalReservePricesPage}
        />
        {/* end FutsalReservePrices */}

        {/* begin FutsalReserveTypes */}
        <ContentRoute
          path="/Futsal/futsalReserveTypes/new"
          component={FutsalReserveTypeEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserveTypes/:id/edit"
          component={FutsalReserveTypeEdit}
        />
        <ContentRoute
          path="/Futsal/futsalReserveTypes"
          component={FutsalReserveTypesPage}
        />
        {/* end FutsalReserveTypes */}

        {/* begin FutsalTimePriceing */}
        <ContentRoute
          path="/Futsal/futsalTimePriceing/new"
          component={FutsalTimePriceingEdit}
        />
        <ContentRoute
          path="/Futsal/futsalTimePriceing/:id/edit"
          component={FutsalTimePriceingEdit}
        />
        <ContentRoute
          path="/Futsal/futsalTimePriceing"
          component={FutsalTimePriceingPage}
        />
        {/* end FutsalTimePriceing */}

        {/* begin FutsalTiming */}
        <ContentRoute
          path="/Futsal/futsalTiming/new"
          component={FutsalTimingEdit}
        />
        <ContentRoute
          path="/Futsal/futsalTiming/:id/edit"
          component={FutsalTimingEdit}
        />
        <ContentRoute
          path="/Futsal/futsalTiming"
          component={FutsalTimingPage}
        />
        {/* end FutsalTiming */}
      </Switch>
    </Suspense>
  );
}
