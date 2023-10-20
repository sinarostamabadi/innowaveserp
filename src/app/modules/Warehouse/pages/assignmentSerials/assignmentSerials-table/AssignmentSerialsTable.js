import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/assignmentSerials/assignmentSerialsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAssignmentSerialsUIContext } from "../AssignmentSerialsUIContext";
import { AssignmentSerialModel } from "../../../../../../core/_models/Warehouse/AssignmentSerialModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AssignmentSerialsTable() {
  const { t } = useTranslation();

  const assignmentSerialsUIContext = useAssignmentSerialsUIContext();

  const assignmentSerialsUIProps = useMemo(() => {
    return {
      ids: assignmentSerialsUIContext.ids,
      setIds: assignmentSerialsUIContext.setIds,
      queryParams: assignmentSerialsUIContext.queryParams,
      setQueryParams: assignmentSerialsUIContext.setQueryParams,
      openEditAssignmentSerialPage: assignmentSerialsUIContext.openEditAssignmentSerialPage,
      openDeleteAssignmentSerialDialog: assignmentSerialsUIContext.openDeleteAssignmentSerialDialog,
    };
  }, [assignmentSerialsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.assignmentSerials }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AssignmentSerialModel);
  const fieldKey = getFields(AssignmentSerialModel);
  const fields = AssignmentSerialModel;

  const dispatch = useDispatch();
  useEffect(() => {
    assignmentSerialsUIProps.setIds([]);
    dispatch(actions.fetchAssignmentSerials(assignmentSerialsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentSerialsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("AssignmentSerial." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("AssignmentSerial." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAssignmentSerialPage: assignmentSerialsUIProps.openEditAssignmentSerialPage,
        openDeleteAssignmentSerialDialog: assignmentSerialsUIProps.openDeleteAssignmentSerialDialog,
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
    sizePerPage: assignmentSerialsUIProps.queryParams.PageSize,
    page: assignmentSerialsUIProps.queryParams.PageNumber,
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
                  assignmentSerialsUIProps.setQueryParams
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