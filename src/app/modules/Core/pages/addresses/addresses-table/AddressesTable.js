import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/addresses/addressesActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { useAddressesUIContext } from "../AddressesUIContext";  
import { AddressModel } from "../../../../../../core/_models/Core/AddressModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function AddressesTable() {  
  const addressesUIContext = useAddressesUIContext();  
  const addressesUIProps = useMemo(() => {  
    return {  
      ids: addressesUIContext.ids,  
      setIds: addressesUIContext.setIds,  
      queryParams: addressesUIContext.queryParams,  
      setQueryParams: addressesUIContext.setQueryParams,  
      openEditAddressPage: addressesUIContext.openEditAddressPage,  
      openDeleteAddressDialog: addressesUIContext.openDeleteAddressDialog,  
    };  
  }, [addressesUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.addresses }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(AddressModel);  
  const fieldKey = getFields(AddressModel);  
  const fields = AddressModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    addressesUIProps.setIds([]);  
    dispatch(actions.fetchAddresses(addressesUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [addressesUIProps.queryParams, dispatch]);  
  const columns = [  
    {  
      dataField: fieldKey.TitleFa,  
      text: fields.TitleFa.display,  
      sort: fields.TitleFa.sortable,  
      sortCaret: sortCaret,  
    },  
    {  
      dataField: fieldKey.TitleEn,  
      text: fields.TitleEn.display,  
      sort: fields.TitleEn.sortable,  
      sortCaret: sortCaret,  
    },  
    {  
      dataField: "action",  
      text: "??????",  
      formatter: columnFormatters.ActionsColumnFormatter,  
      formatExtraData: {  
        openEditAddressPage: addressesUIProps.openEditAddressPage,  
        openDeleteAddressDialog: addressesUIProps.openDeleteAddressDialog,  
      },  
      classes: "text-right pr-0",  
      headerClasses: "text-right pr-3",  
      style: {  
        minWidth: "100px",  
      },  
    },  
  ];  
  console.log("configs ^>^> ", configs);  
  console.log("fieldKey ^>^> ", fieldKey);  
  console.log("columns ^> ", columns);  
  const paginationOptions = {  
    custom: true,  
    totalSize: totalCount,  
    sizePerPageList: configs.sizePerPageList,  
    sizePerPage: addressesUIProps.queryParams.PageSize,  
    page: addressesUIProps.queryParams.PageNumber,  
  };  
  return (  
    <>  
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>  
        {({ paginationProps, paginationTableProps }) => {  
          return (  
            <Pagination  
              isLoading={listLoading}  
              paginationProps={paginationProps}  
            >  
              <BootstrapTable  
                wrapperClasses="table-responsive"  
                classes="table table-head-custom table-vertical-center"  
                bootstrap4  
                bordered={false}  
                remote  
                keyField={configs.id}  
                data={entities === null ? [] : entities}  
                columns={columns}  
                defaultSorted={configs.defaultSorted}  
                onTableChange={getHandlerTableChange(  
                  addressesUIProps.setQueryParams  
                )}  
                {...paginationTableProps}  
              >  
                <PleaseWaitMessage entities={entities} />  
                <NoRecordsFoundMessage entities={entities} />  
              </BootstrapTable>  
            </Pagination>  
          );  
        }}  
      </PaginationProvider>  
    </>  
  );  
}  
