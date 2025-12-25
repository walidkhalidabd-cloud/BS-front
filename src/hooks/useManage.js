import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function useManage(api ,filter = null) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);    
    const { success, data, msg } = await api.list(filter);
    if (success) {
      setItems(data);
      setTitle(msg);
    }
    else  toast.error(msg);
    setLoading(false);
  }

  async function save(row) {
    setSaving(true);
    const isEdit = Boolean(row.id);
    const apiCall = isEdit ? api.update : api.create;
    const params = isEdit ? [row.id, row] : [row];

    const { success, data, msg } = await apiCall(...params , filter);
    console.log("after save" , success, data, msg);
    if (success) {
      toast.success(msg);
      setItems((prev) => {
        if (isEdit) return prev.map((x) => (x.id === data.id ? data : x));
        return [data, ...prev];
      });
    } else toast.error(msg);
    setSaving(false);
    return success;
  }

  async function remove(id) {
    const c = await confirm("هل أنت متأكد من حذف هذا العنصر؟");
    if (!c) return false;
    
    const { success, msg } = await api.remove(id);
    if (success) {
      toast.success(msg);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } else toast.error(msg);

    return success;
  }
  
  useEffect(() => {
    load();

  }, [filter]);
  return { items, loading, saving, load, save, remove , title};
}
