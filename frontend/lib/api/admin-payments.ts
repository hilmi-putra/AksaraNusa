import api from "../api";

export async function getAdminPayments(params?: Record<string, any>) {
  const res = await api.get("/admin/payments", { params });
  return res;
}
