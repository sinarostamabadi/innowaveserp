import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LinkDocumentParametersTable } from "./linkDocumentParameters-table/LinkDocumentParametersTable";
import {
  useLinkDocumentParametersUIContext,
  LinkDocumentParametersUIConsumer,
} from "./LinkDocumentParametersUIContext";
import { useTranslation } from "react-i18next";

export function LinkDocumentParametersCard() {
  const { t } = useTranslation();

  const linkDocumentParametersUIContext = useLinkDocumentParametersUIContext();

  const linkDocumentParametersUIProps = useMemo(() => {
    return {
      ids: linkDocumentParametersUIContext.ids,
      queryParams: linkDocumentParametersUIContext.queryParams,
      setQueryParams: linkDocumentParametersUIContext.setQueryParams,
      newLinkDocumentParameterButtonClick:
        linkDocumentParametersUIContext.newLinkDocumentParameterButtonClick,
      openDeleteLinkDocumentParametersDialog:
        linkDocumentParametersUIContext.openDeleteLinkDocumentParametersDialog,
      openEditLinkDocumentParameterPage:
        linkDocumentParametersUIContext.openEditLinkDocumentParameterPage,
      openUpdateLinkDocumentParametersStatusDialog:
        linkDocumentParametersUIContext.openUpdateLinkDocumentParametersStatusDialog,
      openFetchLinkDocumentParametersDialog:
        linkDocumentParametersUIContext.openFetchLinkDocumentParametersDialog,
    };
  }, [linkDocumentParametersUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("LinkDocumentParameter.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              linkDocumentParametersUIProps.newLinkDocumentParameterButtonClick
            }
          >
            {t("LinkDocumentParameter.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LinkDocumentParametersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LinkDocumentParametersUIConsumer>
        <LinkDocumentParametersTable />
      </CardBody>
    </Card>
  );
}
