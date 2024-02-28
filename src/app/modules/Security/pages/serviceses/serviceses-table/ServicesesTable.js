import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/serviceses/servicesesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useServicesesUIContext } from "../ServicesesUIContext";
import { ServicesModel } from "../../../../../../core/_models/Security/ServicesModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ServicesesTable() {
  const { t } = useTranslation();

  const servicesesUIContext = useServicesesUIContext();

  const servicesesUIProps = useMemo(() => {
    return {
      ids: servicesesUIContext.ids,
      setIds: servicesesUIContext.setIds,
      queryParams: servicesesUIContext.queryParams,
      setQueryParams: servicesesUIContext.setQueryParams,
      openEditServicesPage: servicesesUIContext.openEditServicesPage,
      openDeleteServicesDialog: servicesesUIContext.openDeleteServicesDialog,
    };
  }, [servicesesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.serviceses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ServicesModel);
  const fieldKey = getFields(ServicesModel);
  const fields = ServicesModel;

  const dispatch = useDispatch();
  useEffect(() => {
    servicesesUIProps.setIds([]);
    dispatch(actions.fetchServiceses(servicesesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Services." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Services." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditServicesPage: servicesesUIProps.openEditServicesPage,
        openDeleteServicesDialog: servicesesUIProps.openDeleteServicesDialog,
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
    sizePerPage: servicesesUIProps.queryParams.PageSize,
    page: servicesesUIProps.queryParams.PageNumber,
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
                  servicesesUIProps.setQueryParams
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
