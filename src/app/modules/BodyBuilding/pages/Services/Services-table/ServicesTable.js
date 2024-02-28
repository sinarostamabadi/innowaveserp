import { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Services/ServicesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import { MoneyColumnFormatter } from "src/core/_formatters";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useServicesUIContext } from "../ServicesUIContext";
import { BodyBuildingServiceModel } from "src/core/_models/BodyBuilding/BodyBuildingServiceModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ServicesTable() {
  const { t } = useTranslation();
  const servicesUIContext = useServicesUIContext();

  const servicesUIProps = useMemo(() => {
    return {
      ids: servicesUIContext.ids,
      setIds: servicesUIContext.setIds,
      queryParams: servicesUIContext.queryParams,
      setQueryParams: servicesUIContext.setQueryParams,
      openEditServicePage: servicesUIContext.openEditServicePage,
      openDeleteServiceDialog: servicesUIContext.openDeleteServiceDialog,
    };
  }, [servicesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.services }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingServiceModel);
  const fieldKey = getFields(BodyBuildingServiceModel);
  const fields = BodyBuildingServiceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    servicesUIProps.setIds([]);
    dispatch(actions.fetchServices(servicesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BodyBuildingService." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BodyBuildingEmployeeType.Title",
      text: t("BodyBuildingService.BodyBuildingEmployeeType"),
      sort: fields.BodyBuildingEmployeeTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.UseIPAddress,
      text: t("BodyBuildingService." + fields.UseIPAddress.display),
      sort: fields.UseIPAddress.sortable,
      sortCaret: sortCaret,
      formatExtraData: { data: { 0: t("Common.Female"), 1: t("Common.Male") } },
    },
    {
      dataField: fieldKey.Price,
      text: t("BodyBuildingService." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditServicePage: servicesUIProps.openEditServicePage,
        openDeleteServiceDialog: servicesUIProps.openDeleteServiceDialog,
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
    sizePerPage: servicesUIProps.queryParams.PageSize,
    page: servicesUIProps.queryParams.PageNumber,
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
                  servicesUIProps.setQueryParams
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
