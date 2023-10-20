import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/people/peopleActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { usepeopleUIContext } from "../peopleUIContext";  
import { PersonModel } from "../../../../../../core/_models/Core/PersonModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function peopleTable() {  
  const peopleUIContext = usepeopleUIContext();  
  const peopleUIProps = useMemo(() => {  
    return {  
      ids: peopleUIContext.ids,  
      setIds: peopleUIContext.setIds,  
      queryParams: peopleUIContext.queryParams,  
      setQueryParams: peopleUIContext.setQueryParams,  
      openEditPersonPage: peopleUIContext.openEditPersonPage,  
      openDeletePersonDialog: peopleUIContext.openDeletePersonDialog,  
    };  
  }, [peopleUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.people }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(PersonModel);  
  const fieldKey = getFields(PersonModel);  
  const fields = PersonModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    peopleUIProps.setIds([]);  
    dispatch(actions.fetchpeople(peopleUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [peopleUIProps.queryParams, dispatch]);  
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
        openEditPersonPage: peopleUIProps.openEditPersonPage,  
        openDeletePersonDialog: peopleUIProps.openDeletePersonDialog,  
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
    sizePerPage: peopleUIProps.queryParams.PageSize,  
    page: peopleUIProps.queryParams.PageNumber,  
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
                  peopleUIProps.setQueryParams  
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
