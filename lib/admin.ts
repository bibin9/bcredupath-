import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

/**
 * Resolve the current user and verify they have an admin/teacher role.
 * Returns an HTTP response object on failure, or the user doc on success.
 *
 * Bootstrap: a user becomes admin by ADMIN_EMAILS env var matching their email
 * (comma-separated list). Or set role manually in Mongo.
 */
export async function requireAdmin(): Promise<
  | { user: { _id: unknown; email: string; role: string }; response: null }
  | { user: null; response: Response }
> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { user: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  await connectDB();
  const email = session.user.email.toLowerCase();
  const user = await User.findOne({ email }).select("_id email role").lean();
  if (!user) {
    return { user: null, response: NextResponse.json({ error: "User not found" }, { status: 404 }) };
  }

  const envAdmins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin =
    user.role === "admin" || user.role === "teacher" || envAdmins.includes(email);

  if (!isAdmin) {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 }),
    };
  }

  return {
    user: { _id: user._id, email: user.email, role: user.role ?? "admin" },
    response: null,
  };
}

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;
  await connectDB();
  const email = session.user.email.toLowerCase();
  const user = await User.findOne({ email }).select("role").lean();
  const envAdmins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return (
    user?.role === "admin" ||
    user?.role === "teacher" ||
    envAdmins.includes(email)
  );
}
