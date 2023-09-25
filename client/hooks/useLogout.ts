import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/atoms/use-toast";
import { AUTH_TOKEN } from "@/config/storage";
import { useAuth } from "@/providers";

export const useLogout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { refetchUserDetails } = useAuth();

  const handleLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN);
      refetchUserDetails();
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
