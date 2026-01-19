-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `level` ENUM('Admin', 'Owner', 'Kurir') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nama_pelanggan` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tgl_lahir` DATETIME(3) NULL,
    `telepon` VARCHAR(191) NULL,
    `alamat1` VARCHAR(191) NULL,
    `alamat2` VARCHAR(191) NULL,
    `alamat3` VARCHAR(191) NULL,
    `kartu_id` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_pembayarans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `metode_pembayaran` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metode_pembayarans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_jenis_pembayaran` BIGINT NOT NULL,
    `no_rek` VARCHAR(191) NOT NULL,
    `tempat_bayar` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pakets` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nama_paket` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `jumlah_pax` INTEGER NOT NULL,
    `harga_paket` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `foto1` VARCHAR(191) NULL,
    `foto2` VARCHAR(191) NULL,
    `foto3` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemesanans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_pelanggan` BIGINT NOT NULL,
    `id_jenis_bayar` BIGINT NOT NULL,
    `no_resi` VARCHAR(191) NOT NULL,
    `tgl_pesan` DATETIME(3) NOT NULL,
    `status_pesan` ENUM('MenungguKonfirmasi', 'SedangDiproses', 'MenungguKurir', 'PesananSelesai') NOT NULL,
    `total_bayar` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_pemesanans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `id_pemesanan` BIGINT NOT NULL,
    `id_paket` BIGINT NOT NULL,
    `subtotal` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengirimans` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `tgl_kirim` DATETIME(3) NOT NULL,
    `tgl_tiba` DATETIME(3) NULL,
    `status_kirim` ENUM('SedangDikirim', 'TibaDiTujuan') NOT NULL,
    `bukti_foto` VARCHAR(191) NULL,
    `id_pesan` BIGINT NOT NULL,
    `id_user` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `metode_pembayarans` ADD CONSTRAINT `metode_pembayarans_id_jenis_pembayaran_fkey` FOREIGN KEY (`id_jenis_pembayaran`) REFERENCES `jenis_pembayarans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemesanans` ADD CONSTRAINT `pemesanans_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemesanans` ADD CONSTRAINT `pemesanans_id_jenis_bayar_fkey` FOREIGN KEY (`id_jenis_bayar`) REFERENCES `jenis_pembayarans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pemesanans` ADD CONSTRAINT `detail_pemesanans_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pemesanans` ADD CONSTRAINT `detail_pemesanans_id_paket_fkey` FOREIGN KEY (`id_paket`) REFERENCES `pakets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengirimans` ADD CONSTRAINT `pengirimans_id_pesan_fkey` FOREIGN KEY (`id_pesan`) REFERENCES `pemesanans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengirimans` ADD CONSTRAINT `pengirimans_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
