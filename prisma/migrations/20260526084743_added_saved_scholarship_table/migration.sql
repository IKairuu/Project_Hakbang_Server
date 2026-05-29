-- CreateTable
CREATE TABLE "Saved_Scholarship" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scholarship_id" TEXT NOT NULL,

    CONSTRAINT "Saved_Scholarship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved_Scholarship" ADD CONSTRAINT "Saved_Scholarship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved_Scholarship" ADD CONSTRAINT "Saved_Scholarship_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "Scholarship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
