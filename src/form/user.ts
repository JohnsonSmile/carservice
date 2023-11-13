import { z } from "zod"

export const RegisterForm = z
  .object({
    phone: z.string().regex(/^1[34578]\d{9}$/, {
      message: "手机号格式错误",
    }),
    password: z
      .string()
      .min(6, {
        message: "密码不能少于6位",
      })
      .max(12, {
        message: "密码不能多于12位",
      }),
    repassword: z.string(),
    agree: z.boolean().refine((a) => a, "同意以继续"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "两次密码不一致",
    path: ["repassword"],
  })

export type RegisterFormSchema = z.infer<typeof RegisterForm>

export const LoginForm = z.object({
  phone: z.string().regex(/^1[34578]\d{9}$/, {
    message: "手机号格式错误",
  }),
  password: z
    .string()
    .min(6, {
      message: "密码不能少于6位",
    })
    .max(12, {
      message: "密码不能多于12位",
    }),
})

export type LoginFormSchema = z.infer<typeof LoginForm>
