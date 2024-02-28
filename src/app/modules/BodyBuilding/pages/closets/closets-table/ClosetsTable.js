import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/closets/closetsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useClosetsUIContext } from "../ClosetsUIContext";
import { BodyBuildingClosetModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingClosetModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DataFormatter } from "src/core/_formatters";

export function ClosetsTable() {
  const { t } = useTranslation();

  const closetsUIContext = useClosetsUIContext();

  const closetsUIProps = useMemo(() => {
    return {
      ids: closetsUIContext.ids,
      setIds: closetsUIContext.setIds,
      queryParams: closetsUIContext.queryParams,
      setQueryParams: closetsUIContext.setQueryParams,
      openEditClosetPage: closetsUIContext.openEditClosetPage,
      openDeleteClosetDialog: closetsUIContext.openDeleteClosetDialog,
      openClosetOpenDialog: closetsUIContext.openClosetOpenDialog,
      openClosetFreeDialog: closetsUIContext.openClosetFreeDialog,
    };
  }, [closetsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.closets }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingClosetModel);
  const fieldKey = getFields(BodyBuildingClosetModel);
  const fields = BodyBuildingClosetModel;

  const dispatch = useDispatch();
  useEffect(() => {
    closetsUIProps.setIds([]);
    dispatch(actions.fetchClosets(closetsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closetsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BodyBuildingCloset." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.InUse,
      text: t("BodyBuildingCloset." + fields.InUse.display),
      sort: fields.InUse.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          true: t("BodyBuildingCloset.InUse"),
          false: t("BodyBuildingCloset.NotInUse"),
        },
      },
    },
    {
      dataField: fieldKey.ConnectionInfo,
      text: t("BodyBuildingCloset." + fields.ConnectionInfo.display),
      sort: fields.ConnectionInfo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.PortInfo,
      text: t("BodyBuildingCloset." + fields.PortInfo.display),
      sort: fields.PortInfo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditClosetPage: closetsUIProps.openEditClosetPage,
        openDeleteClosetDialog: closetsUIProps.openDeleteClosetDialog,
        openClosetOpenDialog: closetsUIProps.openClosetOpenDialog,
        openClosetFreeDialog: closetsUIProps.openClosetFreeDialog,
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
    sizePerPage: closetsUIProps.queryParams.PageSize,
    page: closetsUIProps.queryParams.PageNumber,
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
                  closetsUIProps.setQueryParams
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
