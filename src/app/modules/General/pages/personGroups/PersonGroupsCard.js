
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PersonGroupsTable } from "./personGroups-table/PersonGroupsTable";
import { usePersonGroupsUIContext, PersonGroupsUIConsumer } from "./PersonGroupsUIContext";
import { useTranslation } from 'react-i18next';

export function PersonGroupsCard() {
  const { t } = useTranslation();

  const personGroupsUIContext = usePersonGroupsUIContext();

  const personGroupsUIProps = useMemo(() => {
    return {
      ids: personGroupsUIContext.ids,
      queryParams: personGroupsUIContext.queryParams,
      setQueryParams: personGroupsUIContext.setQueryParams,
      newPersonGroupButtonClick: personGroupsUIContext.newPersonGroupButtonClick,
      openDeletePersonGroupsDialog: personGroupsUIContext.openDeletePersonGroupsDialog,
      openEditPersonGroupPage: personGroupsUIContext.openEditPersonGroupPage,
      openUpdatePersonGroupsStatusDialog: personGroupsUIContext.openUpdatePersonGroupsStatusDialog,
      openFetchPersonGroupsDialog: personGroupsUIContext.openFetchPersonGroupsDialog,
    };
  }, [personGroupsUIContext]);

  return (
    <Card>
      <CardHeader title={t("PersonGroup.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={personGroupsUIProps.newPersonGroupButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PersonGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PersonGroupsUIConsumer>
        <PersonGroupsTable />
      </CardBody>
    </Card>
  );
}