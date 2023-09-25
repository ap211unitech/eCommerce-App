"use client";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Skeleton } from "@/components/atoms/skeleton";
import { useLogout } from "@/hooks";
import { useAuth } from "@/providers";

type Props = {
  token: string | undefined;
};

export const UserActions = ({ token }: Props) => {
  return (
    <>
      {/* <button onClick={() => handleRevalidateTag(QUERY_TAGS.categories())}>
        Revalidate
      </button> */}
      {token ? (
        <>
          <UserActionsDropdown />
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <Button variant={"outline"}>Login</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"secondary"}>Register</Button>
          </Link>
        </>
      )}
    </>
  );
};

const UserActionsDropdown = () => {
  const { handleLogout } = useLogout();

  const { userDetailsLoading: loading } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User strokeWidth={2.5} />
          <span className="ml-1 lg:hidden">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {loading && (
          <>
            <DropdownSkeleton />
            <DropdownSkeleton />
          </>
        )}
        {!loading && (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"https://github.com/ap211unitech/eCommerce-App"}
                target="_blank"
                className="flex items-center justify-center"
              >
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub Repo</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[60%] h-6 m-2" />
      <DropdownMenuSeparator />
      {new Array(3).fill(5).map((e, ind) => (
        <div key={e * ind} className="flex items-center gap-2 my-3 ml-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[70%] h-6" />
        </div>
      ))}
      <DropdownMenuSeparator />
    </div>
  );
};
