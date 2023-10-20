// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/addresses/addressesActions";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./AddressesUIHelper";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { useAddressesUIContext } from "./AddressesUIContext";
import { useTranslation } from "react-i18next";

export function AddressesTable() {
  const { t } = useTranslation();

  // Specs UI Context
  const addressesUIContext = useAddressesUIContext();
  const addressesUIProps = useMemo(() => {
    return {
      activeAddresses: addressesUIContext.activeAddresses,
      addAddress: addressesUIContext.addAddress,
      totalCount: addressesUIContext.totalCount,
      actionsLoading: addressesUIContext.actionsLoading,
      queryParams: addressesUIContext.queryParams,
      setQueryParams: addressesUIContext.setQueryParams,
      openEditAddressDialog: addressesUIContext.openEditAddressDialog,
      openDeleteAddressDialog: addressesUIContext.openDeleteAddressDialog,
      ids: addressesUIContext.ids,
      setIds: addressesUIContext.setIds,
      personId: addressesUIContext.personId,
    };
  }, [addressesUIContext]);

  const columns = [
    {
      dataField: "AddressCategory.Title",
      text: t("Address.AddressCategory"),
      sort: false,
    },
    {
      dataField: "City.TitleFa",
      text: t("Address.City"),
      sort: false,
    },
    {
      dataField: "AddressFa",
      text: t("Address.AddressFa"),
      sort: false,
    },
    {
      dataField: "PostalCode",
      text: t("Address.PostalCode"),
      sort: false,
    }, 
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditAddressDialog: addressesUIProps.openEditAddressDialog,
        openDeleteAddressDialog: addressesUIProps.openDeleteAddressDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: addressesUIProps.totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: addressesUIProps.queryParams.PageSize,
    page: addressesUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={addressesUIProps.listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="AddressId"
                data={addressesUIProps.activeAddresses === null ? [] : addressesUIProps.activeAddresses}
                columns={columns}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={addressesUIProps.activeAddresses} />
                <NoRecordsFoundMessage entities={addressesUIProps.activeAddresses} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
