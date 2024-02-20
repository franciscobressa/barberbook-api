/*
  Warnings:

  - You are about to drop the `berbeirosServicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "berbeirosServicos" DROP CONSTRAINT "berbeirosServicos_barbeiro_id_fkey";

-- DropForeignKey
ALTER TABLE "berbeirosServicos" DROP CONSTRAINT "berbeirosServicos_servico_id_fkey";

-- DropTable
DROP TABLE "berbeirosServicos";

-- CreateTable
CREATE TABLE "barbeirosServicos" (
    "barbeiro_id" TEXT NOT NULL,
    "servico_id" INTEGER NOT NULL,

    CONSTRAINT "barbeirosServicos_pkey" PRIMARY KEY ("barbeiro_id","servico_id")
);

-- AddForeignKey
ALTER TABLE "barbeirosServicos" ADD CONSTRAINT "barbeirosServicos_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbeirosServicos" ADD CONSTRAINT "barbeirosServicos_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
