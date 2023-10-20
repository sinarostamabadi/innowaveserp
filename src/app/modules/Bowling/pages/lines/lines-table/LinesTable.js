import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/lines/linesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLinesUIContext } from "../LinesUIContext";
import { LineModel } from "../../../../../../core/_models/Bowling/LineModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LinesTable() {
  const { t } = useTranslation();

  const linesUIContext = useLinesUIContext();

  const linesUIProps = useMemo(() => {
    return {
      ids: linesUIContext.ids,
      setIds: linesUIContext.setIds,
      queryParams: linesUIContext.queryParams,
      setQueryParams: linesUIContext.setQueryParams,
      openEditLinePage: linesUIContext.openEditLinePage,
      openDeleteLineDialog: linesUIContext.openDeleteLineDialog,
    };
  }, [linesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.lines }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LineModel);
  const fieldKey = getFields(LineModel);
  const fields = LineModel;

  const dispatch = useDispatch();
  useEffect(() => {
    linesUIProps.setIds([]);
    dispatch(actions.fetchLines(linesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Line." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Center.Title",
      text: t("Line.Center"),
      sort: fields.CenterId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLinePage: linesUIProps.openEditLinePage,
        openDeleteLineDialog: linesUIProps.openDeleteLineDialog,
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
    sizePerPage: linesUIProps.queryParams.PageSize,
    page: linesUIProps.queryParams.PageNumber,
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
                  linesUIProps.setQueryParams
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