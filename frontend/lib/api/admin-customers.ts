import api from "../api";

export async function getAdminCustomers(params?: Record<string, any>) {
  const res = await api.get("/admin/customers", { params });
  return res;
}

export async function getAdminCustomer(id: string | number) {
  const res = await api.get(`/admin/customers/${id}`);
  return res;
}
