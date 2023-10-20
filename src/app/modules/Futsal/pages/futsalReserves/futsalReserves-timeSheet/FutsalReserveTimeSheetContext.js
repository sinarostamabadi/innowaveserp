/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const FutsalReserveDatesUIContext = createContext();

export function useFutsalReserveDatesUIContext() {
  return useContext(FutsalReserveDatesUIContext);
}

export const FutsalReserveDatesUIConsumer =
  FutsalReserveDatesUIContext.Consumer;

export const FutsalReserveDatesUIProvider = forwardRef(
  ({ currentReserveId, children, futsalReserveDate, timing }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          futsalReserveDates.map((futsalReserveDate) => {
            console.log("futsalReserveDate > ", futsalReserveDate);

            if (
              futsalReserveDate.FutsalReserveDateId.toString().indexOf(
                "temp_"
              ) > -1
            )
              futsalReserveDate.FutsalReserveDateId = null;

            return futsalReserveDate;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [futsalReserveId, setFutsalReserveId] = useState(currentReserveId);

    const initFutsalReserveDate = {
      FutsalReserveDateId: undefined,
      FutsalReserveId: currentReserveId,
      FutsalReserveDate: null,
      FutsalReserveTimes: [],
    };

    const initFutsalReserveDateTime = {
      FutsalReservePriceId: 28,
      FutsalTimingId: 4,
      Reserved: 0, // 0 => Free, 1 => Reserved, 2 => Unavailable
    };

    const { actionsLoading, futsalReserveForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.futsalReserves.actionsLoading,
        futsalReserveForEdit: state.futsalReserves.futsalReserveForEdit,
        error: state.futsalReserves.error,
      }),
      shallowEqual
    );

    const [futsalReserveDates, setFutsalReserveDates] = useState(
      futsalReserveDate
    );
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      if (
        !!futsalReserveForEdit &&
        !!futsalReserveForEdit.FutsalReserveDates &&
        futsalReserveForEdit.FutsalReserveDates.length > 0
      ) {
        setFutsalReserveDates(futsalReserveForEdit.FutsalReserveDates);
        setTotalCount(futsalReserveForEdit.FutsalReserveDates.length);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [futsalReserveForEdit]);

    useEffect(() => {
      initFutsalReserveDate.FutsalReserveId = currentReserveId;

      setFutsalReserveId(currentReserveId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReserveId]);

    useEffect(() => {
      if (!!timing == false || (!!timing && (!!timing.fromDate == false || !!timing.toDate == false || !!timing.days.length == 0))) return;


      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing]);

    const findFutsalReserveDate = (futsalReserveDateId) => {
      return futsalReserveDates.filter(
        (futsalReserveDate) =>
          futsalReserveDate.FutsalReserveDateId == futsalReserveDateId
      )[0];
    };

    const addFutsalReserveDate = (futsalReserveDate) => {
      futsalReserveDate.FutsalReserveDateId =
        "temp_" + Math.floor(Math.random() * 100);
      futsalReserveDate.FutsalReserveDateTypeId = +futsalReserveDate.FutsalReserveDateTypeId;
      futsalReserveDate.FutsalReserveId = +futsalReserveDate.FutsalReserveId;

      setFutsalReserveDates((futsalReserveDates) => [
        ...futsalReserveDates,
        futsalReserveDate,
      ]);
    };

    const removeFutsalReserveDate = (futsalReserveDateId) => {
      let futsalReserveDate = findFutsalReserveDate(futsalReserveDateId);
      futsalReserveDate["IsDeleted"] = true;
      updateFutsalReserveDate(futsalReserveDate);
    };

    const updateFutsalReserveDate = (futsalReserveDate) => {
      futsalReserveDate.FutsalReserveDateTypeId = +futsalReserveDate.FutsalReserveDateTypeId;
      futsalReserveDate.FutsalReserveId = +futsalReserveDate.FutsalReserveId;

      setFutsalReserveDates((futsalReserveDates) =>
        futsalReserveDates.map((item) =>
          item.FutsalReserveDateId === futsalReserveDate.FutsalReserveDateId
            ? futsalReserveDate
            : item
        )
      );
    };

    const value = {
      timing,
      futsalReserveDates,
      findFutsalReserveDate,
      addFutsalReserveDate,
      removeFutsalReserveDate,
      updateFutsalReserveDate,
      totalCount,
      setTotalCount,
      actionsLoading,
      futsalReserveId,
      setFutsalReserveId,
      initFutsalReserveDate,
    };

    return (
      <FutsalReserveDatesUIContext.Provider value={value}>
        {children}
      </FutsalReserveDatesUIContext.Provider>
    );
  }
);
