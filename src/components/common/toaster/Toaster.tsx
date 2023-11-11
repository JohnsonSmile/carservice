"use client"

import {
  Id,
  ToastContainer,
  ToastContent,
  ToastOptions,
  UpdateOptions,
  toast,
} from "react-toastify"

// const contextClass = {
//   success: "bg-ui-up text-ui-white",
//   error: "bg-ui-down text-ui-white",
//   info: "bg-ui-white1 text-ui-bt0",
//   warning: "bg-ui-primary text-ui-white",
//   default: "bg-ui-white1 text-ui-bt0",
//   dark: "bg-white-600 font-gray-300",
// }

const AUTO_CLOSE_MS = 3000

export const useToaster = () => {
  const success = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.success(content, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
  }
  const info = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.info(content, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
  }
  const warn = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.warn(content, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
  }
  const warning = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.warning(content, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
  }
  const error = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.error(content, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
  }
  const loading = (
    content: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined
  ): Id => {
    return toast.loading(content, options)
  }
  const update = (toastId: Id, options?: UpdateOptions<{}>): Id => {
    toast.update(toastId, {
      autoClose: AUTO_CLOSE_MS,
      closeButton: false,
      icon: false,
      ...options,
    })
    return toastId
  }
  const isActive = (toastId: Id): boolean => {
    return toast.isActive(toastId)
  }
  const dismiss = (toastId: Id) => {
    toast.dismiss(toastId)
  }
  return {
    success,
    info,
    warn,
    warning,
    error,
    loading,
    update,
    isActive,
    dismiss,
  }
}

const Toaster = () => {
  return (
    <ToastContainer
      className={"md:w-auto"}
      hideProgressBar={true}
      closeButton={false}
      position="top-center"
      //   icon={(context) => {
      //     context.type
      //   }}
      // toastClassName={(context) => {
      //   if (context) {
      //     const { type } = context
      //     return (
      //       contextClass[type || "default"] +
      //       " relative flex w-full md:w-[415px] mt-1 min-h-[45px] px-2 rounded-[10px] justify-between items-center text-sm leading-[18px] overflow-hidden cursor-pointer"
      //     )
      //   }
      //   return contextClass["default"]
      // }}
    />
  )
}

export default Toaster
