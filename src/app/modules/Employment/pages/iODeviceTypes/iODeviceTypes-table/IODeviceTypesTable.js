import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/iODeviceTypes/iODeviceTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useIODeviceTypesUIContext } from "../IODeviceTypesUIContext";
import { IODeviceTypeModel } from "../../../../../../core/_models/Employment/IODeviceTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function IODeviceTypesTable() {
  const { t } = useTranslation();

  const iODeviceTypesUIContext = useIODeviceTypesUIContext();

  const iODeviceTypesUIProps = useMemo(() => {
    return {
      ids: iODeviceTypesUIContext.ids,
      setIds: iODeviceTypesUIContext.setIds,
      queryParams: iODeviceTypesUIContext.queryParams,
      setQueryParams: iODeviceTypesUIContext.setQueryParams,
      openEditIODeviceTypePage: iODeviceTypesUIContext.openEditIODeviceTypePage,
      openDeleteIODeviceTypeDialog: iODeviceTypesUIContext.openDeleteIODeviceTypeDialog,
    };
  }, [iODeviceTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.iODeviceTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(IODeviceTypeModel);
  const fieldKey = getFields(IODeviceTypeModel);
  const fields = IODeviceTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    iODeviceTypesUIProps.setIds([]);
    dispatch(actions.fetchIODeviceTypes(iODeviceTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iODeviceTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("IODeviceType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("IODeviceType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditIODeviceTypePage: iODeviceTypesUIProps.openEditIODeviceTypePage,
        openDeleteIODeviceTypeDialog: iODeviceTypesUIProps.openDeleteIODeviceTypeDialog,
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
    sizePerPage: iODeviceTypesUIProps.queryParams.PageSize,
    page: iODeviceTypesUIProps.queryParams.PageNumber,
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
                  iODeviceTypesUIProps.setQueryParams
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