import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/coreTransactionTypes/coreTransactionTypesActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { useCoreTransactionTypesUIContext } from "../CoreTransactionTypesUIContext";  
import { CoreTransactionTypeModel } from "../../../../../../core/_models/Core/CoreTransactionTypeModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function CoreTransactionTypesTable() {  
  const coreTransactionTypesUIContext = useCoreTransactionTypesUIContext();  
  const coreTransactionTypesUIProps = useMemo(() => {  
    return {  
      ids: coreTransactionTypesUIContext.ids,  
      setIds: coreTransactionTypesUIContext.setIds,  
      queryParams: coreTransactionTypesUIContext.queryParams,  
      setQueryParams: coreTransactionTypesUIContext.setQueryParams,  
      openEditCoreTransactionTypePage: coreTransactionTypesUIContext.openEditCoreTransactionTypePage,  
      openDeleteCoreTransactionTypeDialog: coreTransactionTypesUIContext.openDeleteCoreTransactionTypeDialog,  
    };  
  }, [coreTransactionTypesUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.coreTransactionTypes }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(CoreTransactionTypeModel);  
  const fieldKey = getFields(CoreTransactionTypeModel);  
  const fields = CoreTransactionTypeModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    coreTransactionTypesUIProps.setIds([]);  
    dispatch(actions.fetchCoreTransactionTypes(coreTransactionTypesUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [coreTransactionTypesUIProps.queryParams, dispatch]);  
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
        openEditCoreTransactionTypePage: coreTransactionTypesUIProps.openEditCoreTransactionTypePage,  
        openDeleteCoreTransactionTypeDialog: coreTransactionTypesUIProps.openDeleteCoreTransactionTypeDialog,  
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
    sizePerPage: coreTransactionTypesUIProps.queryParams.PageSize,  
    page: coreTransactionTypesUIProps.queryParams.PageNumber,  
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
                  coreTransactionTypesUIProps.setQueryParams  
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
