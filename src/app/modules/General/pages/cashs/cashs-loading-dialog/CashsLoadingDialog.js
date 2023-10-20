import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../core/_partials/controls";
export function CashsLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashs.listLoading }),
    shallowEqual
  );
  useEffect(() => { }, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="در حال بارگذاری..." />;
}
