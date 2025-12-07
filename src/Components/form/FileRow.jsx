import Select from "react-select";

export default function FileRow({
  index,
  data,
  documentTypes,
  onFileChange,
  onMetaChange,
  onTypeChange,
  onRemove,
  errors = {}  
}) {
  // console.log(errors)
  return (
    <div className="card bg-primary2 my-2" >

      <div className="row">

        {/* File Input */}
        <div className="col-md-4 p-1">
          <input
            className="file-control form-control"
            type="file"
            onChange={(e) => onFileChange(index, e)}            
          />
          {errors.file && <small className="text-warning">{errors.file[0]}</small>}
        </div>

        {/* Document Type */}
        <div className="col-md-3 p-1">
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            name="type"
            value={data.type}            
            options={documentTypes}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id}
            onChange={(selected) => onTypeChange(index, selected)}
            placeholder="اختر النوع"
          />
          {errors.type && <small className="text-warning">{errors.type[0]}</small>}
        </div>

        {/* Description */}
        <div className="col-md-4 p-1">
          <input
            className="form-control"
            type="text"
            name="description"
            value={data.description}
            placeholder="وصف الملف"
            onChange={(e) => onMetaChange(index, e)}            
            />
            {errors.description && <small className="text-warning">{errors.description[0]}</small>}
        </div>

        {/* Remove Button */}
        <div className="col-md-1 text-center mb-1">
          <button
            type="button"
            className="btn btn-sm btn-warning  text-light fs-4 mt-2  "
            onClick={() => onRemove(index)}
          >
        <i className="fa fa-trash"></i>
          </button>
        </div>

      </div>

    </div>
  );
}
