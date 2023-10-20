
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { SellDiscountsPage } from "./sellDiscounts/SellDiscountsPage";
import { SellDocumentsPage } from "./sellDocuments/SellDocumentsPage";
import { SellPricingsPage } from "./sellPricing/SellPricingsPage";
import { SellDiscountFactorsPage } from "./sellDiscountFactors/SellDiscountFactorsPage";

import { SellDashboard } from "../dashboard/SellDashboard";

import { SellDiscountEdit } from "./sellDiscounts/sellDiscount-edit/SellDiscountEdit";
import { SellDocumentEdit } from "./sellDocuments/sellDocument-edit/SellDocumentEdit";
import { SellPricingEdit } from "./sellPricing/sellPricing-edit/SellPricingEdit";
import { SellDiscountFactorEdit } from "./sellDiscountFactors/sellDiscountFactor-edit/SellDiscountFactorEdit";
import { ProductShow } from "./sellDocuments/product-show/ProductShow";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Sell" to="/Sell/dashboard" />}
        
        {/* begin SellDashboard */}
        <ContentRoute path="/Sell/dashboard" component={SellDashboard} />
        {/* end SellDashboard */}  

			{/* begin SellDiscounts */}
			<ContentRoute path="/Sell/sellDiscounts/factor/new" render={(props) => <SellDiscountEdit {...props} mode={1}/>} />
			<ContentRoute path="/Sell/sellDiscounts/product/new" render={(props) => <SellDiscountEdit {...props} mode={2}/>} />
			<ContentRoute path="/Sell/sellDiscounts/percent/new" render={(props) => <SellDiscountEdit {...props} mode={3}/>}/>
			<ContentRoute path="/Sell/sellDiscounts/:id/edit" component={SellDiscountEdit} />
			<ContentRoute path="/Sell/sellDiscounts" component={SellDiscountsPage} />
			{/* end SellDiscounts */}

			{/* begin SellDiscountFactors */}
			<ContentRoute path="/Sell/sellDiscountFactors/new" component={SellDiscountFactorEdit} />
			<ContentRoute path="/Sell/sellDiscountFactors/:id/edit" component={SellDiscountFactorEdit} />
			<ContentRoute path="/Sell/sellDiscountFactors" component={SellDiscountFactorsPage} />
			{/* end SellDiscountFactors */}

			{/* begin SellDocuments */}
			<ContentRoute path="/Sell/sellDocuments/new" component={SellDocumentEdit} />
			<ContentRoute path="/Sell/sellDocuments/:id/renew" render={(props) => <SellDocumentEdit {...props} mode={1}/>}/>
			<ContentRoute path="/Sell/sellDocuments/:id/show" render={(props) => <SellDocumentEdit {...props} mode={2}/>}/>
			<ContentRoute path="/Sell/sellDocuments/:id/edit" component={SellDocumentEdit} />
			<ContentRoute path="/Sell/sellDocuments" component={SellDocumentsPage} />
			<ContentRoute path="/Sell/products/:id/show" component={ProductShow} />
			<ContentRoute path="/Sell/products/show" component={ProductShow} />
			{/* end SellDocuments */}

			{/* begin SellPricing */}
			<ContentRoute path="/Sell/sellPricings/new" component={SellPricingEdit} />
			<ContentRoute path="/Sell/sellPricings/:id/edit" component={SellPricingEdit} />
			<ContentRoute path="/Sell/sellPricings" component={SellPricingsPage} />
			{/* end SellPricing */}

      </Switch>
    </Suspense>
  );
}
