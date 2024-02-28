import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../core/layout";

import { ActionsPage } from "./actions/ActionsPage";
import { LoginHistoriesPage } from "./loginHistories/LoginHistoriesPage";
import { LoginStatusesPage } from "./loginStatuses/LoginStatusesPage";
import { RolePermissionsesPage } from "./rolePermissionses/RolePermissionsesPage";
import { RolesesPage } from "./roleses/RolesesPage";
import { ServiceActionsesPage } from "./serviceActionses/ServiceActionsesPage";
import { ServiceItemsPage } from "./serviceItems/ServiceItemsPage";
import { ServicesesPage } from "./serviceses/ServicesesPage";
import { UsersPage } from "./users/UsersPage";
import { UserInRolesesPage } from "./userInRoleses/UserInRolesesPage";
import { UserPermissionsPage } from "./userPermissions/UserPermissionsPage";
import { UserServiceItemsPage } from "./userServiceItems/UserServiceItemsPage";

import { SecurityDashboard } from "../dashboard/SecurityDashboard";

import { ActionEdit } from "./actions/action-edit/ActionEdit";
import { LoginHistoryEdit } from "./loginHistories/loginHistory-edit/LoginHistoryEdit";
import { LoginStatusEdit } from "./loginStatuses/loginStatus-edit/LoginStatusEdit";
import { RolePermissionsEdit } from "./rolePermissionses/rolePermissions-edit/RolePermissionsEdit";
import { RolesEdit } from "./roleses/roles-edit/RolesEdit";
import { ServiceActionsEdit } from "./serviceActionses/serviceActions-edit/ServiceActionsEdit";
import { ServiceItemEdit } from "./serviceItems/serviceItem-edit/ServiceItemEdit";
import { ServicesEdit } from "./serviceses/services-edit/ServicesEdit";
import { UserEdit } from "./users/user-edit/UserEdit";
import { UserInRolesEdit } from "./userInRoleses/userInRoles-edit/UserInRolesEdit";
import { UserPermissionEdit } from "./userPermissions/userPermission-edit/UserPermissionEdit";
import { UserServiceItemEdit } from "./userServiceItems/userServiceItem-edit/UserServiceItemEdit";

export default function GeneralPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/Security" to="/Security/dashboard" />}

        {/* begin SecurityDashboard */}
        <ContentRoute
          path="/Security/dashboard"
          component={SecurityDashboard}
        />
        {/* end SecurityDashboard */}

        {/* begin Actions */}
        <ContentRoute path="/Security/actions/new" component={ActionEdit} />
        <ContentRoute
          path="/Security/actions/:id/edit"
          component={ActionEdit}
        />
        <ContentRoute path="/Security/actions" component={ActionsPage} />
        {/* end Actions */}

        {/* begin LoginHistories */}
        <ContentRoute
          path="/Security/loginHistories/new"
          component={LoginHistoryEdit}
        />
        <ContentRoute
          path="/Security/loginHistories/:id/edit"
          component={LoginHistoryEdit}
        />
        <ContentRoute
          path="/Security/loginHistories"
          component={LoginHistoriesPage}
        />
        {/* end LoginHistories */}

        {/* begin LoginStatuses */}
        <ContentRoute
          path="/Security/loginStatuses/new"
          component={LoginStatusEdit}
        />
        <ContentRoute
          path="/Security/loginStatuses/:id/edit"
          component={LoginStatusEdit}
        />
        <ContentRoute
          path="/Security/loginStatuses"
          component={LoginStatusesPage}
        />
        {/* end LoginStatuses */}

        {/* begin RolePermissionses */}
        <ContentRoute
          path="/Security/rolePermissionses/new"
          component={RolePermissionsEdit}
        />
        <ContentRoute
          path="/Security/rolePermissionses/:id/edit"
          component={RolePermissionsEdit}
        />
        <ContentRoute
          path="/Security/rolePermissionses"
          component={RolePermissionsesPage}
        />
        {/* end RolePermissionses */}

        {/* begin Roleses */}
        <ContentRoute path="/Security/roleses/new" component={RolesEdit} />
        <ContentRoute path="/Security/roleses/:id/edit" component={RolesEdit} />
        <ContentRoute path="/Security/roleses" component={RolesesPage} />
        {/* end Roleses */}

        {/* begin ServiceActionses */}
        <ContentRoute
          path="/Security/serviceActionses/new"
          component={ServiceActionsEdit}
        />
        <ContentRoute
          path="/Security/serviceActionses/:id/edit"
          component={ServiceActionsEdit}
        />
        <ContentRoute
          path="/Security/serviceActionses"
          component={ServiceActionsesPage}
        />
        {/* end ServiceActionses */}

        {/* begin ServiceItems */}
        <ContentRoute
          path="/Security/serviceItems/new"
          component={ServiceItemEdit}
        />
        <ContentRoute
          path="/Security/serviceItems/:id/edit"
          component={ServiceItemEdit}
        />
        <ContentRoute
          path="/Security/serviceItems"
          component={ServiceItemsPage}
        />
        {/* end ServiceItems */}

        {/* begin Serviceses */}
        <ContentRoute
          path="/Security/serviceses/new"
          component={ServicesEdit}
        />
        <ContentRoute
          path="/Security/serviceses/:id/edit"
          component={ServicesEdit}
        />
        <ContentRoute path="/Security/serviceses" component={ServicesesPage} />
        {/* end Serviceses */}

        {/* begin Users */}
        <ContentRoute path="/Security/users/new" component={UserEdit} />
        <ContentRoute path="/Security/users/:id/edit" component={UserEdit} />
        <ContentRoute path="/Security/users" component={UsersPage} />
        {/* end Users */}

        {/* begin UserInRoleses */}
        <ContentRoute
          path="/Security/userInRoleses/new"
          component={UserInRolesEdit}
        />
        <ContentRoute
          path="/Security/userInRoleses/:id/edit"
          component={UserInRolesEdit}
        />
        <ContentRoute
          path="/Security/userInRoleses"
          component={UserInRolesesPage}
        />
        {/* end UserInRoleses */}

        {/* begin UserPermissions */}
        <ContentRoute
          path="/Security/userPermissions/new"
          component={UserPermissionEdit}
        />
        <ContentRoute
          path="/Security/userPermissions/:id/edit"
          component={UserPermissionEdit}
        />
        <ContentRoute
          path="/Security/userPermissions"
          component={UserPermissionsPage}
        />
        {/* end UserPermissions */}

        {/* begin UserServiceItems */}
        <ContentRoute
          path="/Security/userServiceItems/new"
          component={UserServiceItemEdit}
        />
        <ContentRoute
          path="/Security/userServiceItems/:id/edit"
          component={UserServiceItemEdit}
        />
        <ContentRoute
          path="/Security/userServiceItems"
          component={UserServiceItemsPage}
        />
        {/* end UserServiceItems */}
      </Switch>
    </Suspense>
  );
}
