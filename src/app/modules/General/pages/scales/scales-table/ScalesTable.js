import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/scales/scalesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useScalesUIContext } from "../ScalesUIContext";
import { ScaleModel } from "../../../../../../core/_models/General/ScaleModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ScalesTable() {
  const { t } = useTranslation();

  const scalesUIContext = useScalesUIContext();

  const scalesUIProps = useMemo(() => {
    return {
      ids: scalesUIContext.ids,
      setIds: scalesUIContext.setIds,
      queryParams: scalesUIContext.queryParams,
      setQueryParams: scalesUIContext.setQueryParams,
      openEditScalePage: scalesUIContext.openEditScalePage,
      openDeleteScaleDialog: scalesUIContext.openDeleteScaleDialog,
    };
  }, [scalesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.scales }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ScaleModel);
  const fieldKey = getFields(ScaleModel);
  const fields = ScaleModel;

  const dispatch = useDispatch();
  useEffect(() => {
    scalesUIProps.setIds([]);
    dispatch(actions.fetchScales(scalesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scalesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Scale." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.IpAddress,
      text: t("Scale." + fields.IpAddress.display),
      sort: fields.IpAddress.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditScalePage: scalesUIProps.openEditScalePage,
        openDeleteScaleDialog: scalesUIProps.openDeleteScaleDialog,
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
    sizePerPage: scalesUIProps.queryParams.PageSize,
    page: scalesUIProps.queryParams.PageNumber,
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
                  scalesUIProps.setQueryParams
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
