
import { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { ClosetsPage } from "./closets/ClosetsPage";
import { EmployeeTypesPage } from "./EmployeeTypes/EmployeeTypesPage";
import { PacksPage } from "./Packs/PacksPage";
import { TimeSetsPage } from "./TimeSets/TimeSetsPage";
import { ServicesPage } from "./Services/ServicesPage";
import { DiscountsPage } from "./Discounts/DiscountsPage";
import { EmployeesPage } from "./Employees/EmployeesPage";
import { ContractsPage } from "./Contracts/ContractsPage";
import { BodyBuildingDashboard } from "../dashboard/BodyBuildingDashboard";
import { ClosetEdit } from "./closets/closet-edit/ClosetEdit";
import { EmployeeTypeEdit } from "./EmployeeTypes/EmployeeType-edit/EmployeeTypeEdit";
import { PackEdit } from "./Packs/Pack-edit/PackEdit";
import { TimeSetEdit } from "./TimeSets/TimeSet-edit/TimeSetEdit";
import { ServiceEdit } from "./Services/Service-edit/ServiceEdit";
import { DiscountEdit } from "./Discounts/Discount-edit/DiscountEdit";
import { EmployeeEdit } from "./Employees/Employee-edit/EmployeeEdit";
import { ContractEdit } from "./Contracts/Contract-edit/ContractEdit";

export default function BodyBuildingPage() {
	return (
		<Suspense fallback={<LayoutSplashScreen />}>
			<Switch>
				{<Redirect exact={true} from="/BodyBuilding" to="/BodyBuilding/dashboard" />}

				{/* begin BodyBuildingDashboard */}
				<ContentRoute path="/BodyBuilding/dashboard" component={BodyBuildingDashboard} />
				{/* end BodyBuildingDashboard */}

				{/* begin Closets */}
				<ContentRoute path="/BodyBuilding/Closets/new" component={ClosetEdit} />
				<ContentRoute path="/BodyBuilding/Closets/:id/edit" component={ClosetEdit} />
				<ContentRoute path="/BodyBuilding/Closets" component={ClosetsPage} />
				{/* end Closets */}

				{/* begin EmployeeTypes */}
				<ContentRoute path="/BodyBuilding/EmployeeTypes/new" component={EmployeeTypeEdit} />
				<ContentRoute path="/BodyBuilding/EmployeeTypes/:id/edit" component={EmployeeTypeEdit} />
				<ContentRoute path="/BodyBuilding/EmployeeTypes" component={EmployeeTypesPage} />
				{/* end EmployeeTypes */}

				{/* begin Packs */}
				<ContentRoute path="/BodyBuilding/Packs/new" component={PackEdit} />
				<ContentRoute path="/BodyBuilding/Packs/:id/edit" component={PackEdit} />
				<ContentRoute path="/BodyBuilding/Packs" component={PacksPage} />
				{/* end Packs */}

				{/* begin TimeSets */}
				<ContentRoute path="/BodyBuilding/TimeSets/new" component={TimeSetEdit} />
				<ContentRoute path="/BodyBuilding/TimeSets/:id/edit" component={TimeSetEdit} />
				<ContentRoute path="/BodyBuilding/TimeSets" component={TimeSetsPage} />
				{/* end TimeSets */}

				{/* begin Services */}
				<ContentRoute path="/BodyBuilding/Services/new" component={ServiceEdit} />
				<ContentRoute path="/BodyBuilding/Services/:id/edit" component={ServiceEdit} />
				<ContentRoute path="/BodyBuilding/Services" component={ServicesPage} />
				{/* end Services */}
				
				{/* begin Discounts */}
				<ContentRoute path="/BodyBuilding/Discounts/new" component={DiscountEdit} />
				<ContentRoute path="/BodyBuilding/Discounts/:id/edit" component={DiscountEdit} />
				<ContentRoute path="/BodyBuilding/Discounts" component={DiscountsPage} />
				{/* end Discounts */}

				{/* begin Employees */}
				<ContentRoute path="/BodyBuilding/Employees/new" component={EmployeeEdit} />
				<ContentRoute path="/BodyBuilding/Employees/:id/edit" component={EmployeeEdit} />
				<ContentRoute path="/BodyBuilding/Employees" component={EmployeesPage} />
				{/* end Employees */}

				{/* begin Employees */}
				<ContentRoute path="/BodyBuilding/Contracts/new" component={ContractEdit} />
				<ContentRoute path="/BodyBuilding/Contracts/:id/edit" component={ContractEdit} />
				<ContentRoute path="/BodyBuilding/Contracts" component={ContractsPage} />
				{/* end Employees */}

			</Switch>
		</Suspense>
	);
}
