import BackButton from "../../../Components/shared/BackButton";

export default function Forbidden() {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center text-warning fst-italic"
      style={{ height: "95vh", fontSize: "80px" , textShadow: "1px 2px 10px rgba(5,5,255,0.7)"}}
    >
      Forbidden
      <div>🔑</div>

      <BackButton />
    </div>
  );
}
