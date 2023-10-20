import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function RelationPersonGroupsLoadingDialog() {
  const { t } = useTranslation();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text={t("Common.Loading")} />;
}
