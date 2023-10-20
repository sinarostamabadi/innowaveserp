import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { peopleTable } from "./people-table/peopleTable";
import {
  usepeopleUIContext,
  peopleUIConsumer,
} from "./peopleUIContext";
export function peopleCard() {
  const peopleUIContext = usepeopleUIContext();
  const peopleUIProps = useMemo(() => {
    return {
      ids: peopleUIContext.ids,
      queryParams: peopleUIContext.queryParams,
      setQueryParams: peopleUIContext.setQueryParams,
      newPersonButtonClick: peopleUIContext.newPersonButtonClick,
      openDeletepeopleDialog:  
        peopleUIContext.openDeletepeopleDialog,
      openEditPersonPage: peopleUIContext.openEditPersonPage,
      openUpdatepeopleStatusDialog:  
        peopleUIContext.openUpdatepeopleStatusDialog,
      openFetchpeopleDialog: peopleUIContext.openFetchpeopleDialog,
    };
  }, [peopleUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button  
            type="button"  
            className="btn btn-primary"  
            onClick={peopleUIProps.newPersonButtonClick}
          >
            EntityTitle  
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <peopleUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </peopleUIConsumer>
        <peopleTable />
      </CardBody>
    </Card>
  );
}
