export default function ManageTable({ items, fields, onEdit, onDelete }) {
  return (
    <table className="table mt-3">
      <thead>
        <tr className="bg-primary-light">
          {fields.map((f) => (
            <th key={f.name}>{f.label}</th>
          ))}
          <th className=""> إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr key={row.id}>
            {fields.map((f) => (
              <td key={f.name}>{row[f.name]}</td>
            ))}
            <td className="">
              <button
                className="btn btn-outline-primary btn-sm mx-1 border border-primary"
                onClick={() => onEdit(row)}
              >
                <i className="fa fa-edit "></i>
              </button>
              <button
                className="btn btn-outline-danger btn-sm mx-1 border border-danger"
                onClick={() => onDelete(row.id)}
              >
                <i className="fa fa-trash "></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
