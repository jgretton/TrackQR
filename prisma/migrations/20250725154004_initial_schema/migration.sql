-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "supabase_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_codes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "destination_url" TEXT NOT NULL,
    "redirect_code" TEXT NOT NULL,
    "qr_image_data" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scans" (
    "id" TEXT NOT NULL,
    "qr_code_id" TEXT NOT NULL,
    "user_id" TEXT,
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "country" TEXT,
    "city" TEXT,
    "device_type" TEXT,
    "referrer" TEXT,

    CONSTRAINT "scans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_supabase_id_key" ON "users"("supabase_id");

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_redirect_code_key" ON "qr_codes"("redirect_code");

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_user_id_name_key" ON "qr_codes"("user_id", "name");

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scans" ADD CONSTRAINT "scans_qr_code_id_fkey" FOREIGN KEY ("qr_code_id") REFERENCES "qr_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scans" ADD CONSTRAINT "scans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
