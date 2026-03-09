import { create } from "zustand";
import API from "../services/api";

export const useAuthStore = create((set) => ({

  user: null,

  signup: async (data) => {
    const res = await API.post("/signup", data);
    set({ user: res.data.user });
  },

  login: async (email, password) => {
    const res = await API.post("/login", { email, password });
    set({ user: res.data.user });
  },

  logout: async () => {

    try {

      await API.get("/logout"); // backend logout API

      set({ user: null });

    } catch (error) {

      console.log(error);

    }

  }


}));