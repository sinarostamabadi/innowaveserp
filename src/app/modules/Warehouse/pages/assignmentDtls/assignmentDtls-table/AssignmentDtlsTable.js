import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/assignmentDtls/assignmentDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useAssignmentDtlsUIContext } from "../AssignmentDtlsUIContext";
import { AssignmentDtlModel } from "../../../../../../core/_models/Warehouse/AssignmentDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function AssignmentDtlsTable() {
  const { t } = useTranslation();

  const assignmentDtlsUIContext = useAssignmentDtlsUIContext();

  const assignmentDtlsUIProps = useMemo(() => {
    return {
      ids: assignmentDtlsUIContext.ids,
      setIds: assignmentDtlsUIContext.setIds,
      queryParams: assignmentDtlsUIContext.queryParams,
      setQueryParams: assignmentDtlsUIContext.setQueryParams,
      openEditAssignmentDtlPage: assignmentDtlsUIContext.openEditAssignmentDtlPage,
      openDeleteAssignmentDtlDialog: assignmentDtlsUIContext.openDeleteAssignmentDtlDialog,
    };
  }, [assignmentDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.assignmentDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(AssignmentDtlModel);
  const fieldKey = getFields(AssignmentDtlModel);
  const fields = AssignmentDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    assignmentDtlsUIProps.setIds([]);
    dispatch(actions.fetchAssignmentDtls(assignmentDtlsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("AssignmentDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("AssignmentDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAssignmentDtlPage: assignmentDtlsUIProps.openEditAssignmentDtlPage,
        openDeleteAssignmentDtlDialog: assignmentDtlsUIProps.openDeleteAssignmentDtlDialog,
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
    sizePerPage: assignmentDtlsUIProps.queryParams.PageSize,
    page: assignmentDtlsUIProps.queryParams.PageNumber,
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
                  assignmentDtlsUIProps.setQueryParams
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