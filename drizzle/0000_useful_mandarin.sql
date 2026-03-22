CREATE TABLE "guests" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"presence" boolean NOT NULL,
	"alcohol" text[] NOT NULL,
	"night" boolean NOT NULL,
	"allergia" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_parent_id_guests_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guests"("id") ON DELETE no action ON UPDATE no action;