import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeePromissoryNotes/employeePromissoryNotesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeePromissoryNotesUIContext } from "../EmployeePromissoryNotesUIContext";
import { EmployeePromissoryNoteModel } from "../../../../../../core/_models/Employment/EmployeePromissoryNoteModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeePromissoryNotesTable() {
  const { t } = useTranslation();

  const employeePromissoryNotesUIContext = useEmployeePromissoryNotesUIContext();

  const employeePromissoryNotesUIProps = useMemo(() => {
    return {
      ids: employeePromissoryNotesUIContext.ids,
      setIds: employeePromissoryNotesUIContext.setIds,
      queryParams: employeePromissoryNotesUIContext.queryParams,
      setQueryParams: employeePromissoryNotesUIContext.setQueryParams,
      openEditEmployeePromissoryNotePage: employeePromissoryNotesUIContext.openEditEmployeePromissoryNotePage,
      openDeleteEmployeePromissoryNoteDialog: employeePromissoryNotesUIContext.openDeleteEmployeePromissoryNoteDialog,
    };
  }, [employeePromissoryNotesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeePromissoryNotes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeePromissoryNoteModel);
  const fieldKey = getFields(EmployeePromissoryNoteModel);
  const fields = EmployeePromissoryNoteModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeePromissoryNotesUIProps.setIds([]);
    dispatch(actions.fetchEmployeePromissoryNotes(employeePromissoryNotesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeePromissoryNotesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeePromissoryNote." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeePromissoryNote." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeePromissoryNotePage: employeePromissoryNotesUIProps.openEditEmployeePromissoryNotePage,
        openDeleteEmployeePromissoryNoteDialog: employeePromissoryNotesUIProps.openDeleteEmployeePromissoryNoteDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: employeePromissoryNotesUIProps.queryParams.PageSize,
    page: employeePromissoryNotesUIProps.queryParams.PageNumber,
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
                  employeePromissoryNotesUIProps.setQueryParams
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