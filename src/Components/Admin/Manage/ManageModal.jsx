export default function ManageModal({
  show,
  onClose,
  fields,
  row,
  onSave,
  saving,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{row.id ? "تعديل" : "إضافة"}</h3>

        {fields.map((f) => (
          <div key={f.name} className="mb-3">
            <label className="form-label">{f.label}</label>
            {f.type === "select" ? (
              <select
                className="form-control"
                multiple={!!f.multiple}
                value={
                  f.multiple ? row[f.name] ?? [] : row[f.name] ?? ""
                }
                onChange={(e) => {
                  if (f.multiple) {
                    const values = Array.from(e.target.selectedOptions).map(
                      (o) => o.value
                    );
                    onSave({ ...row, [f.name]: values });
                  } else {
                    onSave({ ...row, [f.name]: e.target.value });
                  }
                }}
                disabled={saving}
              >
                {!f.multiple && <option value="">-- اختر --</option>}
                {Array.isArray(f.options) &&
                  f.options.map((opt, i) => {
                    const val = typeof opt === "object" ? opt.id : opt;
                    const label = typeof opt === "object" ? opt.name : opt;
                    return (
                      <option key={i} value={val}>
                        {label}
                      </option>
                    );
                  })}
              </select>
            ) : (
              <input
                className="form-control"
                value={row[f.name] || ""}
                onChange={(e) => onSave({ ...row, [f.name]: e.target.value })}
                disabled={saving}
              />
            )}
          </div>
        ))}

        <button
          className="btn btn-primary mx-1"
          disabled={saving}
          onClick={() => onClose(true)}
        >
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => onClose(false)}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
