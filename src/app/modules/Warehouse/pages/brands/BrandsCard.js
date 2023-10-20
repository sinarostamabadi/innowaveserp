
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BrandsTable } from "./brands-table/BrandsTable";
import { useBrandsUIContext, BrandsUIConsumer } from "./BrandsUIContext";
import { useTranslation } from 'react-i18next';

export function BrandsCard() {
  const { t } = useTranslation();

  const brandsUIContext = useBrandsUIContext();

  const brandsUIProps = useMemo(() => {
    return {
      ids: brandsUIContext.ids,
      queryParams: brandsUIContext.queryParams,
      setQueryParams: brandsUIContext.setQueryParams,
      newBrandButtonClick: brandsUIContext.newBrandButtonClick,
      openDeleteBrandsDialog: brandsUIContext.openDeleteBrandsDialog,
      openEditBrandPage: brandsUIContext.openEditBrandPage,
      openUpdateBrandsStatusDialog: brandsUIContext.openUpdateBrandsStatusDialog,
      openFetchBrandsDialog: brandsUIContext.openFetchBrandsDialog,
    };
  }, [brandsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Brand.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={brandsUIProps.newBrandButtonClick}
          >
            {t("Brand.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BrandsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BrandsUIConsumer>
        <BrandsTable />
      </CardBody>
    </Card>
  );
}