import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../core/layout";

import { ProductLifeCycle } from "./reports/ProductLifeCycle/ProductLifeCycle";
import { TotalSalesSold } from "./reports/TotalSalesSold/TotalSalesSold";
import { TotalSalesPrice } from "./reports/TotalSalesPrice/TotalSalesPrice";
import { TotalSalesProfit } from "./reports/TotalSalesProfit/TotalSalesProfit";
import { Sell } from "./reports/Sell/Sell";
import { ProductProfit } from "./reports/ProductProfit/ProductProfit";
import { SendToScale } from "./tools/SendToScale/SendToScale";

import { ManagementDashboard } from "./dashboard/ManagementDashboard";

export default function ManagementPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/Management"
            to="/Management/dashboard"
          />
        }

        {/* begin ManagementDashboard */}
        <ContentRoute
          path="/Management/dashboard"
          component={ManagementDashboard}
        />
        {/* end ManagementDashboard */}

        {/* begin Reports */}
        <ContentRoute
          path="/Management/reports/productLifeCycle"
          component={ProductLifeCycle}
        />
        <ContentRoute
          path="/Management/reports/totalSalesSold"
          component={TotalSalesSold}
        />
        <ContentRoute
          path="/Management/reports/totalSalesPrice"
          component={TotalSalesPrice}
        />
        <ContentRoute
          path="/Management/reports/totalSalesProfit"
          component={TotalSalesProfit}
        />
        <ContentRoute path="/Management/reports/sell" component={Sell} />
        <ContentRoute
          path="/Management/reports/productProfit"
          component={ProductProfit}
        />
        <ContentRoute
          path="/Management/tools/sendToScale"
          component={SendToScale}
        />
        {/* end Reports */}
      </Switch>
    </Suspense>
  );
}
