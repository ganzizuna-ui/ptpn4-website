import { cookies } from "next/headers";

const SESSION_COOKIE = "ptpn4_admin_session";

/**
 * Autentikasi sederhana berbasis cookie untuk halaman admin.
 * Untuk produksi, sebaiknya gunakan NextAuth.js / hashing password (bcrypt) + database user.
 */

export async function login(username: string, password: string): Promise<boolean> {
  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "ptpn4admin123";

  if (username === validUser && password === validPass) {
    cookies().set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });
    return true;
  }
  return false;
}

export function logout() {
  cookies().delete(SESSION_COOKIE);
}

export function isAuthenticated(): boolean {
  return cookies().get(SESSION_COOKIE)?.value === "authenticated";
}

export { SESSION_COOKIE };
