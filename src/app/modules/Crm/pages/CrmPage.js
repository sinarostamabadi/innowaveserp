import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { EntityPointsPage } from "./entityPoints/EntityPointsPage";

import { CrmDashboard } from "../dashboard/CrmDashboard";

import { EntityPointEdit } from "./entityPoints/entityPoint-edit/EntityPointEdit";

export default function CrmPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Crm" to="/Crm/dashboard" />}

        {/* begin CrmDashboard */}
        <ContentRoute path="/Crm/dashboard" component={CrmDashboard} />
        {/* end CrmDashboard */}

        {/* begin Brands */}
        <ContentRoute
          path="/Crm/entityPoints/new"
          component={EntityPointEdit}
        />
        <ContentRoute
          path="/Crm/entityPoints/:id/edit"
          component={EntityPointEdit}
        />
        <ContentRoute path="/Crm/entityPoints" component={EntityPointsPage} />
        {/* end Brands */}
      </Switch>
    </Suspense>
  );
}
