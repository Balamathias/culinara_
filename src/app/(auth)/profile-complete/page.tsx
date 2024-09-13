import CompleteProfile from "@/components/auth/profile-complete";
import { getUser } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  if (user?.first_name || user?.last_name) {
    return redirect('/')
  }

  return (
    <div className='mx-auto max-w-7xl flex flex-col items-center w-full px-4'>
      <CompleteProfile user={user} />
    </div>
  )
}