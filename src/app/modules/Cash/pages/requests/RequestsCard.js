import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RequestsTable } from "./requests-table/RequestsTable";
import { useRequestsUIContext, RequestsUIConsumer } from "./RequestsUIContext";
import { useTranslation } from "react-i18next";

export function RequestsCard() {
  const { t } = useTranslation();

  const requestsUIContext = useRequestsUIContext();

  const requestsUIProps = useMemo(() => {
    return {
      ids: requestsUIContext.ids,
      queryParams: requestsUIContext.queryParams,
      setQueryParams: requestsUIContext.setQueryParams,
      newRequestButtonClick: requestsUIContext.newRequestButtonClick,
      openDeleteRequestsDialog: requestsUIContext.openDeleteRequestsDialog,
      openEditRequestPage: requestsUIContext.openEditRequestPage,
      openUpdateRequestsStatusDialog:
        requestsUIContext.openUpdateRequestsStatusDialog,
      openFetchRequestsDialog: requestsUIContext.openFetchRequestsDialog,
    };
  }, [requestsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Request.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={requestsUIProps.newRequestButtonClick}
          >
            {t("Request.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RequestsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RequestsUIConsumer>
        <RequestsTable />
      </CardBody>
    </Card>
  );
}
