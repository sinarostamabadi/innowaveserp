
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { MassageCentersPage } from "./massageCenters/MassageCentersPage";
import { MassageDiscountsPage } from "./massageDiscounts/MassageDiscountsPage";
import { MassageReservesPage } from "./massageReserves/MassageReservesPage";
import { MassageReservePricesPage } from "./massageReservePrices/MassageReservePricesPage";
import { MassageTimePriceingPage } from "./massageTimePriceing/MassageTimePriceingPage";
import { MassageTypesPage } from "./massageTypes/MassageTypesPage";
import { MasseursPage } from "./masseurs/MasseursPage";
import { MasseurMassageTypesPage } from "./masseurMassageTypes/MasseurMassageTypesPage";

import { MassageDashboard } from "../dashboard/MassageDashboard";

import { MassageCenterEdit } from "./massageCenters/massageCenter-edit/MassageCenterEdit";
import { MassageDiscountEdit } from "./massageDiscounts/massageDiscount-edit/MassageDiscountEdit";
import { MassageReserveEdit } from "./massageReserves/massageReserve-edit/MassageReserveEdit";
import { MassageReservePriceEdit } from "./massageReservePrices/massageReservePrice-edit/MassageReservePriceEdit";
import { MassageTimePriceingEdit } from "./massageTimePriceing/massageTimePriceing-edit/MassageTimePriceingEdit";
import { MassageTypeEdit } from "./massageTypes/massageType-edit/MassageTypeEdit";
import { MasseurEdit } from "./masseurs/masseur-edit/MasseurEdit";
import { MasseurMassageTypeEdit } from "./masseurMassageTypes/masseurMassageType-edit/MasseurMassageTypeEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Massage" to="/Massage/dashboard" />}
        
        {/* begin MassageDashboard */}
        <ContentRoute path="/Massage/dashboard" component={MassageDashboard} />
        {/* end MassageDashboard */}  
		

			{/* begin MassageCenters */}
			<ContentRoute path="/Massage/massageCenters/new" component={MassageCenterEdit} />
			<ContentRoute path="/Massage/massageCenters/:id/edit" component={MassageCenterEdit} />
			<ContentRoute path="/Massage/massageCenters" component={MassageCentersPage} />
			{/* end MassageCenters */}

			{/* begin MassageDiscounts */}
			<ContentRoute path="/Massage/massageDiscounts/new" component={MassageDiscountEdit} />
			<ContentRoute path="/Massage/massageDiscounts/:id/edit" component={MassageDiscountEdit} />
			<ContentRoute path="/Massage/massageDiscounts" component={MassageDiscountsPage} />
			{/* end MassageDiscounts */}

			{/* begin MassageReserves */}
			<ContentRoute path="/Massage/massageReserves/new" component={MassageReserveEdit} />
			<ContentRoute path="/Massage/massageReserves/:id/edit" component={MassageReserveEdit} />
			<ContentRoute path="/Massage/massageReserves" component={MassageReservesPage} />
			{/* end MassageReserves */}

			{/* begin MassageReservePrices */}
			<ContentRoute path="/Massage/massageReservePrices/new" component={MassageReservePriceEdit} />
			<ContentRoute path="/Massage/massageReservePrices/:id/edit" component={MassageReservePriceEdit} />
			<ContentRoute path="/Massage/massageReservePrices" component={MassageReservePricesPage} />
			{/* end MassageReservePrices */}

			{/* begin MassageTimePriceing */}
			<ContentRoute path="/Massage/massageTimePriceing/new" component={MassageTimePriceingEdit} />
			<ContentRoute path="/Massage/massageTimePriceing/:id/edit" component={MassageTimePriceingEdit} />
			<ContentRoute path="/Massage/massageTimePriceing" component={MassageTimePriceingPage} />
			{/* end MassageTimePriceing */}

			{/* begin MassageTypes */}
			<ContentRoute path="/Massage/massageTypes/new" component={MassageTypeEdit} />
			<ContentRoute path="/Massage/massageTypes/:id/edit" component={MassageTypeEdit} />
			<ContentRoute path="/Massage/massageTypes" component={MassageTypesPage} />
			{/* end MassageTypes */}

			{/* begin Masseurs */}
			<ContentRoute path="/Massage/masseurs/new" component={MasseurEdit} />
			<ContentRoute path="/Massage/masseurs/:id/edit" component={MasseurEdit} />
			<ContentRoute path="/Massage/masseurs" component={MasseursPage} />
			{/* end Masseurs */}

			{/* begin MasseurMassageTypes */}
			<ContentRoute path="/Massage/masseurMassageTypes/new" component={MasseurMassageTypeEdit} />
			<ContentRoute path="/Massage/masseurMassageTypes/:id/edit" component={MasseurMassageTypeEdit} />
			<ContentRoute path="/Massage/masseurMassageTypes" component={MasseurMassageTypesPage} />
			{/* end MasseurMassageTypes */}

      </Switch>
    </Suspense>
  );
}
