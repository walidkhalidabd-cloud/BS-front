export default function ClientDetails({ client }) {
  if (!client) return <div>لا يوجد بيانات العميل</div>;

  return (
    <div className="client-details">
      <div className="bg-white p-3 mb-3">
        <div className="project-field">
          <span className="project-label">الاسم</span> {client.name}
        </div>
        <div className="project-field">
          <span className="project-label">البريد الإلكتروني</span>{" "}
          {client.email}
        </div>
        <div className="project-field">
          <span className="project-label">الهاتف</span> {client.phone}
        </div>
        {client.address && (
          <div className="project-field">
            <span className="project-label">العنوان</span> {client.address}
          </div>
        )}
        {client.status && (
          <div className="project-field">
            <span className="project-label">الحالة</span> {client.status}
          </div>
        )}
      </div>

      <div className="mx-4 mt-4 px-2 ">
        <p className="py-0">المستندات</p>
        <div className="bg-white px-1">
          {client.documents && client.documents.length ? (
            client.documents.map((document) => (
              <div key={document.id} className="d-flex gap-3">
                <div>{document.description}</div>
                <a
                  href={document.path || document.url}
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
    </div>
  );
}
