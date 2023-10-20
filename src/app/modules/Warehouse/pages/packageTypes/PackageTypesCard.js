
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PackageTypesTable } from "./packageTypes-table/PackageTypesTable";
import { usePackageTypesUIContext, PackageTypesUIConsumer } from "./PackageTypesUIContext";
import { useTranslation } from 'react-i18next';

export function PackageTypesCard() {
  const { t } = useTranslation();

  const packageTypesUIContext = usePackageTypesUIContext();

  const packageTypesUIProps = useMemo(() => {
    return {
      ids: packageTypesUIContext.ids,
      queryParams: packageTypesUIContext.queryParams,
      setQueryParams: packageTypesUIContext.setQueryParams,
      newPackageTypeButtonClick: packageTypesUIContext.newPackageTypeButtonClick,
      openDeletePackageTypesDialog: packageTypesUIContext.openDeletePackageTypesDialog,
      openEditPackageTypePage: packageTypesUIContext.openEditPackageTypePage,
      openUpdatePackageTypesStatusDialog: packageTypesUIContext.openUpdatePackageTypesStatusDialog,
      openFetchPackageTypesDialog: packageTypesUIContext.openFetchPackageTypesDialog,
    };
  }, [packageTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("PackageType.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={packageTypesUIProps.newPackageTypeButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PackageTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PackageTypesUIConsumer>
        <PackageTypesTable />
      </CardBody>
    </Card>
  );
}