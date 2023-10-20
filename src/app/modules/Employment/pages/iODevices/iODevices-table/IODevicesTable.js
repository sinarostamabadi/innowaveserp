import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/iODevices/iODevicesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useIODevicesUIContext } from "../IODevicesUIContext";
import { IODeviceModel } from "../../../../../../core/_models/Employment/IODeviceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function IODevicesTable() {
  const { t } = useTranslation();

  const iODevicesUIContext = useIODevicesUIContext();

  const iODevicesUIProps = useMemo(() => {
    return {
      ids: iODevicesUIContext.ids,
      setIds: iODevicesUIContext.setIds,
      queryParams: iODevicesUIContext.queryParams,
      setQueryParams: iODevicesUIContext.setQueryParams,
      openEditIODevicePage: iODevicesUIContext.openEditIODevicePage,
      openDeleteIODeviceDialog: iODevicesUIContext.openDeleteIODeviceDialog,
    };
  }, [iODevicesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.iODevices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(IODeviceModel);
  const fieldKey = getFields(IODeviceModel);
  const fields = IODeviceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    iODevicesUIProps.setIds([]);
    dispatch(actions.fetchIODevices(iODevicesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iODevicesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("IODevice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("IODevice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditIODevicePage: iODevicesUIProps.openEditIODevicePage,
        openDeleteIODeviceDialog: iODevicesUIProps.openDeleteIODeviceDialog,
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
    sizePerPage: iODevicesUIProps.queryParams.PageSize,
    page: iODevicesUIProps.queryParams.PageNumber,
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
                  iODevicesUIProps.setQueryParams
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