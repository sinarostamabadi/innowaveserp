import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { BanksTable } from "./banks-table/BanksTable";
import { useBanksUIContext, BanksUIConsumer } from "./BanksUIContext";
import { useTranslation } from 'react-i18next';

export function BanksCard() {
  const {t} = useTranslation();

  const banksUIContext = useBanksUIContext();

  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      queryParams: banksUIContext.queryParams,
      setQueryParams: banksUIContext.setQueryParams,
      newBankButtonClick: banksUIContext.newBankButtonClick,
      openDeleteBanksDialog: banksUIContext.openDeleteBanksDialog,
      openEditBankPage: banksUIContext.openEditBankPage,
      openUpdateBanksStatusDialog: banksUIContext.openUpdateBanksStatusDialog,
      openFetchBanksDialog: banksUIContext.openFetchBanksDialog,
    };
  }, [banksUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Bank.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={banksUIProps.newBankButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BanksUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BanksUIConsumer>
        <BanksTable />
      </CardBody>
    </Card>
  );
}
