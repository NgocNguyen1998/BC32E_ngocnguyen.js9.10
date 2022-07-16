//   Hàm kiểm ra rỗng
function kiemTraRong(value, selectorError, name) {

  if (value.trim() !== "") {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML = name + " không được bỏ trống";
  return false;
}

// hàm kiểm tra tất cả ký tự
function kiemTraTatCaKyTu(value, selectorError, name) {
  var regexLetter = /^[A-Z a-z]+$/;
  if (regexLetter.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML = name + " tất cả phải là chữ";
  return false;
}

// hàm kiểm tra tất cả số
function kiemTraTatCaSo(value, selectorError, name) {
  var regexNumber = /^[0-9]+$/;
  if (regexNumber.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML = name + " tất cả phải là số";
  return false;
}

// hàm kiểm tra password
function kiemTraPassword(value, selectorError, name) {
  var regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  if (regexPassword.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML =
    name + " chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}
// hàm kiểm tra email
function kiemTraEmail(value, selectorError, name) {
  var regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML = name + " không hợp lệ";
  return false;
}

// kiểm tra ngày
function kiemTraNgay(value, selectorError, name) {
  var regexDate =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (regexDate.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML =
    name + " không đúng đinh dạng ngày";
  return false;
}

// kiểm tra độ dài
function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
  var lengthValue = value.length;
  if (lengthValue > maxLength || lengthValue < minLength) {
    document.querySelector(selectorError).style.display = 'block'
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLength + " đến " + maxLength;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

// kiểm tra giá trị
function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {

  if (+value > +maxValue || +value < +minValue) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến " + maxValue;
    document.querySelector(selectorError).style.display = 'block'
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";

  return true;
}
// kiểm tra chức vụ
function chonChucVu(value, selectorError, name) {
  if (value == 'Sếp' | value == 'Trưởng phòng' | value == 'Nhân viên') {
    document.querySelector(selectorError).innerHTML = '';
    return true;
  }
  document.querySelector(selectorError).style.display = 'block'
  document.querySelector(selectorError).innerHTML = name + ' là bắt buộc!';
  return false;
}
function chonLoaiNhanVien(value, selectorError, name) {
  if (value == 'Xuất sắc' | value == 'Giỏi' | value == 'Khá'| value == 'Trung Bình') {
    document.querySelector(selectorError).innerHTML = '';
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + ' phải được chọn!';
  return false;
}