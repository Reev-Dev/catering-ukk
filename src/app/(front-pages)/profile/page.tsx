import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfileForm } from "@/views/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const id = BigInt(session.user.id);

  const user = await prisma.pelanggans.findUnique({ where: { id } });
  console.log(user);

  return (
    <>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <ProfileForm user={user} />
      </div>
    </>
  );
}
