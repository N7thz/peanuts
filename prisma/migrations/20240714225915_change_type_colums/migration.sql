-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image",
ADD COLUMN     "banner_url" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
ADD COLUMN     "avatar_url" TEXT;
