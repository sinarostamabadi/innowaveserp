import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cities/citiesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCitiesUIContext } from "../CitiesUIContext";
import { CityModel } from "../../../../../../core/_models/General/CityModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CitiesTable() {
  const { t } = useTranslation();

  const citiesUIContext = useCitiesUIContext();

  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      setIds: citiesUIContext.setIds,
      queryParams: citiesUIContext.queryParams,
      setQueryParams: citiesUIContext.setQueryParams,
      openEditCityPage: citiesUIContext.openEditCityPage,
      openDeleteCityDialog: citiesUIContext.openDeleteCityDialog,
    };
  }, [citiesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.cities }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CityModel);
  const fieldKey = getFields(CityModel);
  const fields = CityModel;

  const dispatch = useDispatch();
  useEffect(() => {
    citiesUIProps.setIds([]);
    dispatch(actions.fetchCities(citiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("City." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("City." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCityPage: citiesUIProps.openEditCityPage,
        openDeleteCityDialog: citiesUIProps.openDeleteCityDialog,
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
    sizePerPage: citiesUIProps.queryParams.PageSize,
    page: citiesUIProps.queryParams.PageNumber,
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
                  citiesUIProps.setQueryParams
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
