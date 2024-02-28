import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/contractTypes/contractTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useContractTypesUIContext } from "../ContractTypesUIContext";
import { ContractTypeModel } from "../../../../../../core/_models/Employment/ContractTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ContractTypesTable() {
  const { t } = useTranslation();

  const contractTypesUIContext = useContractTypesUIContext();

  const contractTypesUIProps = useMemo(() => {
    return {
      ids: contractTypesUIContext.ids,
      setIds: contractTypesUIContext.setIds,
      queryParams: contractTypesUIContext.queryParams,
      setQueryParams: contractTypesUIContext.setQueryParams,
      openEditContractTypePage: contractTypesUIContext.openEditContractTypePage,
      openDeleteContractTypeDialog:
        contractTypesUIContext.openDeleteContractTypeDialog,
    };
  }, [contractTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.contractTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ContractTypeModel);
  const fieldKey = getFields(ContractTypeModel);
  const fields = ContractTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    contractTypesUIProps.setIds([]);
    dispatch(actions.fetchContractTypes(contractTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ContractType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ContractType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditContractTypePage: contractTypesUIProps.openEditContractTypePage,
        openDeleteContractTypeDialog:
          contractTypesUIProps.openDeleteContractTypeDialog,
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
    sizePerPage: contractTypesUIProps.queryParams.PageSize,
    page: contractTypesUIProps.queryParams.PageNumber,
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
                  contractTypesUIProps.setQueryParams
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
