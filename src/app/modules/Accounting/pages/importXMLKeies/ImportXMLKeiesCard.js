import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ImportXMLKeiesTable } from "./importXMLKeies-table/ImportXMLKeiesTable";
import {
  useImportXMLKeiesUIContext,
  ImportXMLKeiesUIConsumer,
} from "./ImportXMLKeiesUIContext";
import { useTranslation } from "react-i18next";

export function ImportXMLKeiesCard() {
  const { t } = useTranslation();

  const importXMLKeiesUIContext = useImportXMLKeiesUIContext();

  const importXMLKeiesUIProps = useMemo(() => {
    return {
      ids: importXMLKeiesUIContext.ids,
      queryParams: importXMLKeiesUIContext.queryParams,
      setQueryParams: importXMLKeiesUIContext.setQueryParams,
      newImportXMLKeyButtonClick:
        importXMLKeiesUIContext.newImportXMLKeyButtonClick,
      openDeleteImportXMLKeiesDialog:
        importXMLKeiesUIContext.openDeleteImportXMLKeiesDialog,
      openEditImportXMLKeyPage:
        importXMLKeiesUIContext.openEditImportXMLKeyPage,
      openUpdateImportXMLKeiesStatusDialog:
        importXMLKeiesUIContext.openUpdateImportXMLKeiesStatusDialog,
      openFetchImportXMLKeiesDialog:
        importXMLKeiesUIContext.openFetchImportXMLKeiesDialog,
    };
  }, [importXMLKeiesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("ImportXMLKey.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={importXMLKeiesUIProps.newImportXMLKeyButtonClick}
          >
            {t("ImportXMLKey.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImportXMLKeiesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ImportXMLKeiesUIConsumer>
        <ImportXMLKeiesTable />
      </CardBody>
    </Card>
  );
}
