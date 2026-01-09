export default function ManageTable({ items, fields, onEdit, onDelete }) {
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          {fields.map((f) => (
            <th className="text-secondary fw-normal" key={f.name}>{f.label}</th>
          ))}
          <th className="text-secondary fw-normal"> إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr key={row.id}>
            {fields.map((f) => {
              let value = row[f.name];
              // console.log(f.options);
              console.log(value);
              if (f.type === "select" && Array.isArray(f.options)) {
                if (Array.isArray(value)) {
                  const names = value.map((v) => v.name);
                  // console.log(names);
                  value = names.join("، ");
                  // console.log(value);
                } else {
                  value =
                    typeof value === "object" ? value.name ?? value.id : value;
                }
              }
              return <td key={f.name}>{value}</td>;
            })}

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
