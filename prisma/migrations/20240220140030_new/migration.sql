/*
  Warnings:

  - Changed the type of `diaSemana` on the `HorarioDisponivel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO');

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_barbeiro_id_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_servico_id_fkey";

-- AlterTable
ALTER TABLE "HorarioDisponivel" DROP COLUMN "diaSemana",
ADD COLUMN     "diaSemana" "DiaSemana" NOT NULL;

-- CreateTable
CREATE TABLE "BarbeiroServico" (
    "barbeiro_id" TEXT NOT NULL,
    "servico_id" INTEGER NOT NULL,

    CONSTRAINT "BarbeiroServico_pkey" PRIMARY KEY ("barbeiro_id","servico_id")
);

-- AddForeignKey
ALTER TABLE "BarbeiroServico" ADD CONSTRAINT "BarbeiroServico_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "Barbeiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarbeiroServico" ADD CONSTRAINT "BarbeiroServico_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "Barbeiro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
