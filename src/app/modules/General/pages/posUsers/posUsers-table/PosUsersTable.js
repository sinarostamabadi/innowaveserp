import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/posUsers/posUsersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePosUsersUIContext } from "../PosUsersUIContext";
import { PosUserModel } from "../../../../../../core/_models/General/PosUserModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PosUsersTable() {
  const { t } = useTranslation();

  const posUsersUIContext = usePosUsersUIContext();

  const posUsersUIProps = useMemo(() => {
    return {
      ids: posUsersUIContext.ids,
      setIds: posUsersUIContext.setIds,
      queryParams: posUsersUIContext.queryParams,
      setQueryParams: posUsersUIContext.setQueryParams,
      openEditPosUserPage: posUsersUIContext.openEditPosUserPage,
      openDeletePosUserDialog: posUsersUIContext.openDeletePosUserDialog,
    };
  }, [posUsersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.posUsers }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PosUserModel);
  const fieldKey = getFields(PosUserModel);
  const fields = PosUserModel;

  const dispatch = useDispatch();
  useEffect(() => {
    posUsersUIProps.setIds([]);
    dispatch(actions.fetchPosUsers(posUsersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posUsersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PosUser." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PosUser." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPosUserPage: posUsersUIProps.openEditPosUserPage,
        openDeletePosUserDialog: posUsersUIProps.openDeletePosUserDialog,
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
    sizePerPage: posUsersUIProps.queryParams.PageSize,
    page: posUsersUIProps.queryParams.PageNumber,
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
                  posUsersUIProps.setQueryParams
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
