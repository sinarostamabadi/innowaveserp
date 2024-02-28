import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingDiscountsTable } from "./bodyBuildingDiscounts-table/BodyBuildingDiscountsTable";
import {
  useBodyBuildingDiscountsUIContext,
  BodyBuildingDiscountsUIConsumer,
} from "./BodyBuildingDiscountsUIContext";
import { useTranslation } from "react-i18next";

export function BodyBuildingDiscountsCard() {
  const { t } = useTranslation();

  const bodyBuildingDiscountsUIContext = useBodyBuildingDiscountsUIContext();

  const bodyBuildingDiscountsUIProps = useMemo(() => {
    return {
      ids: bodyBuildingDiscountsUIContext.ids,
      queryParams: bodyBuildingDiscountsUIContext.queryParams,
      setQueryParams: bodyBuildingDiscountsUIContext.setQueryParams,
      newBodyBuildingDiscountButtonClick:
        bodyBuildingDiscountsUIContext.newBodyBuildingDiscountButtonClick,
      openDeleteBodyBuildingDiscountsDialog:
        bodyBuildingDiscountsUIContext.openDeleteBodyBuildingDiscountsDialog,
      openEditBodyBuildingDiscountPage:
        bodyBuildingDiscountsUIContext.openEditBodyBuildingDiscountPage,
      openUpdateBodyBuildingDiscountsStatusDialog:
        bodyBuildingDiscountsUIContext.openUpdateBodyBuildingDiscountsStatusDialog,
      openFetchBodyBuildingDiscountsDialog:
        bodyBuildingDiscountsUIContext.openFetchBodyBuildingDiscountsDialog,
    };
  }, [bodyBuildingDiscountsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingDiscount.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              bodyBuildingDiscountsUIProps.newBodyBuildingDiscountButtonClick
            }
          >
            {t("BodyBuildingDiscount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingDiscountsUIConsumer>
        <BodyBuildingDiscountsTable />
      </CardBody>
    </Card>
  );
}
