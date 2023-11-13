import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Store {
  // user info
  id?: number
  avatar: string
  bio: string
  phone: string
  username: string

  setUser: (
    avatar: string,
    bio: string,
    id: number,
    phone: string,
    username: string
  ) => void
  setAvatar: (avatar: string) => void
  setBio: (bio: string) => void
  setUsername: (username: string) => void
  clear: () => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      id: undefined,
      avatar: "",
      bio: "",
      phone: "",
      username: "",
      setUser: (
        avatar: string,
        bio: string,
        id: number,
        phone: string,
        username: string
      ) => set((state) => ({ ...state, avatar, bio, id, phone, username })),
      setAvatar: (avatar: string) => set((state) => ({ ...state, avatar })),
      setBio: (bio: string) => set((state) => ({ ...state, bio })),
      setUsername: (username: string) =>
        set((state) => ({ ...state, username })),
      clear: () =>
        set(() => ({
          id: undefined,
          avatar: "",
          bio: "",
          phone: "",
          username: "",
        })),
    }),
    {
      name: "carservice",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useStore
