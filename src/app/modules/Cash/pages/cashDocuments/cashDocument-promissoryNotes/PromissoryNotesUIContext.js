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
import { isEqual, isFunction } from "lodash";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CloneObject } from "src/core/_helpers";
import { PromissoryNoteTools } from "../quick/Dependency";
import { getConfig } from "src/core/_models/ModelDescriber";
import { PromissoryNoteModel } from "src/core/_models/Cash/PromissoryNoteModel";

const PromissoryNotesUIContext = createContext();

export function usePromissoryNotesUIContext() {
  return useContext(PromissoryNotesUIContext);
}

export const PromissoryNotesUIConsumer = PromissoryNotesUIContext.Consumer;

export const PromissoryNotesUIProvider = forwardRef(
  ({ currentDocumentId, children, promissoryNote, btnRef }, ref) => {
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        fn(
          promissoryNotes.map((promissoryNote) => {
            let tempDoc = PromissoryNoteTools.Clean(promissoryNote);
            if (
              !!tempDoc.PromissoryNoteId &&
              tempDoc.PromissoryNoteId.toString().indexOf("temp_") > -1
            ) {
              tempDoc.PromissoryNoteId = null;
            }

            return tempDoc;
          })
        );
      },
    }));

    const [selectedId, setSelectedId] = useState(null);
    const [documentId, setDocumentId] = useState(currentDocumentId);
    const initPromissoryNote = {
      ...PromissoryNoteTools.Model,
      DocumentId: currentDocumentId,
    };
    const [selectedItem, setSelectedItem] = useState(initPromissoryNote);
    const { actionsLoading, documentForEdit, error } = useSelector(
      (state) => ({
        actionsLoading: state.companies.actionsLoading,
        documentForEdit: state.companies.documentForEdit,
        error: state.companies.error,
      }),
      shallowEqual
    );

    const [queryParams, setQueryParamsBase] = useState(
      getConfig(PromissoryNoteModel, "DocumentId", "desc").initialFilter
    );

    const setQueryParams = useCallback((nextQueryParams) => {
      setQueryParamsBase((prevQueryParams) => {
        if (isFunction(nextQueryParams)) {
          nextQueryParams = nextQueryParams(prevQueryParams);
        }

        if (isEqual(prevQueryParams, nextQueryParams)) {
          return prevQueryParams;
        }

        return nextQueryParams;
      });
    }, []);

    const [promissoryNotes, setPromissoryNotes] = useState(
      promissoryNote.map((x) => PromissoryNoteTools.Clean(x))
    );
    const [activePromissoryNotes, setActivePromissoryNotes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
      setActivePromissoryNotes(
        promissoryNotes.filter((x) => x.IsDeleted == false)
      );
      setTotalCount(promissoryNotes.filter((x) => x.IsDeleted == false).length);
    }, [promissoryNotes]);

    useEffect(() => {
      initPromissoryNote.DocumentId = currentDocumentId;

      setDocumentId(currentDocumentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDocumentId]);

    useEffect(() => {
      setSelectedItem(findPromissoryNote(selectedId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const [showEditPromissoryNoteDialog, setShowEditPromissoryNoteDialog] =
      useState(false);
    const openNewPromissoryNoteDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPromissoryNote));

      setTimeout(() => {
        setShowEditPromissoryNoteDialog(true);
      }, 200);
    };
    const openEditPromissoryNoteDialog = (id) => {
      setSelectedId(id);
      setSelectedItem(findPromissoryNote(selectedId));
      setTimeout(() => {
        setShowEditPromissoryNoteDialog(true);
      }, 200);
    };
    const closeEditPromissoryNoteDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPromissoryNote));
      setShowEditPromissoryNoteDialog(false);
    };

    const [showDeletePromissoryNoteDialog, setShowDeletePromissoryNoteDialog] =
      useState(false);
    const openDeletePromissoryNoteDialog = (id) => {
      setSelectedId(id);
      setShowDeletePromissoryNoteDialog(true);
    };
    const closeDeletePromissoryNoteDialog = () => {
      setSelectedId(undefined);
      setSelectedItem(CloneObject(initPromissoryNote));
      setShowDeletePromissoryNoteDialog(false);
    };

    const [
      showDeletePromissoryNotesDialog,
      setShowDeletePromissoryNotesDialog,
    ] = useState(false);
    const openDeletePromissoryNotesDialog = () => {
      setShowDeletePromissoryNotesDialog(true);
    };
    const closeDeletePromissoryNotesDialog = () => {
      setShowDeletePromissoryNotesDialog(false);
    };

    const [showFetchPromissoryNotesDialog, setShowFetchPromissoryNotesDialog] =
      useState(false);
    const openFetchPromissoryNotesDialog = () => {
      setShowFetchPromissoryNotesDialog(true);
    };
    const closeFetchPromissoryNotesDialog = () => {
      setShowFetchPromissoryNotesDialog(false);
    };

    const findPromissoryNote = (promissoryNoteId) => {
      return promissoryNotes.filter(
        (promissoryNote) => promissoryNote.PromissoryNoteId == promissoryNoteId
      )[0];
    };

    const addPromissoryNote = (promissoryNote) => {
      promissoryNote.PromissoryNoteId =
        "temp_" + Math.floor(Math.random() * 100);
      promissoryNote.DocumentId = +promissoryNote.DocumentId;

      setPromissoryNotes((promissoryNotes) => [
        ...promissoryNotes,
        promissoryNote,
      ]);
    };

    const removePromissoryNote = (promissoryNoteId) => {
      if (promissoryNoteId.toString().indexOf("temp_") > -1) {
        setPromissoryNotes((promissoryNotes) =>
          promissoryNotes.filter(
            (item) => item.PromissoryNoteId != promissoryNoteId
          )
        );
      } else {
        setPromissoryNotes((promissoryNotes) =>
          promissoryNotes.map((item) => {
            let copyPromissoryNote = CloneObject(item);
            if (copyPromissoryNote.PromissoryNoteId == promissoryNoteId)
              copyPromissoryNote.IsDeleted = true;

            return copyPromissoryNote;
          })
        );
      }
    };

    const updatePromissoryNote = (promissoryNote) => {
      promissoryNote.DocumentId = +promissoryNote.DocumentId;
      setPromissoryNotes((promissoryNotes) =>
        promissoryNotes.map((item) =>
          item.PromissoryNoteId === promissoryNote.PromissoryNoteId
            ? promissoryNote
            : item
        )
      );
    };

    const value = {
      promissoryNotes,
      activePromissoryNotes,
      findPromissoryNote,
      addPromissoryNote,
      removePromissoryNote,
      updatePromissoryNote,
      totalCount,
      setTotalCount,
      actionsLoading,
      documentId,
      setDocumentId,
      initPromissoryNote,
      selectedId,
      selectedItem,
      queryParams,
      setQueryParams,
      showEditPromissoryNoteDialog,
      openEditPromissoryNoteDialog,
      openNewPromissoryNoteDialog,
      closeEditPromissoryNoteDialog,
      showDeletePromissoryNoteDialog,
      openDeletePromissoryNoteDialog,
      closeDeletePromissoryNoteDialog,
      showDeletePromissoryNotesDialog,
      openDeletePromissoryNotesDialog,
      closeDeletePromissoryNotesDialog,
      showFetchPromissoryNotesDialog,
      openFetchPromissoryNotesDialog,
      closeFetchPromissoryNotesDialog,
    };

    return (
      <PromissoryNotesUIContext.Provider value={value}>
        {children}
      </PromissoryNotesUIContext.Provider>
    );
  }
);
