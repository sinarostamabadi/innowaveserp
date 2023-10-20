
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EntityPointsTable } from "./entityPoints-table/EntityPointsTable";
import { useEntityPointsUIContext, EntityPointsUIConsumer } from "./EntityPointsUIContext";
import { useTranslation } from 'react-i18next';

export function EntityPointsCard() {
  const { t } = useTranslation();

  const entityPointsUIContext = useEntityPointsUIContext();

  const entityPointsUIProps = useMemo(() => {
    return {
      ids: entityPointsUIContext.ids,
      queryParams: entityPointsUIContext.queryParams,
      setQueryParams: entityPointsUIContext.setQueryParams,
      newEntityPointButtonClick: entityPointsUIContext.newEntityPointButtonClick,
      openDeleteEntityPointsDialog: entityPointsUIContext.openDeleteEntityPointsDialog,
      openEditEntityPointPage: entityPointsUIContext.openEditEntityPointPage,
      openUpdateEntityPointsStatusDialog: entityPointsUIContext.openUpdateEntityPointsStatusDialog,
      openFetchEntityPointsDialog: entityPointsUIContext.openFetchEntityPointsDialog,
    };
  }, [entityPointsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EntityPoint.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={entityPointsUIProps.newEntityPointButtonClick}
          >
            {t("EntityPoint.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EntityPointsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EntityPointsUIConsumer>
        <EntityPointsTable />
      </CardBody>
    </Card>
  );
}