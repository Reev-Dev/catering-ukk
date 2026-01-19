/*
  Warnings:

  - You are about to alter the column `jenis` on the `pakets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `kategori` on the `pakets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the `metode_pembayarans` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `pelanggans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_resi]` on the table `pemesanans` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `metode_pembayarans` DROP FOREIGN KEY `metode_pembayarans_id_jenis_pembayaran_fkey`;

-- AlterTable
ALTER TABLE `pakets` MODIFY `jenis` ENUM('Prasmanan', 'Box') NOT NULL,
    MODIFY `kategori` ENUM('Pernikahan', 'Selamatan', 'UlangTahun', 'StudyTour', 'Rapat') NOT NULL;

-- AlterTable
ALTER TABLE `pengirimans` MODIFY `tgl_kirim` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status_kirim` ENUM('SedangDikirim', 'TibaDiTujuan') NOT NULL DEFAULT 'SedangDikirim';

-- DropTable
DROP TABLE `metode_pembayarans`;

-- CreateTable
CREATE TABLE `detail_jenis_pembayarans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_jenis_pembayaran` BIGINT NOT NULL,
    `no_rek` VARCHAR(191) NOT NULL,
    `tempat_bayar` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `pelanggans_email_key` ON `pelanggans`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `pemesanans_no_resi_key` ON `pemesanans`(`no_resi`);

-- AddForeignKey
ALTER TABLE `detail_jenis_pembayarans` ADD CONSTRAINT `detail_jenis_pembayarans_id_jenis_pembayaran_fkey` FOREIGN KEY (`id_jenis_pembayaran`) REFERENCES `jenis_pembayarans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
