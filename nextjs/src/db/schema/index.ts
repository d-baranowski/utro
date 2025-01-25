import { pgRole } from 'drizzle-orm/pg-core';

export {userTable} from '~/_section/user/data/schema';
export {orgUserRoleEnum, organisationTable, organisationUserTable, organisationRelations, organisationUserRelations} from "~/_section/organisation/data/schema";

export const apiRole = pgRole('api');
