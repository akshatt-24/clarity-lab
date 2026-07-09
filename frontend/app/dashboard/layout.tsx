import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth");
  }

  const user = await currentUser();

  return (
    <>
      <div className="flex justify-end items-center gap-4 p-4 border-b">
        <div className="text-sm">
          Welcome,
          <span className="font-semibold ml-1">
            {user?.firstName}
          </span>
        </div>

        <UserButton afterSignOutUrl="/auth" />
      </div>

      {children}
    </>
  );
}