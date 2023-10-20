

import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { BuysPage } from "./buys/BuysPage";
import { BuyReturnsPage } from "./buyReturns/BuyReturnsPage";
import { BuyCostsPage } from "./buyCosts/BuyCostsPage";
import { BuyDetailsPage } from "./buyDetails/BuyDetailsPage";
import { BuyDiscountsPage } from "./buyDiscounts/BuyDiscountsPage";
import { BuyRequestsPage } from "./buyRequests/BuyRequestsPage";
import { BuyRequestDetailsPage } from "./buyRequestDetails/BuyRequestDetailsPage";
import { BuySerialsPage } from "./buySerials/BuySerialsPage";
import { CostTypesPage } from "./costTypes/CostTypesPage";
import { InquiriesPage } from "./inquiries/InquiriesPage";
import { InquiryDetailsPage } from "./inquiryDetails/InquiryDetailsPage";
import { InquiryStatusesPage } from "./inquiryStatuses/InquiryStatusesPage";
import { BuySettlementTypesPage } from "./buySettlementTypes/BuySettlementTypesPage";
 

import { PurchaseOrderDashboard } from "../dashboard/PurchaseOrderDashboard";

import { BuyEdit } from "./buys/buy-edit/BuyEdit";
import { BuyReturnEdit } from "./buyReturns/buyReturn-edit/BuyReturnEdit";
import { BuyCostEdit } from "./buyCosts/buyCost-edit/BuyCostEdit";
import { BuyDetailEdit } from "./buyDetails/buyDetail-edit/BuyDetailEdit";
import { BuyDiscountEdit } from "./buyDiscounts/buyDiscount-edit/BuyDiscountEdit";
import { BuyRequestEdit } from "./buyRequests/buyRequest-edit/BuyRequestEdit";
import { BuyRequestDetailEdit } from "./buyRequestDetails/buyRequestDetail-edit/BuyRequestDetailEdit";
import { BuySerialEdit } from "./buySerials/buySerial-edit/BuySerialEdit";
import { CostTypeEdit } from "./costTypes/costType-edit/CostTypeEdit";
import { InquiryEdit } from "./inquiries/inquiry-edit/InquiryEdit";
import { InquiryDetailEdit } from "./inquiryDetails/inquiryDetail-edit/InquiryDetailEdit";
import { InquiryStatusEdit } from "./inquiryStatuses/inquiryStatus-edit/InquiryStatusEdit";
import { BuySettlementTypeEdit } from "./buySettlementTypes/buySettlementType-edit/BuySettlementTypeEdit";
 
import ManagerCartable from "./cartables/ManagerCartable";
import WarehouseCartable from "./cartables/WarehouseCartable";
import BuyCartable from "./cartables/BuyCartable";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/PurchaseOrder" to="/PurchaseOrder/dashboard" />}
        
        {/* begin PurchaseOrderDashboard */}
        <ContentRoute path="/PurchaseOrder/dashboard" component={PurchaseOrderDashboard} />
        {/* end PurchaseOrderDashboard */}  
		

			{/* begin Buys */}
			<ContentRoute path="/PurchaseOrder/buys/new/:pack" render={(props) => <BuyEdit {...props} mode={1}/>}/>
			<ContentRoute path="/PurchaseOrder/buys/new" component={BuyEdit} />
			<ContentRoute path="/PurchaseOrder/buys/:id/edit" render={(props) => <BuyEdit {...props} mode={0}/>}/>
			<ContentRoute path="/PurchaseOrder/buys" component={BuysPage} />
			{/* end Buys */}

			{/* begin BuyReturns */}
			<ContentRoute path="/PurchaseOrder/buyReturns/:id/new" render={(props) => <BuyReturnEdit {...props} mode={1}/>} />
			<ContentRoute path="/PurchaseOrder/buyReturns/:id/edit" render={(props) => <BuyReturnEdit {...props} mode={0}/>}/>
			<ContentRoute exact path="/PurchaseOrder/buyReturns/new" render={(props) => <BuyReturnEdit {...props} mode={2}/>} />
			<ContentRoute path="/PurchaseOrder/buyReturns" component={BuyReturnsPage} />
			{/* end BuyReturns */}

			{/* begin BuyCosts */}
			<ContentRoute path="/PurchaseOrder/buyCosts/new" component={BuyCostEdit} />
			<ContentRoute path="/PurchaseOrder/buyCosts/:id/edit" component={BuyCostEdit} />
			<ContentRoute path="/PurchaseOrder/buyCosts" component={BuyCostsPage} />
			{/* end BuyCosts */}

			{/* begin BuyDetails */}
			<ContentRoute path="/PurchaseOrder/buyDetails/new" component={BuyDetailEdit} />
			<ContentRoute path="/PurchaseOrder/buyDetails/:id/edit" component={BuyDetailEdit} />
			<ContentRoute path="/PurchaseOrder/buyDetails" component={BuyDetailsPage} />
			{/* end BuyDetails */}

			{/* begin BuyDiscounts */}
			<ContentRoute path="/PurchaseOrder/buyDiscounts/new" component={BuyDiscountEdit} />
			<ContentRoute path="/PurchaseOrder/buyDiscounts/:id/edit" component={BuyDiscountEdit} />
			<ContentRoute path="/PurchaseOrder/buyDiscounts" component={BuyDiscountsPage} />
			{/* end BuyDiscounts */}

			{/* begin BuyRequests */}
			<ContentRoute path="/PurchaseOrder/buyRequests/new" render={(props) => <BuyRequestEdit {...props} mode={0}/>}/>
			{/* <ContentRoute path="/PurchaseOrder/buyRequests/:id/edit" component={BuyRequestEdit} /> */}
			<ContentRoute path="/PurchaseOrder/buyRequests/:id/edit" render={(props) => <BuyRequestEdit {...props} mode={1}/>}/>
			<ContentRoute path="/PurchaseOrder/buyRequests/:id/show" render={(props) => <BuyRequestEdit {...props} mode={2}/>}/>
			<ContentRoute path="/PurchaseOrder/buyRequests/:id/manager" render={(props) => <BuyRequestEdit {...props} mode={3}/>}/>
			<ContentRoute path="/PurchaseOrder/buyRequests/:id/warehouse" render={(props) => <BuyRequestEdit {...props} mode={4}/>}/>
			<ContentRoute path="/PurchaseOrder/buyRequests" component={BuyRequestsPage} />
			{/* end BuyRequests */}

			{/* begin BuyRequestDetails */}
			<ContentRoute path="/PurchaseOrder/buyRequestDetails/new" component={BuyRequestDetailEdit} />
			<ContentRoute path="/PurchaseOrder/buyRequestDetails/:id/edit" component={BuyRequestDetailEdit} />
			<ContentRoute path="/PurchaseOrder/buyRequestDetails" component={BuyRequestDetailsPage} />
			{/* end BuyRequestDetails */}

			{/* begin BuySerials */}
			<ContentRoute path="/PurchaseOrder/buySerials/new" component={BuySerialEdit} />
			<ContentRoute path="/PurchaseOrder/buySerials/:id/edit" component={BuySerialEdit} />
			<ContentRoute path="/PurchaseOrder/buySerials" component={BuySerialsPage} />
			{/* end BuySerials */}

			{/* begin CostTypes */}
			<ContentRoute path="/PurchaseOrder/costTypes/new" component={CostTypeEdit} />
			<ContentRoute path="/PurchaseOrder/costTypes/:id/edit" component={CostTypeEdit} />
			<ContentRoute path="/PurchaseOrder/costTypes" component={CostTypesPage} />
			{/* end CostTypes */}

			{/* begin BuySettlementTypes */}
			<ContentRoute path="/PurchaseOrder/buySettlementTypes/new" component={BuySettlementTypeEdit} />
			<ContentRoute path="/PurchaseOrder/buySettlementTypes/:id/edit" component={BuySettlementTypeEdit} />
			<ContentRoute path="/PurchaseOrder/buySettlementTypes" component={BuySettlementTypesPage} />
			{/* end BuySettlementTypes */}

			{/* begin Inquiries */}
			<ContentRoute path="/PurchaseOrder/inquiries/new" component={InquiryEdit} />
			<ContentRoute path="/PurchaseOrder/inquiries/:id/edit" component={InquiryEdit} />
			<ContentRoute path="/PurchaseOrder/inquiries" component={InquiriesPage} />
			{/* end Inquiries */}

			{/* begin InquiryDetails */}
			<ContentRoute path="/PurchaseOrder/inquiryDetails/new" component={InquiryDetailEdit} />
			<ContentRoute path="/PurchaseOrder/inquiryDetails/:id/edit" component={InquiryDetailEdit} />
			<ContentRoute path="/PurchaseOrder/inquiryDetails" component={InquiryDetailsPage} />
			{/* end InquiryDetails */}

			{/* begin InquiryStatuses */}
			<ContentRoute path="/PurchaseOrder/inquiryStatuses/new" component={InquiryStatusEdit} />
			<ContentRoute path="/PurchaseOrder/inquiryStatuses/:id/edit" component={InquiryStatusEdit} />
			<ContentRoute path="/PurchaseOrder/inquiryStatuses" component={InquiryStatusesPage} />
			{/* end InquiryStatuses */}

			{/* begin Cartables */}
			<ContentRoute path="/PurchaseOrder/Cartables/manager" component={ManagerCartable} />
			<ContentRoute path="/PurchaseOrder/Cartables/warehouse" component={WarehouseCartable} />
			<ContentRoute path="/PurchaseOrder/Cartables/buy" component={BuyCartable} />
			{/* end Cartables */}
      </Switch>
    </Suspense>
  );
}
