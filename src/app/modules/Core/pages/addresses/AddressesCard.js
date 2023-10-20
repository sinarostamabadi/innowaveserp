import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AddressesTable } from "./addresses-table/AddressesTable";
import {
  useAddressesUIContext,
  AddressesUIConsumer,
} from "./AddressesUIContext";
export function AddressesCard() {
  const addressesUIContext = useAddressesUIContext();
  const addressesUIProps = useMemo(() => {
    return {
      ids: addressesUIContext.ids,
      queryParams: addressesUIContext.queryParams,
      setQueryParams: addressesUIContext.setQueryParams,
      newAddressButtonClick: addressesUIContext.newAddressButtonClick,
      openDeleteAddressesDialog:  
        addressesUIContext.openDeleteAddressesDialog,
      openEditAddressPage: addressesUIContext.openEditAddressPage,
      openUpdateAddressesStatusDialog:  
        addressesUIContext.openUpdateAddressesStatusDialog,
      openFetchAddressesDialog: addressesUIContext.openFetchAddressesDialog,
    };
  }, [addressesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button  
            type="button"  
            className="btn btn-primary"  
            onClick={addressesUIProps.newAddressButtonClick}
          >
            EntityTitle  
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AddressesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AddressesUIConsumer>
        <AddressesTable />
      </CardBody>
    </Card>
  );
}
