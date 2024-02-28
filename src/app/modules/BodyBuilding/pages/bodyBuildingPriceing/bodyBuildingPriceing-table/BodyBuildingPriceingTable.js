import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingPriceing/bodyBuildingPriceingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingPriceingUIContext } from "../BodyBuildingPriceingUIContext";
import { BodyBuildingPriceingModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingPriceingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingPriceingTable() {
  const { t } = useTranslation();

  const bodyBuildingPriceingUIContext = useBodyBuildingPriceingUIContext();

  const bodyBuildingPriceingUIProps = useMemo(() => {
    return {
      ids: bodyBuildingPriceingUIContext.ids,
      setIds: bodyBuildingPriceingUIContext.setIds,
      queryParams: bodyBuildingPriceingUIContext.queryParams,
      setQueryParams: bodyBuildingPriceingUIContext.setQueryParams,
      openEditBodyBuildingPriceingPage:
        bodyBuildingPriceingUIContext.openEditBodyBuildingPriceingPage,
      openDeleteBodyBuildingPriceingDialog:
        bodyBuildingPriceingUIContext.openDeleteBodyBuildingPriceingDialog,
    };
  }, [bodyBuildingPriceingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingPriceing }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingPriceingModel);
  const fieldKey = getFields(BodyBuildingPriceingModel);
  const fields = BodyBuildingPriceingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingPriceingUIProps.setIds([]);
    dispatch(
      actions.fetchBodyBuildingPriceing(bodyBuildingPriceingUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingPriceingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingPriceing." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingPriceing." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingPriceingPage:
          bodyBuildingPriceingUIProps.openEditBodyBuildingPriceingPage,
        openDeleteBodyBuildingPriceingDialog:
          bodyBuildingPriceingUIProps.openDeleteBodyBuildingPriceingDialog,
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
    sizePerPage: bodyBuildingPriceingUIProps.queryParams.PageSize,
    page: bodyBuildingPriceingUIProps.queryParams.PageNumber,
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
                  bodyBuildingPriceingUIProps.setQueryParams
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
