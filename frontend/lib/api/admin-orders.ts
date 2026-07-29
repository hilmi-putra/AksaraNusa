import api from "../api";

export async function getAdminOrders(params?: Record<string, any>) {
  const res = await api.get("/admin/orders", { params });
  return res;
}

export async function getAdminOrder(id: string | number) {
  const res = await api.get(`/admin/orders/${id}`);
  return res;
}

export async function updateAdminOrderStatus(id: string | number, status: string, description?: string) {
  const res = await api.patch(`/admin/orders/${id}/status`, { status, description });
  return res;
}

export async function cancelAdminOrder(id: string | number, reason: string) {
  const res = await api.post(`/admin/orders/${id}/cancel`, { reason });
  return res;
}

export async function downloadInvoice(id: string | number) {
  const res = await api.get(`/admin/orders/${id}/invoice`, { responseType: 'blob' });
  
  const url = window.URL.createObjectURL(new Blob([res]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invoice-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function downloadPackingSlip(id: string | number) {
  const res = await api.get(`/admin/orders/${id}/packing-slip`, { responseType: 'blob' });
  
  const url = window.URL.createObjectURL(new Blob([res]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `packing-slip-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
