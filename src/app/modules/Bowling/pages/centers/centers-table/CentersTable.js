import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/centers/centersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCentersUIContext } from "../CentersUIContext";
import { CenterModel } from "../../../../../../core/_models/Bowling/CenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CentersTable() {
  const { t } = useTranslation();

  const centersUIContext = useCentersUIContext();

  const centersUIProps = useMemo(() => {
    return {
      ids: centersUIContext.ids,
      setIds: centersUIContext.setIds,
      queryParams: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
      openEditCenterPage: centersUIContext.openEditCenterPage,
      openDeleteCenterDialog: centersUIContext.openDeleteCenterDialog,
    };
  }, [centersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.centers }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CenterModel);
  const fieldKey = getFields(CenterModel);
  const fields = CenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    centersUIProps.setIds([]);
    dispatch(actions.fetchCenters(centersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Center." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Center." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCenterPage: centersUIProps.openEditCenterPage,
        openDeleteCenterDialog: centersUIProps.openDeleteCenterDialog,
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
    sizePerPage: centersUIProps.queryParams.PageSize,
    page: centersUIProps.queryParams.PageNumber,
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
                  centersUIProps.setQueryParams
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