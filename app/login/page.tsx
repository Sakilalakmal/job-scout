import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/scout.png";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6 self-center">
        <Link href={"/"} className="flex items-center">
          <Image src={Logo} alt="logo" className="size-30" />
          <h1 className="text-2xl font-bold">
            Job <span className="text-primary">Scout</span>
          </h1>
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
