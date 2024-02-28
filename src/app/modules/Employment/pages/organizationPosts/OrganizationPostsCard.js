import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OrganizationPostsTable } from "./organizationPosts-table/OrganizationPostsTable";
import {
  useOrganizationPostsUIContext,
  OrganizationPostsUIConsumer,
} from "./OrganizationPostsUIContext";
import { useTranslation } from "react-i18next";

export function OrganizationPostsCard() {
  const { t } = useTranslation();

  const organizationPostsUIContext = useOrganizationPostsUIContext();

  const organizationPostsUIProps = useMemo(() => {
    return {
      ids: organizationPostsUIContext.ids,
      queryParams: organizationPostsUIContext.queryParams,
      setQueryParams: organizationPostsUIContext.setQueryParams,
      newOrganizationPostButtonClick:
        organizationPostsUIContext.newOrganizationPostButtonClick,
      openDeleteOrganizationPostsDialog:
        organizationPostsUIContext.openDeleteOrganizationPostsDialog,
      openEditOrganizationPostPage:
        organizationPostsUIContext.openEditOrganizationPostPage,
      openUpdateOrganizationPostsStatusDialog:
        organizationPostsUIContext.openUpdateOrganizationPostsStatusDialog,
      openFetchOrganizationPostsDialog:
        organizationPostsUIContext.openFetchOrganizationPostsDialog,
    };
  }, [organizationPostsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("OrganizationPost.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={organizationPostsUIProps.newOrganizationPostButtonClick}
          >
            {t("OrganizationPost.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrganizationPostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OrganizationPostsUIConsumer>
        <OrganizationPostsTable />
      </CardBody>
    </Card>
  );
}
