// stores/Store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserControllerService } from "../middleware-api";
import tokenService from "../middleware-api/token/tokenService";

// Define types
type User = {
  id?: string;
  username?: string;
  email: string;
  // roles?: string[];
};

type ThemeMode = "light" | "dark";

type AuthStore = {
  user: User | null;
  mode: ThemeMode;
  loading: boolean;
  error: string | null;

  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;

  // Theme methods
  toggleColorMode: () => void;
};

const useStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      mode: "light",
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await UserControllerService.login({
            email,
            password,
          });

          // Assuming response contains token and user info
          tokenService.token = response.token;

          set({
            user: {
              email: response.email,
              username: response.username,
              // roles: response.roles,
            },
            loading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            loading: false,
          });
          throw error;
        }
      },

      signup: async (email: string, password: string, username: string) => {
        set({ loading: true, error: null });
        try {
          await UserControllerService.createUser({
            email,
            password,
            username,
          });

          // Directly call login
          // await get().login(email, password);

          set({ loading: false });
        } catch (error: any) {
          const errorMessage =
            error.status === 409
              ? "User with this email or username already exists"
              : error.body || error.message || "Signup failed";
          set({
            error: errorMessage,
            loading: false,
          });
          throw error;
        }
      },

      logout: () => {
        tokenService.clearToken();
        set({ user: null });
      },

      validateToken: async () => {
        try {
          const token = tokenService.token;
          if (!token) {
            set({ user: null });
            return false;
          }

          const response = await UserControllerService.validateToken(
            `Bearer ${token}`
          );
          if (response) {
            set({ user: response.user });
            return true;
          }
          tokenService.clearToken();
          set({ user: null });
          return false;
        } catch (error) {
          tokenService.clearToken();
          set({ user: null });
          return false;
        }
      },

      toggleColorMode: () => {
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        }));
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mode: state.mode,
        user: state.user,
      }),
    }
  )
);

export default useStore;
