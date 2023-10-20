import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocuments/sellDocumentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDocumentsUIContext } from "../SellDocumentsUIContext";
import { SellDocumentModel } from "../../../../../../core/_models/Sell/SellDocumentModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter, CheckBoxFormatter, MoneyColumnFormatter } from "../../../../../../core/_formatters";
import "./SellDocumentsTable.css";

export function SellDocumentsTable({history}) {
  const { t } = useTranslation();

  const uiContext = useSellDocumentsUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditSellDocumentPage: uiContext.openEditSellDocumentPage,
      openDeleteSellDocumentDialog: uiContext.openDeleteSellDocumentDialog,
      openCancelAndResellDialog: uiContext.openCancelAndResellDialog,
    };
  }, [uiContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDocuments }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDocumentModel, "SellDocumentId", "desc");
  const fieldKey = getFields(SellDocumentModel);
  const fields = SellDocumentModel;

  const dispatch = useDispatch();
  useEffect(() => {
    uiProps.setIds([]);
    dispatch(actions.fetchSellDocuments(uiProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.SellDocumentId,
      text: t("SellDocument." + fields.SellDocumentId.display),
      sort: fields.SellDocumentId.sortable,
      sortCaret: sortCaret,
      style: {
        width: "120px",
      },
    },
    {
      dataField: fieldKey.SellDocumentDate,
      text: t("SellDocument." + fields.SellDocumentDate.display),
      sort: fields.SellDocumentDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("SellDocument.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "SettlementType.Title",
    //   text: t("SellDocument." + fields.SettlementTypeId.display),
    //   sort: fields.SettlementTypeId.sortable,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: fieldKey.IsTemp,
      text: t("SellDocument." + fields.IsTemp.display),
      sort: fields.IsTemp.sortable,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: fieldKey.Price,
      text: t("SellDocument." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: fieldKey.DiscountPrice,
      text: t("SellDocument." + fields.DiscountPrice.display),
      sort: fields.DiscountPrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: fieldKey.PayablePrice,
      text: t("SellDocument." + fields.PayablePrice.display),
      sort: fields.PayablePrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDocumentPage: uiProps.openEditSellDocumentPage,
        openDeleteSellDocumentDialog: uiProps.openDeleteSellDocumentDialog,
        openCancelAndResellDialog: uiProps.openCancelAndResellDialog,
        openShowPage: (url)=>{
          history.push(url);
        },
        t: t,
      },
      classes: "text-right",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "140px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
  };

  const rowClasses = (row, rowIndex) => {
    let classes = "";

    if(row.IsTemp) classes = "row-status-pink";
    if(row.IsCanceled) classes = classes + " row-status-gray";
    
    return classes;
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
                rowClasses={rowClasses}
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
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
