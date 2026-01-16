import React from 'react'

export default function ClientDetails({client}) {
  return (
    <div>
        ClientDetails
        <div className="bg-white px-1">
                {project.documents.length ? (
                  project.documents?.map((document) => (
                    <div key={document.id} className="d-flex gap-3">
                      <div>{document.description}</div>
                      <a
                        href={document.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="معاينة"
                      >
                        <i className="fa fa-eye text-warning"></i>
                      </a>                     
                    </div>
                  ))
                ) : (
                  <div> لا يوجد مستندات</div>
                )}
              </div>
        </div>
  )
}
