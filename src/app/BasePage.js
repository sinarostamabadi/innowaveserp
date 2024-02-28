import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../core/layout";
import { DashboardPage } from "./pages/DashboardPage";

const GeneralPage = lazy(() => import("./modules/General/pages/GeneralPage"));
const CashPage = lazy(() => import("./modules/Cash/pages/CashPage"));
const CorePage = lazy(() => import("./modules/Core/pages/CorePage"));
const BowlingPage = lazy(() => import("./modules/Bowling/pages/BowlingPage"));
const FutsalPage = lazy(() => import("./modules/Futsal/pages/FutsalPage"));
const RestaurantPage = lazy(() =>
  import("./modules/Restaurant/pages/RestaurantPage")
);
const WarehousePage = lazy(() =>
  import("./modules/Warehouse/pages/WarehousePage")
);
const PurchaseOrderPage = lazy(() =>
  import("./modules/PurchaseOrder/pages/PurchaseOrderPage")
);
const SellPage = lazy(() => import("./modules/Sell/pages/SellPage"));
const AccountingPage = lazy(() =>
  import("./modules/Accounting/pages/AccountingPage")
);
const CrmPage = lazy(() => import("./modules/Crm/pages/CrmPage"));
const ManagementPage = lazy(() =>
  import("./modules/Management/ManagementPage")
);
const TakeAwayPage = lazy(() =>
  import("./modules/TakeAway/pages/TakeAwayPage")
);
const BodyBuildingPage = lazy(() =>
  import("./modules/BodyBuilding/pages/BodyBuildingPage")
);
const SecurityPage = lazy(() =>
  import("./modules/Security/pages/SecurityPage")
);
export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}

        <ContentRoute path="/dashboard" component={DashboardPage} />

        <Route path="/general" component={GeneralPage} />
        <Route path="/cash" component={CashPage} />
        <Route path="/core" component={CorePage} />
        <Route path="/bowling" component={BowlingPage} />
        <Route path="/futsal" component={FutsalPage} />
        <Route path="/restaurant" component={RestaurantPage} />
        <Route path="/Warehouse" component={WarehousePage} />
        <Route path="/PurchaseOrder" component={PurchaseOrderPage} />
        <Route path="/Sell" component={SellPage} />
        <Route path="/Accounting" component={AccountingPage} />
        <Route path="/Crm" component={CrmPage} />
        <Route path="/Management" component={ManagementPage} />
        <Route path="/TakeAway" component={TakeAwayPage} />
        <Route path="/BodyBuilding" component={BodyBuildingPage} />
        <Route path="/Security" component={SecurityPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
