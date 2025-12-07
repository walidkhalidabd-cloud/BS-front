
export default function Alert({color,msg}) {
  return (
    <div className={`text-${color} w-50 mx-auto mt-4 text-center px-5 py-2`}>{msg}</div>
  )
}
