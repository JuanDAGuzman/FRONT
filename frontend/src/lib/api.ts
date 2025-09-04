// src/lib/api.ts
const RAW_BASE = import.meta.env.VITE_API_URL;
export const BASE_URL = (RAW_BASE || "").replace(/\/+$/, "");

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch<T>(
  path: string,
  opts: RequestInit & { method?: Method } = {}
): Promise<T> {
  if (!BASE_URL) throw new Error("VITE_API_URL no configurada");
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  // ✅ arma headers con tipo explícito
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...authHeaders(),
    ...(opts.headers as any),
  };

  const res = await fetch(url, { ...opts, headers });

  const txt = await res.text();
  let data: any = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = { raw: txt }; }

  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}: ${url}`);
  return data as T;
}
