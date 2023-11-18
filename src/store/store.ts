import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Store {
  // user info
  id?: number
  avatar: string
  bio: string
  phone: string
  username: string
  shouldRefetch: boolean

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
  setShouldRefetch: (shouldRefetch: boolean) => void
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
      shouldRefetch: false,
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
      setShouldRefetch: (shouldRefetch: boolean) =>
        set((state) => ({ ...state, shouldRefetch })),
      clear: () =>
        set(() => ({
          id: undefined,
          avatar: "",
          bio: "",
          phone: "",
          username: "",
          shouldRefetch: false,
        })),
    }),
    {
      name: "carservice",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useStore
