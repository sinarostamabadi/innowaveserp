import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/assignments/assignmentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAssignmentsUIContext } from "../AssignmentsUIContext";
import { AssignmentModel } from "../../../../../../core/_models/Warehouse/AssignmentModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AssignmentsTable() {
  const { t } = useTranslation();

  const assignmentsUIContext = useAssignmentsUIContext();

  const assignmentsUIProps = useMemo(() => {
    return {
      ids: assignmentsUIContext.ids,
      setIds: assignmentsUIContext.setIds,
      queryParams: assignmentsUIContext.queryParams,
      setQueryParams: assignmentsUIContext.setQueryParams,
      openEditAssignmentPage: assignmentsUIContext.openEditAssignmentPage,
      openDeleteAssignmentDialog: assignmentsUIContext.openDeleteAssignmentDialog,
    };
  }, [assignmentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.assignments }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AssignmentModel, "AssignmentDate", "desc");
  const fieldKey = getFields(AssignmentModel);
  const fields = AssignmentModel;

  const dispatch = useDispatch();
  useEffect(() => {
    assignmentsUIProps.setIds([]);
    dispatch(actions.fetchAssignments(assignmentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.AssignmentNo,
      text: t("Assignment." + fields.AssignmentNo.display),
      sort: fields.AssignmentNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Year.Title",
      text: t("Assignment.Year"),
      sort: fields.YearId.sortable,
      sortCaret: sortCaret,
    },   
    {
      dataField: "AssignmentType.Title",
      text: t("Assignment.AssignmentType"),
      sort: fields.AssignmentTypeId.sortable,
      sortCaret: sortCaret,
    },    
    {
      dataField: "Warehouse.Title",
      text: t("Assignment.Warehouse"),
      sort: fields.WarehouseId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.AssignmentDate,
      text: t("Assignment." + fields.AssignmentDate.display),
      sort: fields.AssignmentDate.sortable,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFaColumnFormatter,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("Assignment.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },        
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAssignmentPage: assignmentsUIProps.openEditAssignmentPage,
        openDeleteAssignmentDialog: assignmentsUIProps.openDeleteAssignmentDialog,
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
    sizePerPage: assignmentsUIProps.queryParams.PageSize,
    page: assignmentsUIProps.queryParams.PageNumber,
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
                  assignmentsUIProps.setQueryParams
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