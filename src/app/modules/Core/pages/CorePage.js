import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { AddressesPage } from "./addresses/AddressesPage";
import { BankAccountsPage } from "./bankAccounts/BankAccountsPage";
import { CompaniesPage } from "./companies/CompaniesPage";
import { CompanyTypesPage } from "./companyTypes/CompanyTypesPage";
import { CoreTransactionPlacesPage } from "./coreTransactionPlaces/CoreTransactionPlacesPage";
import { CoreTransactionsesPage } from "./coreTransactionses/CoreTransactionsesPage";
import { CoreTransactionTypesPage } from "./coreTransactionTypes/CoreTransactionTypesPage";
import { ErrorHandlersPage } from "./errorHandlers/ErrorHandlersPage";
// import { peoplePage } from "./people/peoplePage";
import { PhonesPage } from "./phones/PhonesPage";
import { RealPersonsPage } from "./realPersons/RealPersonsPage";

import { SendSms } from "./sendSms/SendSms";

import { CoreDashboard } from "../dashboard/CoreDashboard";

import { AddressEdit } from "./addresses/address-edit/AddressEdit";
import { BankAccountEdit } from "./bankAccounts/bankAccount-edit/BankAccountEdit";
import { CompanyEdit } from "./companies/company-edit/CompanyEdit";
import { CompanyTypeEdit } from "./companyTypes/companyType-edit/CompanyTypeEdit";
import { CoreTransactionPlaceEdit } from "./coreTransactionPlaces/coreTransactionPlace-edit/CoreTransactionPlaceEdit";
import { CoreTransactionsEdit } from "./coreTransactionses/coreTransactions-edit/CoreTransactionsEdit";
import { CoreTransactionTypeEdit } from "./coreTransactionTypes/coreTransactionType-edit/CoreTransactionTypeEdit";
import { ErrorHandlerEdit } from "./errorHandlers/errorHandler-edit/ErrorHandlerEdit";
import { PersonEdit } from "./people/person-edit/PersonEdit";
import { PhoneEdit } from "./phones/phone-edit/PhoneEdit";
import { RealPersonEdit } from "./realPersons/realPerson-edit/RealPersonEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/core" to="/core/dashboard" />}

        {/* begin CoreDashboard */}
        <ContentRoute path="/core/dashboard" component={CoreDashboard} />
        {/* end CoreDashboard */}

        {/* begin SendSMS */}
        <ContentRoute path="/core/sendSms" component={SendSms} />
        {/* end Addresses */}

        {/* begin Addresses */}
        <ContentRoute path="/core/addresses/new" component={AddressEdit} />
        <ContentRoute path="/core/addresses/:id/edit" component={AddressEdit} />
        <ContentRoute path="/core/addresses" component={AddressesPage} />
        {/* end Addresses */}

        {/* begin BankAccounts */}
        <ContentRoute
          path="/core/bankAccounts/new"
          component={BankAccountEdit}
        />
        <ContentRoute
          path="/core/bankAccounts/:id/edit"
          component={BankAccountEdit}
        />
        <ContentRoute path="/core/bankAccounts" component={BankAccountsPage} />
        {/* end BankAccounts */}

        {/* begin Companies */}
        <ContentRoute path="/core/companies/new" component={CompanyEdit} />
        <ContentRoute path="/core/companies/:id/edit" component={CompanyEdit} />
        <ContentRoute path="/core/companies" component={CompaniesPage} />
        {/* end Companies */}

        {/* begin CompanyTypes */}
        <ContentRoute
          path="/core/companyTypes/new"
          component={CompanyTypeEdit}
        />
        <ContentRoute
          path="/core/companyTypes/:id/edit"
          component={CompanyTypeEdit}
        />
        <ContentRoute path="/core/companyTypes" component={CompanyTypesPage} />
        {/* end CompanyTypes */}

        {/* begin CoreTransactionPlaces */}
        <ContentRoute
          path="/core/coreTransactionPlaces/new"
          component={CoreTransactionPlaceEdit}
        />
        <ContentRoute
          path="/core/coreTransactionPlaces/:id/edit"
          component={CoreTransactionPlaceEdit}
        />
        <ContentRoute
          path="/core/coreTransactionPlaces"
          component={CoreTransactionPlacesPage}
        />
        {/* end CoreTransactionPlaces */}

        {/* begin CoreTransactionses */}
        <ContentRoute
          path="/core/coreTransactionses/new"
          component={CoreTransactionsEdit}
        />
        <ContentRoute
          path="/core/coreTransactionses/:id/edit"
          component={CoreTransactionsEdit}
        />
        <ContentRoute
          path="/core/coreTransactionses"
          component={CoreTransactionsesPage}
        />
        {/* end CoreTransactionses */}

        {/* begin CoreTransactionTypes */}
        <ContentRoute
          path="/core/coreTransactionTypes/new"
          component={CoreTransactionTypeEdit}
        />
        <ContentRoute
          path="/core/coreTransactionTypes/:id/edit"
          component={CoreTransactionTypeEdit}
        />
        <ContentRoute
          path="/core/coreTransactionTypes"
          component={CoreTransactionTypesPage}
        />
        {/* end CoreTransactionTypes */}

        {/* begin ErrorHandlers */}
        <ContentRoute
          path="/core/errorHandlers/new"
          component={ErrorHandlerEdit}
        />
        <ContentRoute
          path="/core/errorHandlers/:id/edit"
          component={ErrorHandlerEdit}
        />
        <ContentRoute
          path="/core/errorHandlers"
          component={ErrorHandlersPage}
        />
        {/* end ErrorHandlers */}

        {/* begin people */}
        {/* <ContentRoute path="/core/people/new" component={PersonEdit} />
			<ContentRoute path="/core/people/:id/edit" component={PersonEdit} />
			<ContentRoute path="/core/people" component={peoplePage} /> */}
        {/* end people */}

        {/* begin Phones */}
        <ContentRoute path="/core/phones/new" component={PhoneEdit} />
        <ContentRoute path="/core/phones/:id/edit" component={PhoneEdit} />
        <ContentRoute path="/core/phones" component={PhonesPage} />
        {/* end Phones */}

        {/* begin RealPersons */}
        <ContentRoute path="/core/realPersons/new" component={RealPersonEdit} />
        <ContentRoute
          path="/core/realPersons/:id/edit"
          component={RealPersonEdit}
        />
        <ContentRoute path="/core/realPersons" component={RealPersonsPage} />
        {/* end RealPersons */}
      </Switch>
    </Suspense>
  );
}
