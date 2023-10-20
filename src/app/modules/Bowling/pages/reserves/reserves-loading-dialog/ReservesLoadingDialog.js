import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function ReservesLoadingDialog() {
  const {t} = useTranslation();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.reserves.listLoading }),
    shallowEqual  
  );
useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text={t("App.Loading")} />;
}
