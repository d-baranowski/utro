CREATE TYPE "public"."orgUserRole" AS ENUM('OWNER', 'EMPLOYEE');--> statement-breakpoint
CREATE ROLE "api";--> statement-breakpoint
CREATE TABLE "organisation" (
	"id" varchar(27) PRIMARY KEY DEFAULT ksuid() NOT NULL,
	"displayName" text NOT NULL,
	"legalName" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organisation_displayName_unique" UNIQUE("displayName")
);
--> statement-breakpoint
CREATE TABLE "organisationUser" (
	"orgId" varchar(27),
	"userId" varchar(27),
	"role" "orgUserRole" NOT NULL,
	"joinedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(27) PRIMARY KEY DEFAULT ksuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"password_hash" text,
	"password_set_at" timestamp DEFAULT now(),
	"role" text,
	CONSTRAINT "email_user_unique_index" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "organisationUser" ADD CONSTRAINT "organisationUser_orgId_organisation_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."organisation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organisationUser" ADD CONSTRAINT "organisationUser_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "user" USING btree ("email");