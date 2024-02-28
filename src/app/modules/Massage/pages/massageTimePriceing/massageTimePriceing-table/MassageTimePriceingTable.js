import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageTimePriceing/massageTimePriceingActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageTimePriceingUIContext } from "../MassageTimePriceingUIContext";
import { MassageTimePriceingModel } from "../../../../../../core/_models/Massage/MassageTimePriceingModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageTimePriceingTable() {
  const { t } = useTranslation();

  const massageTimePriceingUIContext = useMassageTimePriceingUIContext();

  const massageTimePriceingUIProps = useMemo(() => {
    return {
      ids: massageTimePriceingUIContext.ids,
      setIds: massageTimePriceingUIContext.setIds,
      queryParams: massageTimePriceingUIContext.queryParams,
      setQueryParams: massageTimePriceingUIContext.setQueryParams,
      openEditMassageTimePriceingPage:
        massageTimePriceingUIContext.openEditMassageTimePriceingPage,
      openDeleteMassageTimePriceingDialog:
        massageTimePriceingUIContext.openDeleteMassageTimePriceingDialog,
    };
  }, [massageTimePriceingUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageTimePriceing }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageTimePriceingModel);
  const fieldKey = getFields(MassageTimePriceingModel);
  const fields = MassageTimePriceingModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageTimePriceingUIProps.setIds([]);
    dispatch(
      actions.fetchMassageTimePriceing(massageTimePriceingUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageTimePriceingUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageTimePriceing." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageTimePriceing." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageTimePriceingPage:
          massageTimePriceingUIProps.openEditMassageTimePriceingPage,
        openDeleteMassageTimePriceingDialog:
          massageTimePriceingUIProps.openDeleteMassageTimePriceingDialog,
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
    sizePerPage: massageTimePriceingUIProps.queryParams.PageSize,
    page: massageTimePriceingUIProps.queryParams.PageNumber,
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
                  massageTimePriceingUIProps.setQueryParams
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
