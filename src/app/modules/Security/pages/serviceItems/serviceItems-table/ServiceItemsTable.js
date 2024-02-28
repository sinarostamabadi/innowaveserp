import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/serviceItems/serviceItemsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useServiceItemsUIContext } from "../ServiceItemsUIContext";
import { ServiceItemModel } from "../../../../../../core/_models/Security/ServiceItemModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ServiceItemsTable() {
  const { t } = useTranslation();

  const serviceItemsUIContext = useServiceItemsUIContext();

  const serviceItemsUIProps = useMemo(() => {
    return {
      ids: serviceItemsUIContext.ids,
      setIds: serviceItemsUIContext.setIds,
      queryParams: serviceItemsUIContext.queryParams,
      setQueryParams: serviceItemsUIContext.setQueryParams,
      openEditServiceItemPage: serviceItemsUIContext.openEditServiceItemPage,
      openDeleteServiceItemDialog:
        serviceItemsUIContext.openDeleteServiceItemDialog,
    };
  }, [serviceItemsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.serviceItems }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ServiceItemModel);
  const fieldKey = getFields(ServiceItemModel);
  const fields = ServiceItemModel;

  const dispatch = useDispatch();
  useEffect(() => {
    serviceItemsUIProps.setIds([]);
    dispatch(actions.fetchServiceItems(serviceItemsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceItemsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ServiceItem." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ServiceItem." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditServiceItemPage: serviceItemsUIProps.openEditServiceItemPage,
        openDeleteServiceItemDialog:
          serviceItemsUIProps.openDeleteServiceItemDialog,
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
    sizePerPage: serviceItemsUIProps.queryParams.PageSize,
    page: serviceItemsUIProps.queryParams.PageNumber,
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
                  serviceItemsUIProps.setQueryParams
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
