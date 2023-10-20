
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PhoneTypesTable } from "./phoneTypes-table/PhoneTypesTable";
import { usePhoneTypesUIContext, PhoneTypesUIConsumer } from "./PhoneTypesUIContext";
import { useTranslation } from 'react-i18next';

export function PhoneTypesCard() {
  const { t } = useTranslation();

  const phoneTypesUIContext = usePhoneTypesUIContext();

  const phoneTypesUIProps = useMemo(() => {
    return {
      ids: phoneTypesUIContext.ids,
      queryParams: phoneTypesUIContext.queryParams,
      setQueryParams: phoneTypesUIContext.setQueryParams,
      newPhoneTypeButtonClick: phoneTypesUIContext.newPhoneTypeButtonClick,
      openDeletePhoneTypesDialog: phoneTypesUIContext.openDeletePhoneTypesDialog,
      openEditPhoneTypePage: phoneTypesUIContext.openEditPhoneTypePage,
      openUpdatePhoneTypesStatusDialog: phoneTypesUIContext.openUpdatePhoneTypesStatusDialog,
      openFetchPhoneTypesDialog: phoneTypesUIContext.openFetchPhoneTypesDialog,
    };
  }, [phoneTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("PhoneType.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={phoneTypesUIProps.newPhoneTypeButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PhoneTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PhoneTypesUIConsumer>
        <PhoneTypesTable />
      </CardBody>
    </Card>
  );
}