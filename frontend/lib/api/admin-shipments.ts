import api from "../api";

export async function getAdminShipments(params?: Record<string, any>) {
  const res = await api.get("/admin/shipments", { params });
  return res;
}

export async function updateAdminTracking(orderId: string | number, payload: { courier: string, tracking_number: string, service?: string }) {
  const res = await api.post(`/admin/orders/${orderId}/shipment`, payload);
  return res;
}
