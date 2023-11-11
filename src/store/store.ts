import { create } from "zustand"

interface Store {
  // user info
  id?: string
  address?: string
  invitation_code?: string
  invitation_count: number
  page_index: number
  discord?: {
    id: string
    name: string
  }
  twitter?: {
    id: string
    name: string
  }
  minted: boolean
  claimed: boolean
  shouldTryBind: boolean
  ftValue: number
  errorInvitionCodes: string[]
  extraBox: number
  extraBoxToClaim: number
  setMinted: (m: boolean) => void
  setClaimed: (c: boolean) => void
  setFtValue: (v: number) => void
  setIndex: (i: number) => void
  setShouldTryBind: (t: boolean) => void
  addErrorInvitionCodes: (code: string) => void
  setExtraBox: (b: number) => void
  setExtraBoxToClaim: (b: number) => void
  clear: () => void
}

const useStore = create<Store>()((set) => ({
  id: undefined,
  address: undefined,
  task_stage: 1,
  task_status: 0,
  discord: undefined,
  twitter: undefined,
  minted: false,
  claimed: false,
  shouldTryBind: true,
  ftValue: 0,
  errorInvitionCodes: [],
  invitation_code: undefined,
  invitation_count: 0,
  userBoxes: [],
  extraBox: 0,
  extraBoxToClaim: 0,
  page_index: 0,
  setMinted: (m) => set((state) => ({ ...state, minted: m })),
  setClaimed: (c) => set((state) => ({ ...state, claimed: c })),
  setFtValue: (v) => set((state) => ({ ...state, ftValue: v })),
  setIndex: (i) => set((state) => ({ ...state, page_index: i })),
  setShouldTryBind: (t: boolean) =>
    set((state) => ({ ...state, shouldTryBind: t })),
  setExtraBox: (b: number) => set((state) => ({ ...state, extraBox: b })),
  setExtraBoxToClaim: (b: number) =>
    set((state) => ({ ...state, extraBoxToClaim: b })),
  addErrorInvitionCodes: (code: string) =>
    set((state) => {
      const codes = state.errorInvitionCodes
      if (codes.includes(code)) {
        return state
      }
      codes.push(code)
      return {
        ...state,
        errorInvitionCodes: codes,
      }
    }),
  clear: () =>
    set(() => ({
      id: undefined,
      address: undefined,
      task_stage: 1,
      task_status: 0,
      discord: undefined,
      twitter: undefined,
      minted: false,
      invitation_code: undefined,
      invitation_count: 0,
      claimed: false,
      shouldTryBind: true,
      ftValue: 0,
      errorInvitionCodes: [],
      userBoxes: [],
      extraBox: 0,
      page_index: 0,
    })),
}))

export default useStore
