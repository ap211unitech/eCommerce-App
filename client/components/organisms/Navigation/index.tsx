import {
  ChevronsRight,
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
  ShoppingCartIcon,
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
import { CategoryDropDown } from "@/components/molecules/CategoryDropDown";
import MainLogo from "@/components/molecules/MainLogo";
import SearchBar from "@/components/molecules/SearchBar";
import ThemeDropDown from "@/components/molecules/Theme";
import * as queries from "@/graphql/queries";
import { getClient } from "@/lib/client";
import { getErrorMessage } from "@/utils";

import { CategoriesResponse, UserDetailResponse } from "./types";

// Fetch all categories
const getCategories = async () => {
  try {
    const { data } = await getClient().query({
      query: queries.getCategory,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    const categories: CategoriesResponse[] = JSON.parse(data.getCategory);
    return categories;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Get user data (if exists)
const getUserDetail = async () => {
  try {
    const { data } = await getClient().query({
      query: queries.getUserDetail,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    const user: UserDetailResponse = data.getUserDetail;
    return { user };
  } catch (error) {
    console.log(error);
    return { user: null };
  }
};

const Navigation = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-row justify-between items-center border-b-[3px] border-pink">
      <div className="flex flex-row justify-between items-center">
        <Link href={"/"}>
          <MainLogo />
        </Link>
        <div className="flex flex-row justify-between items-center gap-6 px-2">
          {categories.slice(0, 4).map((c) => (
            <div key={c.categoryId} className="pt-1 relative group">
              <Link
                href={`/products?category=${c.categoryId}`}
                className="uppercase dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm group-hover:border-b-[3.5px] border-pink pb-[1.35rem] pr-[0.4rem]"
              >
                {c.name}
              </Link>
              <div className="group-hover:absolute group-hover:flex flex-row hidden -left-[100%] top-[3.2rem] z-10 bg-primary-foreground animate-fadeIn">
                <CategoryDropDown category={c} />
              </div>
            </div>
          ))}
          <Link
            href={`/categories/explore`}
            className="uppercase flex items-center justify-center gap-[1px] hover:gap-1 transition-all dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm pt-1"
            key={Math.random() * 100}
          >
            <span>Explore</span>
            <span>
              <ChevronsRight size={20} />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-8 gap-4">
        <SearchBar />
        <Button className="flex items-center gap-1 relative">
          <ShoppingCartIcon />
          <p className="absolute right-[-7px] top-[-7px] text-white bg-pink rounded-full w-4 h-4 flex justify-center items-center p-3">
            5
          </p>
          Cart
        </Button>
        <UserActions />
        <ThemeDropDown />
      </div>
    </div>
  );
};

const UserActions = async () => {
  const { user } = await getUserDetail();

  return (
    <>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
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
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

export default Navigation;
