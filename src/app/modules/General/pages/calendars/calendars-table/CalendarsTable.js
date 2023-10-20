import React, { useEffect, useMemo } from "react";   
import BootstrapTable from "react-bootstrap-table-next";  
import paginationFactory, {  
  PaginationProvider,  
} from "react-bootstrap-table2-paginator";  
import { shallowEqual, useDispatch, useSelector } from "react-redux";  
import * as actions from "../../../_redux/calendars/calendarsActions";  
import {  
  getHandlerTableChange,  
  NoRecordsFoundMessage,  
  PleaseWaitMessage,  
  sortCaret,  
} from "../../../../../../core/_helpers";  
import * as columnFormatters from "./column-formatters";  
import { Pagination } from "../../../../../../core/_partials/controls";  
import { useCalendarsUIContext } from "../CalendarsUIContext";  
import { CalendarModel } from "../../../../../../core/_models/General/CalendarModel";  
import {  
  getConfig,  
  getFields,  
} from "../../../../../../core/_models/ModelDescriber";  
export function CalendarsTable() {  
  const calendarsUIContext = useCalendarsUIContext();  
  const calendarsUIProps = useMemo(() => {  
    return {  
      ids: calendarsUIContext.ids,  
      setIds: calendarsUIContext.setIds,  
      queryParams: calendarsUIContext.queryParams,  
      setQueryParams: calendarsUIContext.setQueryParams,  
      openEditCalendarPage: calendarsUIContext.openEditCalendarPage,  
      openDeleteCalendarDialog: calendarsUIContext.openDeleteCalendarDialog,  
    };  
  }, [calendarsUIContext]);  
  const { currentState } = useSelector(  
    (state) => ({ currentState: state.calendars }),  
    shallowEqual  
  );  
  const { totalCount, entities, listLoading } = currentState;  
  const configs = getConfig(CalendarModel);  
  const fieldKey = getFields(CalendarModel);  
  const fields = CalendarModel;  
  const dispatch = useDispatch();  
  useEffect(() => {  
    calendarsUIProps.setIds([]);  
    dispatch(actions.fetchCalendars(calendarsUIProps.queryParams));  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [calendarsUIProps.queryParams, dispatch]);  
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
        openEditCalendarPage: calendarsUIProps.openEditCalendarPage,  
        openDeleteCalendarDialog: calendarsUIProps.openDeleteCalendarDialog,  
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
    sizePerPage: calendarsUIProps.queryParams.PageSize,  
    page: calendarsUIProps.queryParams.PageNumber,  
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
                  calendarsUIProps.setQueryParams  
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
