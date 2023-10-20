
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { CentersPage } from "./centers/CentersPage";
import { DiscountsPage } from "./discounts/DiscountsPage";
import { LinesPage } from "./lines/LinesPage";
import { ReservesPage } from "./reserves/ReservesPage";
import { SetPricingPage } from "./setPricing/SetPricingPage";
import { TimePriceingPage } from "./timePriceing/TimePriceingPage";
import { BowlingTeamsPage } from "./bowlingTeams/BowlingTeamsPage";
import { BowlingCompetitionsPage } from "./bowlingCompetitions/BowlingCompetitionsPage";

import { BowlingDashboard } from "../dashboard/BowlingDashboard";
import { StandingTable } from "./bowlingCompetitions/standing/StandingTable";

import { CenterEdit } from "./centers/center-edit/CenterEdit";
import { DiscountEdit } from "./discounts/discount-edit/DiscountEdit";
import { LineEdit } from "./lines/line-edit/LineEdit";
import { Score } from "./lines/line-score/Score";
import { ReserveScore } from "./reserves/reserve-score/ReserveScore";
import { ReserveEditScore } from "./reserves/reserve-edit-score/ReserveEditScore";
import { ReserveEdit } from "./reserves/reserve-edit/ReserveEdit";
import { SetPricingEdit } from "./setPricing/setPricing-edit/SetPricingEdit";

import { TimePriceingEdit } from "./timePriceing/timePriceing-edit/TimePriceingEdit";
import { BowlingTeamEdit } from "./bowlingTeams/bowlingTeam-edit/BowlingTeamEdit";
import { BowlingCompetitionEdit } from "./bowlingCompetitions/bowlingCompetition-edit/BowlingCompetitionEdit";
import { setPricingSlice } from "../_redux/setPricing/setPricingSlice";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Bowling" to="/Bowling/dashboard" />}
        
        {/* begin BowlingDashboard */}
        <ContentRoute path="/Bowling/dashboard" component={BowlingDashboard} />
        {/* end BowlingDashboard */}  
		

			{/* begin Centers */}
			<ContentRoute path="/Bowling/centers/new" component={CenterEdit} />
			<ContentRoute path="/Bowling/centers/:id/edit" component={CenterEdit} />
			<ContentRoute path="/Bowling/centers" component={CentersPage} />
			{/* end Centers */}

			{/* begin Discounts */}
			<ContentRoute path="/bowling/discount/new" component={DiscountEdit} />
			<ContentRoute path="/bowling/discount/:id/edit" component={DiscountEdit} />
			<ContentRoute path="/bowling/discount" component={DiscountsPage} />
			{/* end Discounts */}

			{/* begin Lines */}
			<ContentRoute path="/Bowling/lines/new" component={LineEdit} />
			<ContentRoute path="/Bowling/lines/:id/edit" component={LineEdit} />
			<ContentRoute path="/Bowling/lines/:id/score" component={Score} />
			<ContentRoute path="/Bowling/lines" component={LinesPage} />
			{/* end Lines */}

			{/* begin Reserves */}
			<ContentRoute path="/Bowling/reserves/new" component={ReserveEdit} />
			<ContentRoute path="/Bowling/reserves/:id/edit" component={ReserveEdit} />
			<ContentRoute path="/Bowling/reserves/:id/replay"  render={(props) => <ReserveEdit {...props} mode={"replay"} />}/>
			<ContentRoute path="/Bowling/reserves/:id/editscore" component={ReserveEditScore} />
			<ContentRoute path="/Bowling/reserves/:id/score" component={ReserveScore} />
			<ContentRoute path="/Bowling/reserves" component={ReservesPage} />
			{/* end Reserves */}

			{/* begin SetPricing */}
			<ContentRoute path="/Bowling/setPricing/new" component={SetPricingEdit} />
			<ContentRoute path="/Bowling/setPricing/:id/edit" component={SetPricingEdit} />
			<ContentRoute path="/Bowling/setPricing" component={SetPricingPage} />
			{/* end SetPricing */}

			{/* begin TimePriceings */}
			<ContentRoute path="/Bowling/timePriceing/new" component={TimePriceingEdit} />
			<ContentRoute path="/Bowling/timePriceing/:id/edit" component={TimePriceingEdit} />
			<ContentRoute path="/Bowling/timePriceing" component={TimePriceingPage} />
			{/* end TimePriceings */}

			{/* begin BowlingTeams */}
			<ContentRoute path="/Bowling/bowlingTeams/new" component={BowlingTeamEdit} />
			<ContentRoute path="/Bowling/bowlingTeams/:id/edit" component={BowlingTeamEdit} />
			<ContentRoute path="/Bowling/bowlingTeams" component={BowlingTeamsPage} />
			{/* end BowlingTeams */}

			{/* begin BowlingCompetitions */}
			<ContentRoute path="/Bowling/bowlingCompetitions/new" component={BowlingCompetitionEdit} />
			<ContentRoute path="/Bowling/bowlingCompetitions/:id/edit" component={BowlingCompetitionEdit} />
			<ContentRoute path="/Bowling/bowlingCompetitions/:id/standing" component={StandingTable} />
			<ContentRoute path="/Bowling/bowlingCompetitions" component={BowlingCompetitionsPage} />
			{/* end BowlingCompetitions */}			

      </Switch>
    </Suspense>
  );
}
