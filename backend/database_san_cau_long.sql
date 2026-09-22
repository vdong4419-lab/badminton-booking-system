CREATE DATABASE IF NOT EXISTS dat_san_cau_long;
USE dat_san_cau_long;

-- 1. Bảng Người Dùng (UC05, UC06, UC17, UC18)
CREATE TABLE IF NOT EXISTS nguoi_dung (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(15),
    vai_tro ENUM('khach_hang', 'le_tan', 'admin') DEFAULT 'khach_hang',
    trang_thai ENUM('hoat_dong', 'bi_khoa') DEFAULT 'hoat_dong',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Sân Cầu Lông (UC01, UC13, UC19)
CREATE TABLE IF NOT EXISTS san (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_san VARCHAR(50) NOT NULL,
    loai_san VARCHAR(50) DEFAULT 'Trong nhà',
    gia_theo_gio DECIMAL(10,2) DEFAULT 80000,
    trang_thai ENUM('hoat_dong', 'bao_tri') DEFAULT 'hoat_dong'
);

-- 3. Bảng Bảng Giá theo Khung Giờ (UC03, UC14, UC21)
CREATE TABLE IF NOT EXISTS bang_gia_san (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loai_san VARCHAR(50),
    khung_gio VARCHAR(50),
    gia_tien DECIMAL(10,2)
);

-- 4. Bảng Khuyến Mãi (UC04, UC23)
CREATE TABLE IF NOT EXISTS khuyen_mai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_giam_gia VARCHAR(20) UNIQUE NOT NULL,
    phan_tram_giam INT NOT NULL,
    trang_thai ENUM('kich_hoat', 'het_han') DEFAULT 'kich_hoat'
);

-- 5. Bảng Đơn Đặt Sân (UC07, UC08, UC09, UC10, UC12, UC15, UC16, UC25)
CREATE TABLE IF NOT EXISTS don_dat_san (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL,
    san_id INT NOT NULL,
    ngay_dat DATE NOT NULL,
    gio_bat_dau TIME NOT NULL,
    gio_ket_thuc TIME NOT NULL,
    tong_tien DECIMAL(10,2) NOT NULL,
    tien_coc DECIMAL(10,2) NOT NULL,
    phuong_thuc_tt VARCHAR(30) DEFAULT 'momo',
    ma_khuyen_mai VARCHAR(20),
    ly_do_huy TEXT,
    trang_thai ENUM('cho_xac_nhan', 'da_dat_coc', 'dang_su_dung', 'hoan_thanh', 'yeu_cau_huy', 'yeu_cau_doi', 'da_huy') DEFAULT 'da_dat_coc',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (san_id) REFERENCES san(id)
);

-- 6. Bảng Đánh Giá Sân (UC11)
CREATE TABLE IF NOT EXISTS danh_gia_san (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL,
    san_id INT NOT NULL,
    so_sao INT CHECK (so_sao BETWEEN 1 AND 5),
    noi_dung TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (san_id) REFERENCES san(id)
);

-- Dữ liệu mẫu
INSERT INTO san (ten_san, loai_san, gia_theo_gio) VALUES 
('Sân 1 (Thảm Yonex)', 'Trong nhà', 90000),
('Sân 2 (Thảm Victor)', 'Trong nhà', 80000),
('Sân VIP 1', 'VIP', 120000);

INSERT INTO khuyen_mai (ma_giam_gia, phan_tram_giam) VALUES 
('DUYTAN2026', 15),
('BANHMOI', 10);