import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscounts/sellDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDiscountsUIContext } from "../SellDiscountsUIContext";
import { SellDiscountModel } from "../../../../../../core/_models/Sell/SellDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter, DataFormatter } from "../../../../../../core/_formatters";

export function SellDiscountsTable() {
  const { t } = useTranslation();

  const sellDiscountsUIContext = useSellDiscountsUIContext();

  const sellDiscountsUIProps = useMemo(() => {
    return {
      ids: sellDiscountsUIContext.ids,
      setIds: sellDiscountsUIContext.setIds,
      queryParams: sellDiscountsUIContext.queryParams,
      setQueryParams: sellDiscountsUIContext.setQueryParams,
      openEditSellDiscountPage: sellDiscountsUIContext.openEditSellDiscountPage,
      openDeleteSellDiscountDialog:
        sellDiscountsUIContext.openDeleteSellDiscountDialog,
    };
  }, [sellDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDiscountModel, "SellDiscountNumber", "desc");
  const fieldKey = getFields(SellDiscountModel);
  const fields = SellDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDiscountsUIProps.setIds([]);
    dispatch(actions.fetchSellDiscounts(sellDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("SellDiscount." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.SellDiscountNumber,
      text: t("SellDiscount." + fields.SellDiscountNumber.display),
      sort: fields.SellDiscountNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.RegisterDate,
      text: t("SellDiscount.RegisterDate"),
      sort: fields.RegisterDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("SellDiscount.FromDate"),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("SellDiscount." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("SellDiscount.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PersonGroup.Title",
      text: t("SellDiscount.PersonGroup"),
      sort: fields.PersonGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromYearsOld,
      text: t("SellDiscount." + fields.FromYearsOld.display),
      sort: fields.FromYearsOld.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.ToYearsOld,
      text: t("SellDiscount." + fields.ToYearsOld.display),
      sort: fields.ToYearsOld.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Sex,
      text: t("SellDiscount." + fields.Sex.display),
      sort: fields.Sex.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          1: t("Common.Male"),
          2: t("Common.Female")
        }
      }
    },
    {
      dataField: fieldKey.IsActive,
      text: t("SellDiscount." + fields.IsActive.display),
      sort: fields.Sex.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: {
        data: {
          true: t("Common.Yes"),
          false: t("Common.No")
        }
      }
    },
    {
      dataField: "RewardProduct.Name",
      text: t("SellDiscount.RewardProduct"),
      sort: fields.RewardProductId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "RewardProductUnit.Unit.Name",
      text: t("SellDiscount.RewardProductUnit"),
      sort: fields.RewardProductUnitId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDiscountPage: sellDiscountsUIProps.openEditSellDiscountPage,
        openDeleteSellDiscountDialog:
          sellDiscountsUIProps.openDeleteSellDiscountDialog,
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
    sizePerPage: sellDiscountsUIProps.queryParams.PageSize,
    page: sellDiscountsUIProps.queryParams.PageNumber,
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
                  sellDiscountsUIProps.setQueryParams
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
