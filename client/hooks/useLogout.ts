import { deleteCookie } from "cookies-next";

import { useToast } from "@/components/atoms/use-toast";
import { AUTH_TOKEN } from "@/config/storage";

export const useLogout = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN);
      toast({
        title: "Good bye !! 👋👋",
        description: "Logged out successfully",
        variant: "success",
      });
    } catch (error) {}
  };

  return { handleLogout };
};
