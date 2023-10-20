
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RelationTypesTable } from "./relationTypes-table/RelationTypesTable";
import { useRelationTypesUIContext, RelationTypesUIConsumer } from "./RelationTypesUIContext";
import { useTranslation } from 'react-i18next';

export function RelationTypesCard() {
  const { t } = useTranslation();

  const relationTypesUIContext = useRelationTypesUIContext();

  const relationTypesUIProps = useMemo(() => {
    return {
      ids: relationTypesUIContext.ids,
      queryParams: relationTypesUIContext.queryParams,
      setQueryParams: relationTypesUIContext.setQueryParams,
      newRelationTypeButtonClick: relationTypesUIContext.newRelationTypeButtonClick,
      openDeleteRelationTypesDialog: relationTypesUIContext.openDeleteRelationTypesDialog,
      openEditRelationTypePage: relationTypesUIContext.openEditRelationTypePage,
      openUpdateRelationTypesStatusDialog: relationTypesUIContext.openUpdateRelationTypesStatusDialog,
      openFetchRelationTypesDialog: relationTypesUIContext.openFetchRelationTypesDialog,
    };
  }, [relationTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RelationType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={relationTypesUIProps.newRelationTypeButtonClick}
          >
            {t("RelationType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RelationTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RelationTypesUIConsumer>
        <RelationTypesTable />
      </CardBody>
    </Card>
  );
}