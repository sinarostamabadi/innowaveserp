import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PhonesTable } from "./phones-table/PhonesTable";
import { usePhonesUIContext, PhonesUIConsumer } from "./PhonesUIContext";
export function PhonesCard() {
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      ids: phonesUIContext.ids,
      queryParams: phonesUIContext.queryParams,
      setQueryParams: phonesUIContext.setQueryParams,
      newPhoneButtonClick: phonesUIContext.newPhoneButtonClick,
      openDeletePhonesDialog: phonesUIContext.openDeletePhonesDialog,
      openEditPhonePage: phonesUIContext.openEditPhonePage,
      openUpdatePhonesStatusDialog:
        phonesUIContext.openUpdatePhonesStatusDialog,
      openFetchPhonesDialog: phonesUIContext.openFetchPhonesDialog,
    };
  }, [phonesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={phonesUIProps.newPhoneButtonClick}
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PhonesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PhonesUIConsumer>
        <PhonesTable />
      </CardBody>
    </Card>
  );
}
