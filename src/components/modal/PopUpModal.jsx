import React from "react";

export default function PopUpModal({ id, Content, data, setSumbit }) {
  return (
    <div>
      {/* Modal */}
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>
                Confirm Bill
              </h1>
            </div>
            <div className="modal-body">
              <Content data={data} />
            </div>
            <div className="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="sumbit"
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSumbit(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImportBillContent({ data }) {
  let keys = Object.keys(data);
  let values = Object.values(data)
  return (
    <>
      <div>
        {keys.map((item,i) => (
          <div className="row fs-5">
            <div className="col-6">{item}:</div>
            <div className="col-6">{values[i]}</div>
          </div>
        ))}
      </div>
    </>
  );
}
