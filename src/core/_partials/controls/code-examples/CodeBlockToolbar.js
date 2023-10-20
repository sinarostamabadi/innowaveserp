import React, { useState } from "react";
import clsx from "clsx";
import copy from "clipboard-copy";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function CodeBlockToolbar({
  showViewCode = false,
  code,
  isCodeBlockShown,
  setIsCodeBlockShown,
}) {
  const [isCopySucceed, setIsCopySucceed] = useState(false);
  const copyCode = () => {
    copy(code).then(() => {
      setIsCopySucceed(true);
      setTimeout(() => {
        setIsCopySucceed(false);
      }, 2000);
    });
  };

  const toggleShowCode = () => {
    setIsCodeBlockShown(!isCodeBlockShown);
  };

  return (
    <>
      {showViewCode && (
        <OverlayTrigger
          overlay={
            <Tooltip id="cashDocuments-edit-tooltip">{`${
              isCodeBlockShown ? "" : "View code"
            }`}</Tooltip>
          }
        >
          <span
            className={`example-toggle ${clsx({
              "example-toggled": isCodeBlockShown,
            })}`}
            onClick={toggleShowCode}
          />
        </OverlayTrigger>
      )}
      <OverlayTrigger overlay={<Tooltip id="cashDocuments-edit-tooltip">Copy code</Tooltip>}>
        <span
          className={`example-copy ${clsx({
            "example-copied": isCopySucceed,
          })}`}
          onClick={copyCode}
        />
      </OverlayTrigger>
    </>
  );
}
