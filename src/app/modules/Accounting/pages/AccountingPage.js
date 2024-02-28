import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { AccountsPage } from "./accounts/AccountsPage";
import { DocumentsPage } from "./documents/DocumentsPage";
import { AccountFloatingPage } from "./accountFloating/AccountFloatingPage";
import { AccountFloatingGroupsPage } from "./accountFloatingGroups/AccountFloatingGroupsPage";
import { AccountTypesPage } from "./accountTypes/AccountTypesPage";
import { AccountFloatingTypesPage } from "./accountFloatingTypes/AccountFloatingTypesPage";
import { AccountFloatingGroupTypesPage } from "./accountFloatingGroupTypes/AccountFloatingGroupTypesPage";
import { DocumentTypesPage } from "./documentTypes/DocumentTypesPage";
import { CostCentersPage } from "./costCenters/CostCentersPage";
import { AccountFloatingGroupRelationsPage } from "./accountFloatingGroupRelations/AccountFloatingGroupRelationsPage";

import { AccountingDashboard } from "../dashboard/AccountingDashboard";

import { AccountEdit } from "./accounts/account-edit/AccountEdit";
import { DocumentEdit } from "./documents/document-edit/DocumentEdit";
import { AccountFloatingEdit } from "./accountFloating/accountFloating-edit/AccountFloatingEdit";
import { AccountFloatingGroupEdit } from "./accountFloatingGroups/accountFloatingGroup-edit/AccountFloatingGroupEdit";
import { AccountTypeEdit } from "./accountTypes/accountType-edit/AccountTypeEdit";
import { AccountFloatingTypeEdit } from "./accountFloatingTypes/accountFloatingType-edit/AccountFloatingTypeEdit";
import { AccountFloatingGroupTypeEdit } from "./accountFloatingGroupTypes/accountFloatingGroupType-edit/AccountFloatingGroupTypeEdit";
import { DocumentTypeEdit } from "./documentTypes/documentType-edit/DocumentTypeEdit";
import { CostCenterEdit } from "./costCenters/costCenter-edit/CostCenterEdit";
import { AccountFloatingGroupRelationEdit } from "./accountFloatingGroupRelations/accountFloatingGroupRelation-edit/AccountFloatingGroupRelationEdit";
import { Balance } from "./reports/Balance";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/Accounting"
            to="/Accounting/dashboard"
          />
        }

        {/* begin AccountingDashboard */}
        <ContentRoute
          path="/Accounting/dashboard"
          component={AccountingDashboard}
        />
        {/* end AccountingDashboard */}

        {/* begin Accounts */}
        <ContentRoute path="/Accounting/accounts/new" component={AccountEdit} />
        <ContentRoute path="/Accounting/accounts" component={AccountsPage} />
        {/* end Accounts */}

        {/* begin AccountFloatings */}
        <ContentRoute
          path="/Accounting/accountFloatings/new"
          component={AccountFloatingEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatings/:id/edit"
          component={AccountFloatingEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatings"
          component={AccountFloatingPage}
        />
        {/* end AccountFloatings */}

        {/* begin AccountFloatingGroup */}
        <ContentRoute
          path="/Accounting/accountFloatingGroups/new"
          component={AccountFloatingGroupEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingGroups/:id/edit"
          component={AccountFloatingGroupEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingGroups"
          component={AccountFloatingGroupsPage}
        />
        {/* end AccountFloatingGroup */}

        {/* begin AccountFloatingGroupRelations */}
        <ContentRoute
          path="/Accounting/AccountFloatingGroupRelations/new"
          component={AccountFloatingGroupRelationEdit}
        />
        <ContentRoute
          path="/Accounting/AccountFloatingGroupRelations/:id/edit"
          component={AccountFloatingGroupRelationEdit}
        />
        <ContentRoute
          path="/Accounting/AccountFloatingGroupRelations"
          component={AccountFloatingGroupRelationsPage}
        />
        {/* end AccountFloatingGroupRelations */}

        {/* begin AccountTypes */}
        <ContentRoute
          path="/Accounting/accountTypes/new"
          component={AccountTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountTypes/:id/edit"
          component={AccountTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountTypes"
          component={AccountTypesPage}
        />
        {/* end AccountTypes */}

        {/* begin AccountFloatingTypes */}
        <ContentRoute
          path="/Accounting/accountFloatingTypes/new"
          component={AccountFloatingTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingTypes/:id/edit"
          component={AccountFloatingTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingTypes"
          component={AccountFloatingTypesPage}
        />
        {/* end AccountFloatingTypes */}

        {/* begin AccountFloatingGroupTypes */}
        <ContentRoute
          path="/Accounting/accountFloatingGroupTypes/new"
          component={AccountFloatingGroupTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingGroupTypes/:id/edit"
          component={AccountFloatingGroupTypeEdit}
        />
        <ContentRoute
          path="/Accounting/accountFloatingGroupTypes"
          component={AccountFloatingGroupTypesPage}
        />
        {/* end AccountFloatingGroupTypes */}

        {/* begin DocumentTypes */}
        <ContentRoute
          path="/Accounting/documentTypes/new"
          component={DocumentTypeEdit}
        />
        <ContentRoute
          path="/Accounting/documentTypes/:id/edit"
          component={DocumentTypeEdit}
        />
        <ContentRoute
          path="/Accounting/documentTypes"
          component={DocumentTypesPage}
        />
        {/* end DocumentTypes */}

        {/* begin CostCenters */}
        <ContentRoute
          path="/Accounting/costCenters/new"
          component={CostCenterEdit}
        />
        <ContentRoute
          path="/Accounting/costCenters/:id/edit"
          component={CostCenterEdit}
        />
        <ContentRoute
          path="/Accounting/costCenters"
          component={CostCentersPage}
        />
        {/* end CostCenters */}

        {/* begin Documents */}
        <ContentRoute
          path="/Accounting/documents/new"
          component={DocumentEdit}
        />
        <ContentRoute
          path="/Accounting/documents/:id/edit"
          component={DocumentEdit}
        />
        <ContentRoute path="/Accounting/documents" component={DocumentsPage} />
        {/* end Documents */}

        {/* begin Reports */}
        <ContentRoute
          path="/Accounting/reports/balance/:col"
          component={Balance}
        />
        {/* end Reports */}
      </Switch>
    </Suspense>
  );
}
