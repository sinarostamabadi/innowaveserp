import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RequestDtlsTable } from "./requestDtls-table/RequestDtlsTable";
import {
  useRequestDtlsUIContext,
  RequestDtlsUIConsumer,
} from "./RequestDtlsUIContext";
import { useTranslation } from "react-i18next";

export function RequestDtlsCard() {
  const { t } = useTranslation();

  const requestDtlsUIContext = useRequestDtlsUIContext();

  const requestDtlsUIProps = useMemo(() => {
    return {
      ids: requestDtlsUIContext.ids,
      queryParams: requestDtlsUIContext.queryParams,
      setQueryParams: requestDtlsUIContext.setQueryParams,
      newRequestDtlButtonClick: requestDtlsUIContext.newRequestDtlButtonClick,
      openDeleteRequestDtlsDialog:
        requestDtlsUIContext.openDeleteRequestDtlsDialog,
      openEditRequestDtlPage: requestDtlsUIContext.openEditRequestDtlPage,
      openUpdateRequestDtlsStatusDialog:
        requestDtlsUIContext.openUpdateRequestDtlsStatusDialog,
      openFetchRequestDtlsDialog:
        requestDtlsUIContext.openFetchRequestDtlsDialog,
    };
  }, [requestDtlsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("RequestDtl.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={requestDtlsUIProps.newRequestDtlButtonClick}
          >
            {t("RequestDtl.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RequestDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RequestDtlsUIConsumer>
        <RequestDtlsTable />
      </CardBody>
    </Card>
  );
}
