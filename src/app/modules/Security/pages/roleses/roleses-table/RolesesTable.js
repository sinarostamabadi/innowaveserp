import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/roleses/rolesesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRolesesUIContext } from "../RolesesUIContext";
import { RolesModel } from "../../../../../../core/_models/Security/RolesModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RolesesTable() {
  const { t } = useTranslation();

  const rolesesUIContext = useRolesesUIContext();

  const rolesesUIProps = useMemo(() => {
    return {
      ids: rolesesUIContext.ids,
      setIds: rolesesUIContext.setIds,
      queryParams: rolesesUIContext.queryParams,
      setQueryParams: rolesesUIContext.setQueryParams,
      openEditRolesPage: rolesesUIContext.openEditRolesPage,
      openDeleteRolesDialog: rolesesUIContext.openDeleteRolesDialog,
    };
  }, [rolesesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.roleses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RolesModel);
  const fieldKey = getFields(RolesModel);
  const fields = RolesModel;

  const dispatch = useDispatch();
  useEffect(() => {
    rolesesUIProps.setIds([]);
    dispatch(actions.fetchRoleses(rolesesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Roles." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Roles." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRolesPage: rolesesUIProps.openEditRolesPage,
        openDeleteRolesDialog: rolesesUIProps.openDeleteRolesDialog,
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
    sizePerPage: rolesesUIProps.queryParams.PageSize,
    page: rolesesUIProps.queryParams.PageNumber,
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
                  rolesesUIProps.setQueryParams
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
