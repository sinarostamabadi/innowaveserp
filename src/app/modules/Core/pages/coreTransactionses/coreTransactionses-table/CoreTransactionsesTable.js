import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/coreTransactionses/coreTransactionsesActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { useCoreTransactionsesUIContext } from "../CoreTransactionsesUIContext";  
import { CoreTransactionsModel } from "../../../../../../core/_models/Core/CoreTransactionsModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function CoreTransactionsesTable() {  
  const coreTransactionsesUIContext = useCoreTransactionsesUIContext();  
  const coreTransactionsesUIProps = useMemo(() => {  
    return {  
      ids: coreTransactionsesUIContext.ids,  
      setIds: coreTransactionsesUIContext.setIds,  
      queryParams: coreTransactionsesUIContext.queryParams,  
      setQueryParams: coreTransactionsesUIContext.setQueryParams,  
      openEditCoreTransactionsPage: coreTransactionsesUIContext.openEditCoreTransactionsPage,  
      openDeleteCoreTransactionsDialog: coreTransactionsesUIContext.openDeleteCoreTransactionsDialog,  
    };  
  }, [coreTransactionsesUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.coreTransactionses }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(CoreTransactionsModel);  
  const fieldKey = getFields(CoreTransactionsModel);  
  const fields = CoreTransactionsModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    coreTransactionsesUIProps.setIds([]);  
    dispatch(actions.fetchCoreTransactionses(coreTransactionsesUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [coreTransactionsesUIProps.queryParams, dispatch]);  
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
        openEditCoreTransactionsPage: coreTransactionsesUIProps.openEditCoreTransactionsPage,  
        openDeleteCoreTransactionsDialog: coreTransactionsesUIProps.openDeleteCoreTransactionsDialog,  
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
    sizePerPage: coreTransactionsesUIProps.queryParams.PageSize,  
    page: coreTransactionsesUIProps.queryParams.PageNumber,  
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
                  coreTransactionsesUIProps.setQueryParams  
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
