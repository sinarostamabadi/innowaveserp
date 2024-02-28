import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/insurances/insurancesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInsurancesUIContext } from "../InsurancesUIContext";
import { InsuranceModel } from "../../../../../../core/_models/Employment/InsuranceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InsurancesTable() {
  const { t } = useTranslation();

  const insurancesUIContext = useInsurancesUIContext();

  const insurancesUIProps = useMemo(() => {
    return {
      ids: insurancesUIContext.ids,
      setIds: insurancesUIContext.setIds,
      queryParams: insurancesUIContext.queryParams,
      setQueryParams: insurancesUIContext.setQueryParams,
      openEditInsurancePage: insurancesUIContext.openEditInsurancePage,
      openDeleteInsuranceDialog: insurancesUIContext.openDeleteInsuranceDialog,
    };
  }, [insurancesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.insurances }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InsuranceModel);
  const fieldKey = getFields(InsuranceModel);
  const fields = InsuranceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    insurancesUIProps.setIds([]);
    dispatch(actions.fetchInsurances(insurancesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insurancesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Insurance." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Insurance." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInsurancePage: insurancesUIProps.openEditInsurancePage,
        openDeleteInsuranceDialog: insurancesUIProps.openDeleteInsuranceDialog,
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
    sizePerPage: insurancesUIProps.queryParams.PageSize,
    page: insurancesUIProps.queryParams.PageNumber,
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
                  insurancesUIProps.setQueryParams
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
