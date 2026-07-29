import api from "../api";

export async function getAdminRefunds(params?: Record<string, any>) {
  const res = await api.get("/admin/refunds", { params });
  return res;
}

export async function resolveAdminRefund(id: string | number, payload: { status: "Approved" | "Rejected", admin_notes?: string }) {
  const res = await api.post(`/admin/refunds/${id}/resolve`, payload);
  return res;
}
