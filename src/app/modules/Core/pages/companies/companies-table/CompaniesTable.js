import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/companies/companiesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCompaniesUIContext } from "../CompaniesUIContext";
import { CompanyModel } from "../../../../../../core/_models/Core/CompanyModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export default function CompaniesTable() {
  const { t } = useTranslation();

  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      setIds: companiesUIContext.setIds,
      queryParams: companiesUIContext.queryParams,
      setQueryParams: companiesUIContext.setQueryParams,
      openEditCompanyPage: companiesUIContext.openEditCompanyPage,
      openDeleteCompanyDialog: companiesUIContext.openDeleteCompanyDialog,
    };
  }, [companiesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const configs = getConfig(CompanyModel);
  const fieldKey = getFields(CompanyModel);
  const fields = CompanyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    companiesUIProps.setIds([]);
    dispatch(actions.fetchCompanies(companiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Company." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BusinessCertifyNo,
      text: t("Company." + fields.BusinessCertifyNo.display),
      sort: fields.BusinessCertifyNo.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.RegisterNumber,
      text: t("Company." + fields.RegisterNumber.display),
      sort: fields.RegisterNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.EconomicCode,
      text: t("Company." + fields.EconomicCode.display),
      sort: fields.EconomicCode.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.WalletPrice",
      text: t("Company." + fields.WalletPrice.display),
      sort: fields.WalletPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.PointPrice",
      text: t("Company." + fields.PointPrice.display),
      sort: fields.PointPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.CreditPrice",
      text: t("Company." + fields.CreditPrice.display),
      sort: fields.CreditPrice.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCompanyPage: companiesUIProps.openEditCompanyPage,
        openDeleteCompanyDialog: companiesUIProps.openDeleteCompanyDialog,
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
    sizePerPage: companiesUIProps.queryParams.PageSize,
    page: companiesUIProps.queryParams.PageNumber,
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
                  companiesUIProps.setQueryParams
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
