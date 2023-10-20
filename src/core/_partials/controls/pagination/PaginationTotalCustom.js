import React from "react";
import { useTranslation } from "react-i18next";

export const PaginationTotalCustom = ({
  pattern,
  className,
  page,
  sizePerPage,
  dataSize,
  totalSize,
}) => {
  const {t} = useTranslation();

  pattern = pattern || t("Table.ShowingRecord");
  const firstRow = (page - 1) * sizePerPage;
  const totalPages = parseInt(
    totalSize / sizePerPage + (totalSize % sizePerPage > 0 ? 1 : 0)
  );
  const isLastPage = page == totalPages;
  const lastPageSize = totalSize % sizePerPage;

  pattern = pattern.replace("{0}", firstRow + 1);
  pattern = pattern.replace(
    "{1}",
    firstRow +
      (isLastPage && page != 1
        ? lastPageSize
        : totalSize < sizePerPage
        ? totalSize
        : sizePerPage)
  );
  pattern = pattern.replace("{2}", totalSize);

  return (
    <span className={"react-bootstrap-table-pagination-total " + className}>
      {pattern}
    </span>
  );
};
