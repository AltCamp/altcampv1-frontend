import React, { useEffect } from "react";
import deletebookmarkmodalStyles from "./deletebookmarkmodal.module.css";
import { CloseCircle } from "iconsax-react";
import Warning from "../../../../assets/icons/warning.png";
import { useDeleteBookmarkMutation } from "../../../../app/slices/apiSlices/bookmarkSlice";

export default function DeleteBookmarkModal({
  handleToggleDeleteBookmarkModal,
  bookmarkId,
}) {
  const [deleteBookmark, { isSuccess, isLoading, isError, error }] =
    useDeleteBookmarkMutation();
  const handleDelete = () => {
    deleteBookmark(bookmarkId);
  };

  useEffect(() => {
    if (isSuccess) {
      handleToggleDeleteBookmarkModal();
    }
  }, [isSuccess]);

  return (
    <div className={deletebookmarkmodalStyles.toggleDeleteOverlay}>
      <div className={deletebookmarkmodalStyles.toggleDelete}>
        <CloseCircle
          size="20"
          className={deletebookmarkmodalStyles.closeIcon}
          onClick={handleToggleDeleteBookmarkModal}
        />
        <div className={deletebookmarkmodalStyles.content}>
          <img
            src={Warning}
            alt="warning"
            className={deletebookmarkmodalStyles.warning}
          />
          <div className={deletebookmarkmodalStyles.header}>
            <p className={deletebookmarkmodalStyles.p}>
              {" "}
              You're about to delete this bookmark.
            </p>
            <p className={deletebookmarkmodalStyles.p}>Are you sure?</p>
          </div>
          <div className={deletebookmarkmodalStyles.buttonContainer}>
            <button
              type="button"
              className={deletebookmarkmodalStyles.cancelButton}
              onClick={handleToggleDeleteBookmarkModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className={deletebookmarkmodalStyles.deleteButton}
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
