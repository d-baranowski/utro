import {insertSchema, organisationTable, organisationUserTable} from "~/_section/organisation/data/schema";
import {authedProcedure, router} from "~/rpc/_init";
import db from "@db";
import goCatch from "~/helpers/go-catch";
import {apiError} from "@log";

const organisationRouter = router({
  create: authedProcedure
    .input(insertSchema)
    .mutation(async ({ctx, input}) => {      
      return await db.transaction(async (tx) => {
        const [resp, err] = await goCatch(tx.insert(organisationTable).values(input).returning());
        if (err) {
          return apiError({
            msg: "Failed to create organization",
            id: "ORG_CREATE_001",
          })
        }

        if (!resp || !resp?.at(0)) {
          return apiError({
            msg: "Organisation not returned",
            id: "ORG_CREATE_002"
          })
        }

        const newOrg = resp.at(0);
        if (!newOrg) {
          return apiError({
            msg: "Organisation not returned",
            id: "ERR_002"
          })
        }

        if(!ctx.dbUser?.id){
          return apiError({
            msg: "User not present in context",
            id: "ORG_CREATE_000",
          })
        }

        await tx.insert(organisationUserTable)
          .values({
            orgId: newOrg.id,
            userId: ctx.dbUser.id,
            role: "OWNER", // Enum value
          });

        return newOrg
      })
    }),
  getMyOrganisations: authedProcedure.query(async ({ctx}) => {
    const userId = ctx?.dbUser?.id;
    if (!userId) {
      return apiError({
        msg: "Db user not present in authed procedure",
        id: "ORG_GMO_000",
      })
    }

    const [resp, err] = await goCatch(db.query.organisationUserTable.findMany({
        where: (orgUser, {eq}) => eq(orgUser.userId, userId),
        with: {
          organisation: true, // Fetch related organization data
        },
      })
    );

    if (err) {
      return apiError({
        msg: "Failed to get organizations",
        id: "ORG_GMO_001",
        error: err,
      })
    }

    if (!resp) {
      return apiError({
        msg: "No organizations response null",
        id: "ORG_GMO_002",
      })
    }

    return resp.map(o => ({...o.organisation, role: o.role}))
  })
});

export default organisationRouter;