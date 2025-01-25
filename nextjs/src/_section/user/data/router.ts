import db from "@db";
import {apiError} from "~/helpers/log";
import {z} from "zod";
import {eq} from "drizzle-orm";
import {userTable} from "~/_section/user/data/schema";
import goCatch from "~/helpers/go-catch";
import {hashPassword} from "~/helpers/password";
import {authedProcedure, router} from "~/rpc/_init";


export const userRouter = router({
  changePassword: authedProcedure.input(z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(5).regex(/(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z])/),
    confirmPassword: z.string(),
  }).refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  )).mutation(async ({ctx, input}) => {
    if (!ctx.session?.user?.email) {
      return apiError({msg: "Not authenticated"})
    }

    const [hash, err] = await goCatch(hashPassword(input.newPassword))
    if (err) {
      return apiError({msg: "Failed to hash password", error: err})
    }

    await db.update(userTable)
      .set({
        passwordHash: hash,
        passwordSetAt: new Date()
      })
      .where(eq(userTable.email, ctx.session.user.email));
  }),
});