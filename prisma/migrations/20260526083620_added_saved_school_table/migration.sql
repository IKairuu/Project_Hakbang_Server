-- CreateTable
CREATE TABLE "Saved_School" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,

    CONSTRAINT "Saved_School_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved_School" ADD CONSTRAINT "Saved_School_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved_School" ADD CONSTRAINT "Saved_School_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
