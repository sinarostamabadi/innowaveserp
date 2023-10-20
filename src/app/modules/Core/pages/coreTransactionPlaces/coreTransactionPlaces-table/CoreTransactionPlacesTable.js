import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/coreTransactionPlaces/coreTransactionPlacesActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { useCoreTransactionPlacesUIContext } from "../CoreTransactionPlacesUIContext";  
import { CoreTransactionPlaceModel } from "../../../../../../core/_models/Core/CoreTransactionPlaceModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function CoreTransactionPlacesTable() {  
  const coreTransactionPlacesUIContext = useCoreTransactionPlacesUIContext();  
  const coreTransactionPlacesUIProps = useMemo(() => {  
    return {  
      ids: coreTransactionPlacesUIContext.ids,  
      setIds: coreTransactionPlacesUIContext.setIds,  
      queryParams: coreTransactionPlacesUIContext.queryParams,  
      setQueryParams: coreTransactionPlacesUIContext.setQueryParams,  
      openEditCoreTransactionPlacePage: coreTransactionPlacesUIContext.openEditCoreTransactionPlacePage,  
      openDeleteCoreTransactionPlaceDialog: coreTransactionPlacesUIContext.openDeleteCoreTransactionPlaceDialog,  
    };  
  }, [coreTransactionPlacesUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.coreTransactionPlaces }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(CoreTransactionPlaceModel);  
  const fieldKey = getFields(CoreTransactionPlaceModel);  
  const fields = CoreTransactionPlaceModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    coreTransactionPlacesUIProps.setIds([]);  
    dispatch(actions.fetchCoreTransactionPlaces(coreTransactionPlacesUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [coreTransactionPlacesUIProps.queryParams, dispatch]);  
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
        openEditCoreTransactionPlacePage: coreTransactionPlacesUIProps.openEditCoreTransactionPlacePage,  
        openDeleteCoreTransactionPlaceDialog: coreTransactionPlacesUIProps.openDeleteCoreTransactionPlaceDialog,  
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
    sizePerPage: coreTransactionPlacesUIProps.queryParams.PageSize,  
    page: coreTransactionPlacesUIProps.queryParams.PageNumber,  
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
                  coreTransactionPlacesUIProps.setQueryParams  
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
