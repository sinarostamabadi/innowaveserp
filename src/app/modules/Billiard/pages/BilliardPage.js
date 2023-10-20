
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { BilliardCentersPage } from "./billiardCenters/BilliardCentersPage";
import { BilliardDiscountsPage } from "./billiardDiscounts/BilliardDiscountsPage";
import { BilliardReservesPage } from "./billiardReserves/BilliardReservesPage";
import { BilliardReservePricesPage } from "./billiardReservePrices/BilliardReservePricesPage";
import { BilliardTimePriceingPage } from "./billiardTimePriceing/BilliardTimePriceingPage";

import { BilliardDashboard } from "../dashboard/BilliardDashboard";

import { BilliardCenterEdit } from "./billiardCenters/billiardCenter-edit/BilliardCenterEdit";
import { BilliardDiscountEdit } from "./billiardDiscounts/billiardDiscount-edit/BilliardDiscountEdit";
import { BilliardReserveEdit } from "./billiardReserves/billiardReserve-edit/BilliardReserveEdit";
import { BilliardReservePriceEdit } from "./billiardReservePrices/billiardReservePrice-edit/BilliardReservePriceEdit";
import { BilliardTimePriceingEdit } from "./billiardTimePriceing/billiardTimePriceing-edit/BilliardTimePriceingEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Billiard" to="/Billiard/dashboard" />}
        
        {/* begin BilliardDashboard */}
        <ContentRoute path="/Billiard/dashboard" component={BilliardDashboard} />
        {/* end BilliardDashboard */}  
		

			{/* begin BilliardCenters */}
			<ContentRoute path="/Billiard/billiardCenters/new" component={BilliardCenterEdit} />
			<ContentRoute path="/Billiard/billiardCenters/:id/edit" component={BilliardCenterEdit} />
			<ContentRoute path="/Billiard/billiardCenters" component={BilliardCentersPage} />
			{/* end BilliardCenters */}

			{/* begin BilliardDiscounts */}
			<ContentRoute path="/Billiard/billiardDiscounts/new" component={BilliardDiscountEdit} />
			<ContentRoute path="/Billiard/billiardDiscounts/:id/edit" component={BilliardDiscountEdit} />
			<ContentRoute path="/Billiard/billiardDiscounts" component={BilliardDiscountsPage} />
			{/* end BilliardDiscounts */}

			{/* begin BilliardReserves */}
			<ContentRoute path="/Billiard/billiardReserves/new" component={BilliardReserveEdit} />
			<ContentRoute path="/Billiard/billiardReserves/:id/edit" component={BilliardReserveEdit} />
			<ContentRoute path="/Billiard/billiardReserves" component={BilliardReservesPage} />
			{/* end BilliardReserves */}

			{/* begin BilliardReservePrices */}
			<ContentRoute path="/Billiard/billiardReservePrices/new" component={BilliardReservePriceEdit} />
			<ContentRoute path="/Billiard/billiardReservePrices/:id/edit" component={BilliardReservePriceEdit} />
			<ContentRoute path="/Billiard/billiardReservePrices" component={BilliardReservePricesPage} />
			{/* end BilliardReservePrices */}

			{/* begin BilliardTimePriceing */}
			<ContentRoute path="/Billiard/billiardTimePriceing/new" component={BilliardTimePriceingEdit} />
			<ContentRoute path="/Billiard/billiardTimePriceing/:id/edit" component={BilliardTimePriceingEdit} />
			<ContentRoute path="/Billiard/billiardTimePriceing" component={BilliardTimePriceingPage} />
			{/* end BilliardTimePriceing */}

      </Switch>
    </Suspense>
  );
}
