import { useState } from "react";
import useManage from "../../../hooks/useManage";
import ManageModal from "./ManageModal";
import ManageTable from "./ManageTable";
import "./manage.css";
import Loading from "../../Shared/Loading";

export default function ManageMain({ api, filter, fields }) {
  const { items, loading, saving, save, remove, title } = useManage(
    api,
    filter
  );
  const [showModal, setShowModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});
  function open(row = null) {
    if (!row) {
      setActiveRow(
        fields.reduce((acc, f) => {
          let def = "";
          if (f.type === "select") {
            if (f.multiple) def = [];
            else def = "";
          }
          return { ...acc, [f.name]: def };
        }, {})
      );
    } else {
      const normalized = fields.reduce((acc, f) => {
        const val = row[f.name];
        if (f.type === "select") {
          if (f.multiple) {
            if (Array.isArray(val)) acc[f.name] = val;
            else if (val == null) acc[f.name] = [];
            else if (typeof val === "string") {
              try {
                const t = val.trim();
                if (t.startsWith("[") || t.startsWith("{")) {
                  acc[f.name] = JSON.parse(val);
                } else {
                  acc[f.name] = val
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                }
              } catch (e) {
                acc[f.name] = val
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
              }
            } else {
              acc[f.name] = [val];
            }
          } else {
            if (Array.isArray(val)) acc[f.name] = val[0] ?? "";
            else acc[f.name] = val ?? "";
          }
        } else {
          acc[f.name] = val ?? "";
        }
        return acc;
      }, {});
      setActiveRow({ ...row, ...normalized });
    }
    setShowModal(true);
  }

  async function handleClose(submit) {
    if (submit) {
      const ok = await save(activeRow);
      if (ok) setShowModal(false);
    } else {
      setShowModal(false);
    }
  }

  return (
    <section className="dashboard-body">
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="text-warning">{title}</h3>
        <button
          className="btn btn-outline-warning border border-warning fw-bold fs-6"
          onClick={() => open()}
        >
          إضافة جديد
        </button>
      </div>

      {loading && <Loading />}

      <ManageTable
        items={items}
        fields={fields}
        onEdit={(row) => open(row)}
        onDelete={remove}
      />

      <ManageModal
        show={showModal}
        row={activeRow}
        fields={fields}
        onSave={setActiveRow}
        onClose={handleClose}
        saving={saving}
      />
    </section>
  );
}
