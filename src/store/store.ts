import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Store {
  // user info
  id?: number
  avatar: string
  bio: string
  phone: string
  username: string
  score: number
  shouldRefetch: boolean
  scanOpen: boolean

  setUser: (
    avatar: string,
    bio: string,
    id: number,
    phone: string,
    username: string,
    score: number
  ) => void
  setAvatar: (avatar: string) => void
  setBio: (bio: string) => void
  setUsername: (username: string) => void
  setScore: (score: number) => void
  setShouldRefetch: (shouldRefetch: boolean) => void
  setScanOpen: (scanOpen: boolean) => void
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
      score: 0,
      shouldRefetch: false,
      scanOpen: false,
      setUser: (
        avatar: string,
        bio: string,
        id: number,
        phone: string,
        username: string,
        score: number
      ) =>
        set((state) => ({ ...state, avatar, bio, id, phone, username, score })),
      setAvatar: (avatar: string) => set((state) => ({ ...state, avatar })),
      setBio: (bio: string) => set((state) => ({ ...state, bio })),
      setUsername: (username: string) =>
        set((state) => ({ ...state, username })),
      setScore: (score: number) => set((state) => ({ ...state, score })),
      setShouldRefetch: (shouldRefetch: boolean) =>
        set((state) => ({ ...state, shouldRefetch })),
      setScanOpen: (scanOpen: boolean) =>
        set((state) => ({ ...state, scanOpen })),
      clear: () =>
        set(() => ({
          id: undefined,
          avatar: "",
          bio: "",
          phone: "",
          username: "",
          score: 0,
          shouldRefetch: false,
          scanOpen: false,
        })),
    }),
    {
      name: "carservice",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useStore
