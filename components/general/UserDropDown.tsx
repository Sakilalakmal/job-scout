import { ChevronDown, Heart, List, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/app/utils/auth";

interface userDropDownProps {
  email: string;
  name: string;
  avatar: string;
}

export function UserDropDown({ avatar, email, name }: userDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto p-0 hover:bg-transparent bg-transparent">
          <Avatar>
            <AvatarImage src={avatar} alt="profile image of user" />
            <AvatarFallback>{avatar.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="4 ml-2" strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] mt-4" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/favorites"}>
              <Heart className="size-4 opacity-60" strokeWidth={2} />
              <span>Favorites jobs</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"/my-jobs"}>
              <List className="size-4 opacity-60" strokeWidth={2} />
              <span>My jobs list</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant={"destructive"} className="w-full">
              <LogOut className="size-4  text-white" strokeWidth={2} />
              <span>Log out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
