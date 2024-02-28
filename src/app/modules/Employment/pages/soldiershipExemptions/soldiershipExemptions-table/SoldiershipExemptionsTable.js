import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/soldiershipExemptions/soldiershipExemptionsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSoldiershipExemptionsUIContext } from "../SoldiershipExemptionsUIContext";
import { SoldiershipExemptionModel } from "../../../../../../core/_models/Employment/SoldiershipExemptionModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SoldiershipExemptionsTable() {
  const { t } = useTranslation();

  const soldiershipExemptionsUIContext = useSoldiershipExemptionsUIContext();

  const soldiershipExemptionsUIProps = useMemo(() => {
    return {
      ids: soldiershipExemptionsUIContext.ids,
      setIds: soldiershipExemptionsUIContext.setIds,
      queryParams: soldiershipExemptionsUIContext.queryParams,
      setQueryParams: soldiershipExemptionsUIContext.setQueryParams,
      openEditSoldiershipExemptionPage:
        soldiershipExemptionsUIContext.openEditSoldiershipExemptionPage,
      openDeleteSoldiershipExemptionDialog:
        soldiershipExemptionsUIContext.openDeleteSoldiershipExemptionDialog,
    };
  }, [soldiershipExemptionsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.soldiershipExemptions }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SoldiershipExemptionModel);
  const fieldKey = getFields(SoldiershipExemptionModel);
  const fields = SoldiershipExemptionModel;

  const dispatch = useDispatch();
  useEffect(() => {
    soldiershipExemptionsUIProps.setIds([]);
    dispatch(
      actions.fetchSoldiershipExemptions(
        soldiershipExemptionsUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldiershipExemptionsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SoldiershipExemption." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SoldiershipExemption." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSoldiershipExemptionPage:
          soldiershipExemptionsUIProps.openEditSoldiershipExemptionPage,
        openDeleteSoldiershipExemptionDialog:
          soldiershipExemptionsUIProps.openDeleteSoldiershipExemptionDialog,
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
    sizePerPage: soldiershipExemptionsUIProps.queryParams.PageSize,
    page: soldiershipExemptionsUIProps.queryParams.PageNumber,
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
                  soldiershipExemptionsUIProps.setQueryParams
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
