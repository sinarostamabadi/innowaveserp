import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billiardCenters/billiardCentersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBilliardCentersUIContext } from "../BilliardCentersUIContext";
import { BilliardCenterModel } from "../../../../../../core/_models/Billiard/BilliardCenterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BilliardCentersTable() {
  const { t } = useTranslation();

  const billiardCentersUIContext = useBilliardCentersUIContext();

  const billiardCentersUIProps = useMemo(() => {
    return {
      ids: billiardCentersUIContext.ids,
      setIds: billiardCentersUIContext.setIds,
      queryParams: billiardCentersUIContext.queryParams,
      setQueryParams: billiardCentersUIContext.setQueryParams,
      openEditBilliardCenterPage: billiardCentersUIContext.openEditBilliardCenterPage,
      openDeleteBilliardCenterDialog: billiardCentersUIContext.openDeleteBilliardCenterDialog,
    };
  }, [billiardCentersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.billiardCenters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BilliardCenterModel);
  const fieldKey = getFields(BilliardCenterModel);
  const fields = BilliardCenterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    billiardCentersUIProps.setIds([]);
    dispatch(actions.fetchBilliardCenters(billiardCentersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billiardCentersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BilliardCenter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BilliardCenter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBilliardCenterPage: billiardCentersUIProps.openEditBilliardCenterPage,
        openDeleteBilliardCenterDialog: billiardCentersUIProps.openDeleteBilliardCenterDialog,
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
    sizePerPage: billiardCentersUIProps.queryParams.PageSize,
    page: billiardCentersUIProps.queryParams.PageNumber,
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
                  billiardCentersUIProps.setQueryParams
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