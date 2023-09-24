import { deleteCookie } from "cookies-next";

import { useToast } from "@/components/atoms/use-toast";
import { AUTH_TOKEN } from "@/config/storage";
import { useAuth } from "@/providers";

export const useLogout = () => {
  const { toast } = useToast();
  const { refetchUserDetails } = useAuth();

  const handleLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN);
      refetchUserDetails();
      toast({
        title: "Good bye !! 👋👋",
        description: "Logged out successfully",
        variant: "success",
      });
    } catch (error) {}
  };

  return { handleLogout };
};
