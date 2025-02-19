CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `installments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`installment_number` text NOT NULL,
	`value` real NOT NULL,
	`expiration_date` text NOT NULL,
	`year` integer NOT NULL,
	`month` integer NOT NULL,
	`spent_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `payment_methods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `spents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`total_value` real NOT NULL,
	`total_installments` integer NOT NULL,
	`date` integer NOT NULL,
	`year` integer NOT NULL,
	`month` integer NOT NULL,
	`payment_method_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
