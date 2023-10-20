import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import RealPersonsTable from "./realPersons-table/RealPersonsTable";
import {
  useRealPersonsUIContext,
  RealPersonsUIConsumer,
} from "./RealPersonsUIContext";
import { useTranslation } from 'react-i18next';

export function RealPersonsCard() {
  const {t} = useTranslation();
  
  const realPersonsUIContext = useRealPersonsUIContext();
  const realPersonsUIProps = useMemo(() => {
    return {
      ids: realPersonsUIContext.ids,
      queryParams: realPersonsUIContext.queryParams,
      setQueryParams: realPersonsUIContext.setQueryParams,
      newRealPersonButtonClick: realPersonsUIContext.newRealPersonButtonClick,
      openDeleteRealPersonsDialog:  
        realPersonsUIContext.openDeleteRealPersonsDialog,
      openEditRealPersonPage: realPersonsUIContext.openEditRealPersonPage,
      openUpdateRealPersonsStatusDialog:  
        realPersonsUIContext.openUpdateRealPersonsStatusDialog,
      openFetchRealPersonsDialog: realPersonsUIContext.openFetchRealPersonsDialog,
    };
  }, [realPersonsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RealPerson.Entity")}>
        <CardHeaderToolbar>
          <button  
            type="button"  
            className="btn btn-primary"  
            onClick={realPersonsUIProps.newRealPersonButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RealPersonsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RealPersonsUIConsumer>
        <RealPersonsTable />
      </CardBody>
    </Card>
  );
}
