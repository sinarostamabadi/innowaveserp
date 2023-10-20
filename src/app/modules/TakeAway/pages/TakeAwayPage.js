
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { TakeAwayRequestsPage } from "./takeAwayRequests/TakeAwayRequestsPage";

import { TakeAwayDashboard } from "../dashboard/TakeAwayDashboard";

import { TakeAwayRequestEdit } from "./takeAwayRequests/takeAwayRequest-edit/TakeAwayRequestEdit";


export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/TakeAway" to="/TakeAway/dashboard" />}
        
        {/* begin TakeAwayDashboard */}
        <ContentRoute path="/TakeAway/dashboard" component={TakeAwayDashboard} />
        {/* end TakeAwayDashboard */}  

			{/* begin TakeAwayRequest */}
			<ContentRoute path="/TakeAway/takeAwayRequests/hyper/new" render={(props) => <TakeAwayRequestEdit {...props} mode={1}/>} />
			<ContentRoute path="/TakeAway/takeAwayRequests/restaurant/new" render={(props) => <TakeAwayRequestEdit {...props} mode={2}/>} />
			<ContentRoute path="/TakeAway/takeAwayRequests/hyper/:id/edit" render={(props) => <TakeAwayRequestEdit {...props} mode={1}/>} />
			<ContentRoute path="/TakeAway/takeAwayRequests/restaurant/:id/edit" render={(props) => <TakeAwayRequestEdit {...props} mode={2}/>} />
			<ContentRoute path="/TakeAway/takeAwayRequests" component={TakeAwayRequestsPage} />
			{/* end TakeAwayRequest */}

      </Switch>
    </Suspense>
  );
}
