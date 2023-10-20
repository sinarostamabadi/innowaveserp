
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AddressCategoriesTable } from "./addressCategories-table/AddressCategoriesTable";
import { useAddressCategoriesUIContext, AddressCategoriesUIConsumer } from "./AddressCategoriesUIContext";
import { useTranslation } from 'react-i18next';

export function AddressCategoriesCard() {
  const { t } = useTranslation();

  const addressCategoriesUIContext = useAddressCategoriesUIContext();

  const addressCategoriesUIProps = useMemo(() => {
    return {
      ids: addressCategoriesUIContext.ids,
      queryParams: addressCategoriesUIContext.queryParams,
      setQueryParams: addressCategoriesUIContext.setQueryParams,
      newAddressCategoryButtonClick: addressCategoriesUIContext.newAddressCategoryButtonClick,
      openDeleteAddressCategoriesDialog: addressCategoriesUIContext.openDeleteAddressCategoriesDialog,
      openEditAddressCategoryPage: addressCategoriesUIContext.openEditAddressCategoryPage,
      openUpdateAddressCategoriesStatusDialog: addressCategoriesUIContext.openUpdateAddressCategoriesStatusDialog,
      openFetchAddressCategoriesDialog: addressCategoriesUIContext.openFetchAddressCategoriesDialog,
    };
  }, [addressCategoriesUIContext]);

  return (
    <Card>
      <CardHeader title={t("AddressCategory.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addressCategoriesUIProps.newAddressCategoryButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AddressCategoriesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AddressCategoriesUIConsumer>
        <AddressCategoriesTable />
      </CardBody>
    </Card>
  );
}
