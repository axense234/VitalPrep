import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
import { useRouter } from "next/navigation";

export const authenticationClient = () => {
  const profile = useAppSelector(selectProfile);

  const router = useRouter();
  if (!profile.email) {
    router.push("/");
  }
};
