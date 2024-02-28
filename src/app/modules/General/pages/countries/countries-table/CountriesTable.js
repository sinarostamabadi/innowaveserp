import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/countries/countriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCountriesUIContext } from "../CountriesUIContext";
import { CountryModel } from "../../../../../../core/_models/General/CountryModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CountriesTable() {
  const { t } = useTranslation();

  const countriesUIContext = useCountriesUIContext();

  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      setIds: countriesUIContext.setIds,
      queryParams: countriesUIContext.queryParams,
      setQueryParams: countriesUIContext.setQueryParams,
      openEditCountryPage: countriesUIContext.openEditCountryPage,
      openDeleteCountryDialog: countriesUIContext.openDeleteCountryDialog,
    };
  }, [countriesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.countries }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CountryModel);
  const fieldKey = getFields(CountryModel);
  const fields = CountryModel;

  const dispatch = useDispatch();
  useEffect(() => {
    countriesUIProps.setIds([]);
    dispatch(actions.fetchCountries(countriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Country." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Country." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCountryPage: countriesUIProps.openEditCountryPage,
        openDeleteCountryDialog: countriesUIProps.openDeleteCountryDialog,
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
    sizePerPage: countriesUIProps.queryParams.PageSize,
    page: countriesUIProps.queryParams.PageNumber,
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
                  countriesUIProps.setQueryParams
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
