import React from "react";

export default function RequestForm() {
  return (
    <div className="container bg-primary newsletter py-5">
      <div className="container p-0">
        <div className="row g-0 align-items-center">
          <div
            className="col-md-5 ps-lg-0 text-start mt-5"            
          >
            <img className="img-fluid w-100" src="/images/request.jpg" alt="" />
          </div>
          <div
            className="col-md-7 py-5 newsletter-text wow fadeIn"
            data-wow-delay="0.5s"
          >
            <form className="p-5 ">
              <h2 className="mb-5 text-white">
                بدء مشروع جديد مع 
                <span className="text-uppercase text-primary text-secondary px-2 me-2">
                  &nbsp;منصة بناءك
                </span>
              </h2>
              <div className="mb-3">
                <select name="" id="" className="form-select">
                  <option value="">--اختر نوع المشروع</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name=""
                  id=""
                  placeholder="ضع وصف المشروع"
                  className="form-control border-0 w-100  h-60"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label text-white">
                  وثائق المشروع
                </label>
                <input
                  className="form-control"
                  type="file"
                  placeholder=""
                  multiple
                />
              </div>
              <button className="btn btn-light px-5 text-primary">إرسال</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
