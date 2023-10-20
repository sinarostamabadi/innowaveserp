
import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { CashDocumentsPage } from "./cashDocuments/CashDocumentsPage";
import { Quick } from "./cashDocuments/quick/Quick";
import { PosTransactionsPage } from "./posTransactions/PosTransactionsPage";
import { ChequeBooksPage } from "./chequeBooks/ChequeBooksPage";
import { ChequePapersPage } from "./chequePapers/ChequePapersPage";
import { BankCardsPage } from "./bankCard/BankCardsPage";
import { CouponsPage } from "./coupon/CouponsPage";

import { CashDashboard } from "../dashboard/CashDashboard";

import { CashDocumentEdit } from "./cashDocuments/cashDocument-edit/CashDocumentEdit";
import { PosTransactionEdit } from "./posTransactions/posTransaction-edit/PosTransactionEdit";
import { ChequeBookEdit } from "./chequeBooks/chequeBook-edit/ChequeBookEdit";
import { ChequePaperEdit } from "./chequePapers/chequePaper-edit/ChequePaperEdit";
import { BankCardEdit } from "./bankCard/bankCard-edit/BankCardEdit";
import { CouponEdit } from "./coupon/coupon-edit/CouponEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Cash" to="/Cash/dashboard" />}
        
        {/* begin CashDashboard */}
        <ContentRoute path="/Cash/dashboard" component={CashDashboard} />
        {/* end CashDashboard */}

		{/* begin CashDocuments */}
		<ContentRoute path="/Cash/cashDocuments/quick/:id" component={Quick} />
		<ContentRoute path="/Cash/cashDocuments/quick" component={Quick} />
		<ContentRoute path="/Cash/cashDocuments/new" component={CashDocumentEdit} />
		<ContentRoute path="/Cash/cashDocuments/:id/edit" component={CashDocumentEdit} />
		<ContentRoute path="/Cash/cashDocuments" component={CashDocumentsPage} />
		{/* end CashDocuments */}

		{/* begin PosTransactions */}
		<ContentRoute path="/Cash/posTransactions/new" component={PosTransactionEdit} />
		<ContentRoute path="/Cash/posTransactions/:id/edit" component={PosTransactionEdit} />
		<ContentRoute path="/Cash/posTransactions" component={PosTransactionsPage} />
		{/* end PosTransactions */}

		{/* begin ChequeBooks */}
		<ContentRoute path="/Cash/chequeBooks/new" component={ChequeBookEdit} />
		<ContentRoute path="/Cash/chequeBooks/:id/edit" component={ChequeBookEdit} />
		<ContentRoute path="/Cash/chequeBooks" component={ChequeBooksPage} />
		{/* end ChequeBooks */}

		{/* begin ChequePapers */}
		<ContentRoute path="/Cash/chequePapers/new" component={ChequePaperEdit} />
		<ContentRoute path="/Cash/chequePapers/:id/edit" component={ChequePaperEdit} />
		<ContentRoute path="/Cash/chequePapers" component={ChequePapersPage} />
		{/* end ChequePapers */}

		{/* begin BankCards */}
		<ContentRoute path="/Cash/bankCards/new" component={BankCardEdit} />
		<ContentRoute path="/Cash/bankCards/:id/edit" component={BankCardEdit} />
		<ContentRoute path="/Cash/bankCards" component={BankCardsPage} />
		{/* end BankCards */}

		{/* begin Coupons */}
		<ContentRoute path="/Cash/coupons/new" component={CouponEdit} />
		<ContentRoute path="/Cash/coupons/:id/edit" component={CouponEdit} />
		<ContentRoute path="/Cash/coupons" component={CouponsPage} />
		{/* end Coupons */}

      </Switch>
    </Suspense>
  );
}
