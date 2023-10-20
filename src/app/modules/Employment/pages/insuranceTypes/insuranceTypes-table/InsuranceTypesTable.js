import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/insuranceTypes/insuranceTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInsuranceTypesUIContext } from "../InsuranceTypesUIContext";
import { InsuranceTypeModel } from "../../../../../../core/_models/Employment/InsuranceTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InsuranceTypesTable() {
  const { t } = useTranslation();

  const insuranceTypesUIContext = useInsuranceTypesUIContext();

  const insuranceTypesUIProps = useMemo(() => {
    return {
      ids: insuranceTypesUIContext.ids,
      setIds: insuranceTypesUIContext.setIds,
      queryParams: insuranceTypesUIContext.queryParams,
      setQueryParams: insuranceTypesUIContext.setQueryParams,
      openEditInsuranceTypePage: insuranceTypesUIContext.openEditInsuranceTypePage,
      openDeleteInsuranceTypeDialog: insuranceTypesUIContext.openDeleteInsuranceTypeDialog,
    };
  }, [insuranceTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.insuranceTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InsuranceTypeModel);
  const fieldKey = getFields(InsuranceTypeModel);
  const fields = InsuranceTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    insuranceTypesUIProps.setIds([]);
    dispatch(actions.fetchInsuranceTypes(insuranceTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insuranceTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("InsuranceType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("InsuranceType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInsuranceTypePage: insuranceTypesUIProps.openEditInsuranceTypePage,
        openDeleteInsuranceTypeDialog: insuranceTypesUIProps.openDeleteInsuranceTypeDialog,
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
    sizePerPage: insuranceTypesUIProps.queryParams.PageSize,
    page: insuranceTypesUIProps.queryParams.PageNumber,
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
                  insuranceTypesUIProps.setQueryParams
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