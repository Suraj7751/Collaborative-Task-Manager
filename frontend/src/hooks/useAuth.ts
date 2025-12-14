import { useQuery, useMutation } from "@tanstack/react-query";
import { getMe, loginUser, registerUser } from "../api/auth.api";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser,
  });
