import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ErrorHandlersTable } from "./errorHandlers-table/ErrorHandlersTable";
import {
  useErrorHandlersUIContext,
  ErrorHandlersUIConsumer,
} from "./ErrorHandlersUIContext";
export function ErrorHandlersCard() {
  const errorHandlersUIContext = useErrorHandlersUIContext();
  const errorHandlersUIProps = useMemo(() => {
    return {
      ids: errorHandlersUIContext.ids,
      queryParams: errorHandlersUIContext.queryParams,
      setQueryParams: errorHandlersUIContext.setQueryParams,
      newErrorHandlerButtonClick:
        errorHandlersUIContext.newErrorHandlerButtonClick,
      openDeleteErrorHandlersDialog:
        errorHandlersUIContext.openDeleteErrorHandlersDialog,
      openEditErrorHandlerPage: errorHandlersUIContext.openEditErrorHandlerPage,
      openUpdateErrorHandlersStatusDialog:
        errorHandlersUIContext.openUpdateErrorHandlersStatusDialog,
      openFetchErrorHandlersDialog:
        errorHandlersUIContext.openFetchErrorHandlersDialog,
    };
  }, [errorHandlersUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={errorHandlersUIProps.newErrorHandlerButtonClick}
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ErrorHandlersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ErrorHandlersUIConsumer>
        <ErrorHandlersTable />
      </CardBody>
    </Card>
  );
}
