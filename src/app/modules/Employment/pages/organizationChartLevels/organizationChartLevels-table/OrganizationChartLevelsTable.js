import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/organizationChartLevels/organizationChartLevelsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOrganizationChartLevelsUIContext } from "../OrganizationChartLevelsUIContext";
import { OrganizationChartLevelModel } from "../../../../../../core/_models/Employment/OrganizationChartLevelModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OrganizationChartLevelsTable() {
  const { t } = useTranslation();

  const organizationChartLevelsUIContext =
    useOrganizationChartLevelsUIContext();

  const organizationChartLevelsUIProps = useMemo(() => {
    return {
      ids: organizationChartLevelsUIContext.ids,
      setIds: organizationChartLevelsUIContext.setIds,
      queryParams: organizationChartLevelsUIContext.queryParams,
      setQueryParams: organizationChartLevelsUIContext.setQueryParams,
      openEditOrganizationChartLevelPage:
        organizationChartLevelsUIContext.openEditOrganizationChartLevelPage,
      openDeleteOrganizationChartLevelDialog:
        organizationChartLevelsUIContext.openDeleteOrganizationChartLevelDialog,
    };
  }, [organizationChartLevelsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.organizationChartLevels }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OrganizationChartLevelModel);
  const fieldKey = getFields(OrganizationChartLevelModel);
  const fields = OrganizationChartLevelModel;

  const dispatch = useDispatch();
  useEffect(() => {
    organizationChartLevelsUIProps.setIds([]);
    dispatch(
      actions.fetchOrganizationChartLevels(
        organizationChartLevelsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationChartLevelsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OrganizationChartLevel." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OrganizationChartLevel." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOrganizationChartLevelPage:
          organizationChartLevelsUIProps.openEditOrganizationChartLevelPage,
        openDeleteOrganizationChartLevelDialog:
          organizationChartLevelsUIProps.openDeleteOrganizationChartLevelDialog,
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
    sizePerPage: organizationChartLevelsUIProps.queryParams.PageSize,
    page: organizationChartLevelsUIProps.queryParams.PageNumber,
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
                  organizationChartLevelsUIProps.setQueryParams
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
