import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/serviceActionses/serviceActionsesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useServiceActionsesUIContext } from "../ServiceActionsesUIContext";
import { ServiceActionsModel } from "../../../../../../core/_models/Security/ServiceActionsModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ServiceActionsesTable() {
  const { t } = useTranslation();

  const serviceActionsesUIContext = useServiceActionsesUIContext();

  const serviceActionsesUIProps = useMemo(() => {
    return {
      ids: serviceActionsesUIContext.ids,
      setIds: serviceActionsesUIContext.setIds,
      queryParams: serviceActionsesUIContext.queryParams,
      setQueryParams: serviceActionsesUIContext.setQueryParams,
      openEditServiceActionsPage:
        serviceActionsesUIContext.openEditServiceActionsPage,
      openDeleteServiceActionsDialog:
        serviceActionsesUIContext.openDeleteServiceActionsDialog,
    };
  }, [serviceActionsesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.serviceActionses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ServiceActionsModel);
  const fieldKey = getFields(ServiceActionsModel);
  const fields = ServiceActionsModel;

  const dispatch = useDispatch();
  useEffect(() => {
    serviceActionsesUIProps.setIds([]);
    dispatch(
      actions.fetchServiceActionses(serviceActionsesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceActionsesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ServiceActions." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ServiceActions." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditServiceActionsPage:
          serviceActionsesUIProps.openEditServiceActionsPage,
        openDeleteServiceActionsDialog:
          serviceActionsesUIProps.openDeleteServiceActionsDialog,
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
    sizePerPage: serviceActionsesUIProps.queryParams.PageSize,
    page: serviceActionsesUIProps.queryParams.PageNumber,
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
                  serviceActionsesUIProps.setQueryParams
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
