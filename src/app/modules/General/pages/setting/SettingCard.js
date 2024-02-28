import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SettingTable } from "./setting-table/SettingTable";
import { useSettingUIContext, SettingUIConsumer } from "./SettingUIContext";
import { useTranslation } from "react-i18next";

export function SettingCard() {
  const { t } = useTranslation();

  const settingUIContext = useSettingUIContext();

  const settingUIProps = useMemo(() => {
    return {
      ids: settingUIContext.ids,
      queryParams: settingUIContext.queryParams,
      setQueryParams: settingUIContext.setQueryParams,
      newSettingButtonClick: settingUIContext.newSettingButtonClick,
      openDeleteSettingDialog: settingUIContext.openDeleteSettingDialog,
      openEditSettingPage: settingUIContext.openEditSettingPage,
      openUpdateSettingStatusDialog:
        settingUIContext.openUpdateSettingStatusDialog,
      openFetchSettingDialog: settingUIContext.openFetchSettingDialog,
    };
  }, [settingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Setting.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={settingUIProps.newSettingButtonClick}
          >
            {t("Setting.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SettingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SettingUIConsumer>
        <SettingTable />
      </CardBody>
    </Card>
  );
}
