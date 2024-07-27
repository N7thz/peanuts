-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "banner_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_role_key" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "posts_created_at_key" ON "posts"("created_at");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
