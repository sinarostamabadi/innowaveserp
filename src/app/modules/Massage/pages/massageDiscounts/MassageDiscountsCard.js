
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageDiscountsTable } from "./massageDiscounts-table/MassageDiscountsTable";
import { useMassageDiscountsUIContext, MassageDiscountsUIConsumer } from "./MassageDiscountsUIContext";
import { useTranslation } from 'react-i18next';

export function MassageDiscountsCard() {
  const { t } = useTranslation();

  const massageDiscountsUIContext = useMassageDiscountsUIContext();

  const massageDiscountsUIProps = useMemo(() => {
    return {
      ids: massageDiscountsUIContext.ids,
      queryParams: massageDiscountsUIContext.queryParams,
      setQueryParams: massageDiscountsUIContext.setQueryParams,
      newMassageDiscountButtonClick: massageDiscountsUIContext.newMassageDiscountButtonClick,
      openDeleteMassageDiscountsDialog: massageDiscountsUIContext.openDeleteMassageDiscountsDialog,
      openEditMassageDiscountPage: massageDiscountsUIContext.openEditMassageDiscountPage,
      openUpdateMassageDiscountsStatusDialog: massageDiscountsUIContext.openUpdateMassageDiscountsStatusDialog,
      openFetchMassageDiscountsDialog: massageDiscountsUIContext.openFetchMassageDiscountsDialog,
    };
  }, [massageDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("MassageDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={massageDiscountsUIProps.newMassageDiscountButtonClick}
          >
            {t("MassageDiscount.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageDiscountsUIConsumer>
        <MassageDiscountsTable />
      </CardBody>
    </Card>
  );
}