import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/insuranceCompanies/insuranceCompaniesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInsuranceCompaniesUIContext } from "../InsuranceCompaniesUIContext";
import { InsuranceCompanyModel } from "../../../../../../core/_models/Employment/InsuranceCompanyModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InsuranceCompaniesTable() {
  const { t } = useTranslation();

  const insuranceCompaniesUIContext = useInsuranceCompaniesUIContext();

  const insuranceCompaniesUIProps = useMemo(() => {
    return {
      ids: insuranceCompaniesUIContext.ids,
      setIds: insuranceCompaniesUIContext.setIds,
      queryParams: insuranceCompaniesUIContext.queryParams,
      setQueryParams: insuranceCompaniesUIContext.setQueryParams,
      openEditInsuranceCompanyPage: insuranceCompaniesUIContext.openEditInsuranceCompanyPage,
      openDeleteInsuranceCompanyDialog: insuranceCompaniesUIContext.openDeleteInsuranceCompanyDialog,
    };
  }, [insuranceCompaniesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.insuranceCompanies }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InsuranceCompanyModel);
  const fieldKey = getFields(InsuranceCompanyModel);
  const fields = InsuranceCompanyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    insuranceCompaniesUIProps.setIds([]);
    dispatch(actions.fetchInsuranceCompanies(insuranceCompaniesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insuranceCompaniesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("InsuranceCompany." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("InsuranceCompany." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInsuranceCompanyPage: insuranceCompaniesUIProps.openEditInsuranceCompanyPage,
        openDeleteInsuranceCompanyDialog: insuranceCompaniesUIProps.openDeleteInsuranceCompanyDialog,
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
    sizePerPage: insuranceCompaniesUIProps.queryParams.PageSize,
    page: insuranceCompaniesUIProps.queryParams.PageNumber,
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
                  insuranceCompaniesUIProps.setQueryParams
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