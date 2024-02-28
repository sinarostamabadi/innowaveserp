import React, {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useTranslation } from "react-i18next";
import { useSendToScaleContext } from "./Context";
import { get } from "../../_data/SendToScale";

export const Filter = forwardRef(({ reserve, btnRef, saveReserve }, ref) => {
  const { t } = useTranslation();

  const context = useSendToScaleContext();
  const uiProps = useMemo(() => {
    return {
      setItems: context.setItems,
    };
  }, [context]);

  useImperativeHandle(ref, () => ({
    Search(fn) {
      get().then(({ data }) => {
        uiProps.setItems(data.Items);
      });
    },
  }));

  return <></>;
});
