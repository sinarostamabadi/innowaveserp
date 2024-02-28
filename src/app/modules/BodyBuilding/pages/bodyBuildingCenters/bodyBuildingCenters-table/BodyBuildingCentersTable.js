import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingCenters/bodyBuildingCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingCentersUIContext } from "../BodyBuildingCentersUIContext";
import { BodyBuildingCenterModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingCentersTable() {
  const { t } = useTranslation();

  const bodyBuildingCentersUIContext = useBodyBuildingCentersUIContext();

  const bodyBuildingCentersUIProps = useMemo(() => {
    return {
      ids: bodyBuildingCentersUIContext.ids,
      setIds: bodyBuildingCentersUIContext.setIds,
      queryParams: bodyBuildingCentersUIContext.queryParams,
      setQueryParams: bodyBuildingCentersUIContext.setQueryParams,
      openEditBodyBuildingCenterPage:
        bodyBuildingCentersUIContext.openEditBodyBuildingCenterPage,
      openDeleteBodyBuildingCenterDialog:
        bodyBuildingCentersUIContext.openDeleteBodyBuildingCenterDialog,
    };
  }, [bodyBuildingCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingCenterModel);
  const fieldKey = getFields(BodyBuildingCenterModel);
  const fields = BodyBuildingCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingCentersUIProps.setIds([]);
    dispatch(
      actions.fetchBodyBuildingCenters(bodyBuildingCentersUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingCenter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingCenter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingCenterPage:
          bodyBuildingCentersUIProps.openEditBodyBuildingCenterPage,
        openDeleteBodyBuildingCenterDialog:
          bodyBuildingCentersUIProps.openDeleteBodyBuildingCenterDialog,
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
    sizePerPage: bodyBuildingCentersUIProps.queryParams.PageSize,
    page: bodyBuildingCentersUIProps.queryParams.PageNumber,
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
                  bodyBuildingCentersUIProps.setQueryParams
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
