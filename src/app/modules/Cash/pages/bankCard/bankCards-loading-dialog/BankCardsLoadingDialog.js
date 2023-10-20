import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "src/core/_partials/controls";
export function BankCardsLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankCards.listLoading }),
    shallowEqual  
  );
useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="در حال بارگذاری..." />;
}
