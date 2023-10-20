
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ImportXMLSettingTable } from "./importXMLSetting-table/ImportXMLSettingTable";
import { useImportXMLSettingUIContext, ImportXMLSettingUIConsumer } from "./ImportXMLSettingUIContext";
import { useTranslation } from 'react-i18next';

export function ImportXMLSettingCard() {
  const { t } = useTranslation();

  const importXMLSettingUIContext = useImportXMLSettingUIContext();

  const importXMLSettingUIProps = useMemo(() => {
    return {
      ids: importXMLSettingUIContext.ids,
      queryParams: importXMLSettingUIContext.queryParams,
      setQueryParams: importXMLSettingUIContext.setQueryParams,
      newImportXMLSettingButtonClick: importXMLSettingUIContext.newImportXMLSettingButtonClick,
      openDeleteImportXMLSettingDialog: importXMLSettingUIContext.openDeleteImportXMLSettingDialog,
      openEditImportXMLSettingPage: importXMLSettingUIContext.openEditImportXMLSettingPage,
      openUpdateImportXMLSettingStatusDialog: importXMLSettingUIContext.openUpdateImportXMLSettingStatusDialog,
      openFetchImportXMLSettingDialog: importXMLSettingUIContext.openFetchImportXMLSettingDialog,
    };
  }, [importXMLSettingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ImportXMLSetting.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={importXMLSettingUIProps.newImportXMLSettingButtonClick}
          >
            {t("ImportXMLSetting.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImportXMLSettingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ImportXMLSettingUIConsumer>
        <ImportXMLSettingTable />
      </CardBody>
    </Card>
  );
}