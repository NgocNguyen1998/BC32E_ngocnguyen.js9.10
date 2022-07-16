mangNhanVien = [];

// in ra table danh sach nhan vien + tính tổng lương + xếp loại
function renderTableNhanVien(arrNhanVien) {
    var html = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        nv.tongLuong = function () {
            var tongTien = 0;
            if (this.chucvu == 'Sếp') {
                tongTien = +this.luongCB * 3;
            } else if (this.chucvu == 'Trưởng phòng') {
                tongTien = +this.luongCB * 2;
            } else if (this.chucvu == 'Nhân viên') {
                tongTien = +this.luongCB * 2;
            } else {
                tongTien = 'Không hợp lệ'
            }
            return tongTien.toLocaleString();
        }
        nv.xepLoai = function () {
            var xepLoai = '';
            if (this.gioLam >= 192) {
                xepLoai = 'Xuất sắc'
            } else if (this.gioLam >= 176 && this.gioLam < 192) {
                xepLoai = 'Giỏi'
            } else if (this.gioLam >= 160 && this.gioLam < 176) {
                xepLoai = 'Khá'
            } else if (this.gioLam < 160) {
                xepLoai = 'Trung Bình'
            }
            return xepLoai;
        }

        html += `
    <tr>
       <td>${nv.tknv}</td>
       <td>${nv.name}</td>
       <td>${nv.email}</td>
       <td>${nv.datepicker}</td>
       <td>${nv.chucvu}</td>
       <td>${nv.tongLuong()}</td>
       <td>${nv.xepLoai()}</td>
       <td><button class = "btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xóa</button>
       <button  class = "btn btn-primary" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
       </td>
    </tr>
    `
    }
    document.querySelector('#tableDanhSach').innerHTML = html
    return html;
}



// Thêm nhân viên
document.querySelector('#btnThemNV').onclick = function () {
    var nv = new NhanVien();
    nv.tknv = document.querySelector('#tknv').value;

    nv.name = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    var ngay = document.querySelector('#datepicker').value;
    nv.datepicker = moment(ngay).format('MM-DD-YYYY');
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucvu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    var valid = true;
    // Kiểm tra rỗng
    valid =
        kiemTraRong(nv.tknv, "#tbTKNV", "Tài khoản") &
        kiemTraRong(nv.name, "#tbTen", "Tên nhân viên") &
        kiemTraRong(nv.email, "#tbEmail", "Email") &
        kiemTraRong(nv.password, "#tbMatKhau", "Mật khẩu") &
        kiemTraRong(nv.datepicker, "#tbNgay", "Ngày") &
        kiemTraRong(nv.luongCB, "#tbLuongCB", "Lương cơ bản") &
        kiemTraRong(nv.chucvu, "#tbChucVu", "Chức vụ") &
        kiemTraRong(nv.gioLam, "#tbGiolam", "Giờ làm");
    //   kiểm tra độ dài, giá trị
    valid &=
        kiemTraDoDai(nv.tknv, "#tbTKNV1", "Tài khoản", 4, 6) &
        kiemTraDoDai(nv.password, "#tbMatKhau1", "Mật khẩu", 6, 10) &
        kiemTraTatCaKyTu(nv.name, "#tbTen1", "Tên nhân viên") &
        kiemTraEmail(nv.email, "#tbEmail1", "Email") &
        kiemTraPassword(nv.password, "#tbMatKhau2", "Mật khẩu") &
        kiemTraNgay(nv.datepicker, "#tbNgay1", "Ngày") &
        kiemTraGiaTri(nv.luongCB, "#tbLuongCB1", "Lương ", 1000000, 20000000) &
        kiemTraGiaTri(nv.gioLam, "#tbGiolam1", "Giờ làm", 80, 200) &
        chonChucVu(nv.chucvu, '#tbChucVu', 'Chức vụ')


    if (!valid) {
        return;
    }
    mangNhanVien.push(nv);
    renderTableNhanVien(mangNhanVien);
    luuLocalStorage()
}

// Xoa nhan vien
function xoaNhanVien(soTkOnclick) {
    var indexDel = mangNhanVien.findIndex(NhanVien => NhanVien.tknv == soTkOnclick)
    if (indexDel !== -1) {
        mangNhanVien.splice(indexDel, 1);
    }

    renderTableNhanVien(mangNhanVien)

}
//  Chỉnh sửa
function chinhSua(taiKhoanOnclick) {

    var indexEdit = mangNhanVien.findIndex(NhanVien => NhanVien.tknv === taiKhoanOnclick)
    var nvEdit = mangNhanVien[indexEdit];
    document.querySelector('#tknv').disabled = true;
    document.querySelector('#tknv').value = nvEdit.tknv;
    document.querySelector('#name').value = nvEdit.name;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#datepicker').value = nvEdit.datepicker;
    document.querySelector('#chucvu').value = nvEdit.chucvu;
    document.querySelector('#luongCB').value = +nvEdit.luongCB;

    document.querySelector('#gioLam').value = nvEdit.gioLam;
}
document.querySelector('#btnCapNhat').onclick = function () {
    var nv = new NhanVien();
    nv.tknv = document.querySelector('#tknv').value;

    nv.name = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    var ngay = document.querySelector('#datepicker').value;
    nv.datepicker = moment(ngay).format('MM-DD-YYYY');
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucvu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    var valid = true;
    // Kiểm tra rỗng
    valid =
        kiemTraRong(nv.tknv, "#tbTKNV", "Tài khoản") &
        kiemTraRong(nv.name, "#tbTen", "Tên nhân viên") &
        kiemTraRong(nv.email, "#tbEmail", "Email") &
        kiemTraRong(nv.password, "#tbMatKhau", "Mật khẩu") &
        kiemTraRong(nv.datepicker, "#tbNgay", "Ngày") &
        kiemTraRong(nv.luongCB, "#tbLuongCB", "Lương cơ bản") &
        kiemTraRong(nv.chucvu, "#tbChucVu", "Chức vụ") &
        kiemTraRong(nv.gioLam, "#tbGiolam", "Giờ làm");
    //   kiểm tra độ dài, giá trị
    valid &=
        kiemTraDoDai(nv.tknv, "#tbTKNV1", "Tài khoản", 4, 6) &
        kiemTraDoDai(nv.password, "#tbMatKhau1", "Mật khẩu", 6, 10) &
        kiemTraTatCaKyTu(nv.name, "#tbTen1", "Tên nhân viên") &
        kiemTraEmail(nv.email, "#tbEmail1", "Email") &
        kiemTraPassword(nv.password, "#tbMatKhau2", "Mật khẩu") &
        kiemTraNgay(nv.datepicker, "#tbNgay1", "Ngày") &
        kiemTraGiaTri(nv.luongCB, "#tbLuongCB1", "Lương ", 1000000, 20000000) &
        kiemTraGiaTri(nv.gioLam, "#tbGiolam1", "Giờ làm", 80, 200) &
        chonChucVu(nv.chucvu, '#tbChucVu', 'Chức vụ')

    if (!valid) {
        return;
    }
    var indexEdit = mangNhanVien.findIndex(NhanVien => NhanVien.tknv === nv.tknv)
    mangNhanVien[indexEdit].tknv = nv.tknv;
    mangNhanVien[indexEdit].name = nv.name;
    mangNhanVien[indexEdit].email = nv.email;
    mangNhanVien[indexEdit].datepicker = nv.datepicker;

    mangNhanVien[indexEdit].chucvu = nv.chucvu;
    mangNhanVien[indexEdit].luongCB = nv.luongCB;
    mangNhanVien[indexEdit].gioLam = nv.gioLam;
    renderTableNhanVien(mangNhanVien);
    document.querySelector('#tknv').disabled = false;

}

// Search
document.querySelector('#btnTimNV').onclick = function () {
    var xepLoai = document.querySelector('#searchName').value;
    var html = '';
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        if (nv.xepLoai() == xepLoai) {
            html += `
            <tr>
               <td>${nv.tknv}</td>
               <td>${nv.name}</td>
               <td>${nv.email}</td>
               <td>${nv.datepicker}</td>
               <td>${nv.chucvu}</td>
               <td>${nv.tongLuong()}</td>
               <td>${nv.xepLoai()}</td>
               <td><button class = "btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xóa</button>
               <button  class = "btn btn-primary" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
               </td>
            </tr>
           `
        }
        document.querySelector('#tableDanhSach').innerHTML = html

    }
}




function luuLocalStorage() {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien)
}
function layLocalStorage() {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien1 = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien1);
        renderTableNhanVien(mangNhanVien);
    }
}
window.onload = function () {
    layLocalStorage();
}



