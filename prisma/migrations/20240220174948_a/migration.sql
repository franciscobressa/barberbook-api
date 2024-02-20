/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Barbearia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Barbeiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BarbeiroServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HorarioDisponivel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "diasSemana" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO');

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_barbeiro_id_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_servico_id_fkey";

-- DropForeignKey
ALTER TABLE "BarbeiroServico" DROP CONSTRAINT "BarbeiroServico_barbeiro_id_fkey";

-- DropForeignKey
ALTER TABLE "BarbeiroServico" DROP CONSTRAINT "BarbeiroServico_servico_id_fkey";

-- DropForeignKey
ALTER TABLE "HorarioDisponivel" DROP CONSTRAINT "HorarioDisponivel_barbeiro_id_fkey";

-- DropForeignKey
ALTER TABLE "_BarbeiroToServico" DROP CONSTRAINT "_BarbeiroToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_BarbeiroToServico" DROP CONSTRAINT "_BarbeiroToServico_B_fkey";

-- DropTable
DROP TABLE "Agendamento";

-- DropTable
DROP TABLE "Barbearia";

-- DropTable
DROP TABLE "Barbeiro";

-- DropTable
DROP TABLE "BarbeiroServico";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "HorarioDisponivel";

-- DropTable
DROP TABLE "Servico";

-- DropEnum
DROP TYPE "DiaSemana";

-- CreateTable
CREATE TABLE "barbearia" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "barbearia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbeiros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto_perfil" TEXT,
    "unidade_id" TEXT NOT NULL,

    CONSTRAINT "barbeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horariosDisponiveis" (
    "id" TEXT NOT NULL,
    "diaSemana" "diasSemana" NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "barbeiro_id" TEXT NOT NULL,

    CONSTRAINT "horariosDisponiveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto_perfil" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berbeirosServicos" (
    "barbeiro_id" TEXT NOT NULL,
    "servico_id" INTEGER NOT NULL,

    CONSTRAINT "berbeirosServicos_pkey" PRIMARY KEY ("barbeiro_id","servico_id")
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "agendamento_id" SERIAL NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "barbeiro_id" TEXT NOT NULL,
    "servico_id" INTEGER NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("agendamento_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barbeiros_email_key" ON "barbeiros"("email");

-- CreateIndex
CREATE INDEX "barbeiro_id_index" ON "horariosDisponiveis"("barbeiro_id");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "barbeiros" ADD CONSTRAINT "barbeiros_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horariosDisponiveis" ADD CONSTRAINT "horariosDisponiveis_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berbeirosServicos" ADD CONSTRAINT "berbeirosServicos_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berbeirosServicos" ADD CONSTRAINT "berbeirosServicos_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_barbeiro_id_fkey" FOREIGN KEY ("barbeiro_id") REFERENCES "barbeiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarbeiroToServico" ADD CONSTRAINT "_BarbeiroToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "barbeiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarbeiroToServico" ADD CONSTRAINT "_BarbeiroToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
