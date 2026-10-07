import { Trash2 } from "lucide-react";
import "../css/DeleteModal.css";

function DeleteModal({ hotel, onDelete, onCancel }) {

  if (!hotel) {
    return null;
  }

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal-box">

        <div className="delete-modal-icon">
          <Trash2 size={28} />
        </div>

        <h2 className="delete-modal-title">
          Delete Hotel?
        </h2>

        <p className="delete-modal-message">
          Are you sure you want to delete{" "}
          <strong>{hotel.title}</strong>?
        </p>

        <div className="delete-modal-actions">

          <button
            type="button"
            className="delete-modal-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-modal-confirm"
            onClick={onDelete}
          >
            <Trash2 size={17} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;