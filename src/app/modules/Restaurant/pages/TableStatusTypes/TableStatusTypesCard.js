
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TableStatusTypesTable } from "./tableStatusTypes-table/TableStatusTypesTable";
import { useTableStatusTypesUIContext, TableStatusTypesUIConsumer } from "./TableStatusTypesUIContext";
import { useTranslation } from 'react-i18next';

export function TableStatusTypesCard() {
  const { t } = useTranslation();

  const tableStatusTypesUIContext = useTableStatusTypesUIContext();

  const tableStatusTypesUIProps = useMemo(() => {
    return {
      ids: tableStatusTypesUIContext.ids,
      queryParams: tableStatusTypesUIContext.queryParams,
      setQueryParams: tableStatusTypesUIContext.setQueryParams,
      newTableStatusTypeButtonClick: tableStatusTypesUIContext.newTableStatusTypeButtonClick,
      openDeleteTableStatusTypesDialog: tableStatusTypesUIContext.openDeleteTableStatusTypesDialog,
      openEditTableStatusTypePage: tableStatusTypesUIContext.openEditTableStatusTypePage,
      openUpdateTableStatusTypesStatusDialog: tableStatusTypesUIContext.openUpdateTableStatusTypesStatusDialog,
      openFetchTableStatusTypesDialog: tableStatusTypesUIContext.openFetchTableStatusTypesDialog,
    };
  }, [tableStatusTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("TableStatusType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={tableStatusTypesUIProps.newTableStatusTypeButtonClick}
          >
            {t("TableStatusType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TableStatusTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TableStatusTypesUIConsumer>
        <TableStatusTypesTable />
      </CardBody>
    </Card>
  );
}