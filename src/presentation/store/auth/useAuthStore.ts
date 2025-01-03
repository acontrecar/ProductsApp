import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "../../../action/auth/auth";
import { StorageAdapter } from "../../../config/adapters/async-storage";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logOut: () => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "cheking",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    console.log({ resp });

    await StorageAdapter.setItem("token", resp.token);

    set({
      status: "authenticated",
      token: resp.token,
      user: resp.user,
    });

    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }

    await StorageAdapter.setItem("token", resp.token);
    set({ status: "authenticated", token: resp.token, user: resp.user });
  },

  logOut: async () => {
    await StorageAdapter.removeItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },

  register: async (fullName: string, email: string, password: string) => {
    const resp = await authRegister(email, password, fullName);

    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    console.log({ resp });

    await StorageAdapter.setItem("token", resp.token);

    set({
      status: "authenticated",
      token: resp.token,
      user: resp.user,
    });

    return true;
  },
}));
