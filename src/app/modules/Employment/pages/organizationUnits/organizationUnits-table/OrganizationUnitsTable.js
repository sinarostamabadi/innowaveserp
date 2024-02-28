import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/organizationUnits/organizationUnitsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useOrganizationUnitsUIContext } from "../OrganizationUnitsUIContext";
import { OrganizationUnitModel } from "../../../../../../core/_models/Employment/OrganizationUnitModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function OrganizationUnitsTable() {
  const { t } = useTranslation();

  const organizationUnitsUIContext = useOrganizationUnitsUIContext();

  const organizationUnitsUIProps = useMemo(() => {
    return {
      ids: organizationUnitsUIContext.ids,
      setIds: organizationUnitsUIContext.setIds,
      queryParams: organizationUnitsUIContext.queryParams,
      setQueryParams: organizationUnitsUIContext.setQueryParams,
      openEditOrganizationUnitPage:
        organizationUnitsUIContext.openEditOrganizationUnitPage,
      openDeleteOrganizationUnitDialog:
        organizationUnitsUIContext.openDeleteOrganizationUnitDialog,
    };
  }, [organizationUnitsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.organizationUnits }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(OrganizationUnitModel);
  const fieldKey = getFields(OrganizationUnitModel);
  const fields = OrganizationUnitModel;

  const dispatch = useDispatch();
  useEffect(() => {
    organizationUnitsUIProps.setIds([]);
    dispatch(
      actions.fetchOrganizationUnits(organizationUnitsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationUnitsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("OrganizationUnit." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("OrganizationUnit." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOrganizationUnitPage:
          organizationUnitsUIProps.openEditOrganizationUnitPage,
        openDeleteOrganizationUnitDialog:
          organizationUnitsUIProps.openDeleteOrganizationUnitDialog,
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
    sizePerPage: organizationUnitsUIProps.queryParams.PageSize,
    page: organizationUnitsUIProps.queryParams.PageNumber,
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
                  organizationUnitsUIProps.setQueryParams
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
