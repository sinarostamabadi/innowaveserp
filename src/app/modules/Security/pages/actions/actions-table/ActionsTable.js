import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/actions/actionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useActionsUIContext } from "../ActionsUIContext";
import { ActionModel } from "../../../../../../core/_models/Security/ActionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ActionsTable() {
  const { t } = useTranslation();

  const actionsUIContext = useActionsUIContext();

  const actionsUIProps = useMemo(() => {
    return {
      ids: actionsUIContext.ids,
      setIds: actionsUIContext.setIds,
      queryParams: actionsUIContext.queryParams,
      setQueryParams: actionsUIContext.setQueryParams,
      openEditActionPage: actionsUIContext.openEditActionPage,
      openDeleteActionDialog: actionsUIContext.openDeleteActionDialog,
    };
  }, [actionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.actions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ActionModel);
  const fieldKey = getFields(ActionModel);
  const fields = ActionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    actionsUIProps.setIds([]);
    dispatch(actions.fetchActions(actionsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Action." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Action." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditActionPage: actionsUIProps.openEditActionPage,
        openDeleteActionDialog: actionsUIProps.openDeleteActionDialog,
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
    sizePerPage: actionsUIProps.queryParams.PageSize,
    page: actionsUIProps.queryParams.PageNumber,
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
                  actionsUIProps.setQueryParams
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
