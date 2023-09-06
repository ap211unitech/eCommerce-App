import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/atoms/use-toast";
import { AUTH_TOKEN } from "@/config/storage";

export const useLogout = () => {
  const router = useRouter();

  const { toast } = useToast();

  const handleLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN);
      router.refresh();
      toast({
        title: "Good bye !! 👋👋",
        description: "Logged out successfully",
        variant: "success",
      });
    } catch (error) {}
  };

  return { handleLogout };
};
