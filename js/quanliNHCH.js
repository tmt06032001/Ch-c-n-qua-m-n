$(window).ready(function () {
    // Sau khi đóng modal, xóa tất cả dữ liệu các trường, các thông báo trong form trong modal
    $(".close").click(function () {
        xoaRongForm()
    })
    var modal = document.getElementById("myModal1");
    $(window).click(function (event) {
        if (event.target == modal) {
            xoaRongForm()
        }
    })

    // input:file
    const fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem"),
        fileSelected = document.getElementById("fileSelected");

    fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    }, false);

    fileElem.addEventListener("change", handleFiles, false);

    function handleFiles() {
        fileSelected.innerHTML = "";

        if (this.files.length > 0) {
            const regexFileExtension = /^.+\.(png|jpeg)$/i
            if (!regexFileExtension.test(this.value)) {
                fileSelected.innerHTML = "Không thể thêm ảnh (chỉ được phép thêm tệp đuôi .png, .jpeg)";
                fileSelected.style.color = "red"
                return false
            }
            const img = document.createElement("img");
            fileSelected.appendChild(img);
            img.src = URL.createObjectURL(this.files[0]);
            img.style.width = "100%"
            img.onload = function () {
                URL.revokeObjectURL(this.src);
            }
            return true
        }
    }

    // Sau khi nhấn nút Lưu câu hỏi
    $("#btnLuuCH").click(function () {

        // Kiểm tra dữ liệu nhập trong form modal Thêm câu hỏi
        if (!kiemtraDulieuForm()) {
            return
        }


        // Khi dữ liệu nhập hợp lệ:

        // - Đóng modal
        $("#myModal1").modal("hide")

        // - Thêm câu hỏi vào table chứa danh sách các câu hỏi

        // + Đếm số row của table trừ row header
        let stt = $("#myTable tr").length - 1
        let khoi = $("#khoi").val().replace("khoi", "")
        let tenGV = document.getElementsByClassName("tenGV")[0].innerText
        let cauhoi = $("#txtNoidungCH").val()
        let loaibaiKiemtra = $("#loaibaiKiemtra option[value=" + $("#loaibaiKiemtra").val() + "]").text()
        let ngaytao = ""

        // Lấy ngày tháng năm hiện tại
        ngaytao = layNgayHienTai()

        // Chèn thông tin của câu hỏi vào table
        $("#myTable").append("<tr data-toggle='modal' data-target='#myModal2'>" +
            "<td>" + (++stt) + "</td>" +
            "<td>" + khoi + "</td>" +
            "<td>" + tenGV + "</td>" +
            "<td>" + cauhoi + "</td>" +
            "<td>" + loaibaiKiemtra + "</td>" +
            "<td>Chưa duyệt</td>" +
            "<td>" + ngaytao + "</td>" +
            "</tr>")

        // - Xóa tất cả trường dữ liệu của modal
        xoaRongForm()
    })

    // Sau khi nhấn nút tiếp tục thêm câu hỏi
    $("#btnTieptuc").click(function () {

        // Kiểm tra dữ liệu nhập trong form modal Thêm câu hỏi
        if (!kiemtraDulieuForm()) {
            return
        }


        // Khi dữ liệu nhập hợp lệ:

        // - Đóng modal
        $("#myModal1").modal("hide")

        // - Thêm câu hỏi vào table chứa danh sách các câu hỏi

        // + Đếm số row của table trừ row header
        let stt = $("#myTable tr").length - 1
        let khoi = $("#khoi").val().replace("khoi", "")
        let tenGV = document.getElementsByClassName("tenGV")[0].innerText
        let cauhoi = $("#txtNoidungCH").val()
        let loaibaiKiemtra = $("#loaibaiKiemtra option[value=" + $("#loaibaiKiemtra").val() + "]").text()
        let ngaytao = ""

        // Lấy ngày tháng năm hiện tại
        ngaytao = layNgayHienTai()

        // Chèn thông tin của câu hỏi vào table
        $("#myTable").append("<tr data-toggle='modal' data-target='#myModal2'>" +
            "<td>" + (++stt) + "</td>" +
            "<td>" + khoi + "</td>" +
            "<td>" + tenGV + "</td>" +
            "<td>" + cauhoi + "</td>" +
            "<td>" + loaibaiKiemtra + "</td>" +
            "<td>Chưa duyệt</td>" +
            "<td>" + ngaytao + "</td>" +
            "</tr>")

        // - Xóa tất cả trường dữ liệu của modal
        xoaRongForm()

        // - Mở modal mới

        // Đợi 1 giây sau khi modal cũ đóng xong thì mới mở modal mới
        const myInterval = setTimeout(function () {
            $("#myModal1").modal("show")
            clearTimeout(myInterval)
        }, 1000)
    })
})

// Hàm xóa rỗng tất cả các trường, thông báo trong form
function xoaRongForm() {
    $("#txtNoidungCH").val("")
    $("#errorNoidungCH").text("")
    $("#txtDapanA").val("")
    $("#errorDapanA").text("")
    $("#txtDapanB").val("")
    $("#errorDapanB").text("")
    $("#txtDapanC").val("")
    $("#errorDapanC").text("")
    $("#txtDapanD").val("")
    $("#errorDapanD").text("")
    $("#fileSelected").html("")
}

// Hàm kiểm tra dữ liệu nhập trong form modal "Thêm câu hỏi"
function kiemtraDulieuForm() {
    if ($("#txtNoidungCH").val().trim() == "") {
        $("#errorNoidungCH").text("Vui lòng nhập nội dung câu hỏi!")
        return false
    }
    $("#errorNoidungCH").text("")

    if ($("#txtDapanA").val().trim() == "") {
        $("#errorDapanA").text("Vui lòng nhập phương án trả lời câu A!")
        return false
    }
    $("#errorDapanA").text("")

    if ($("#txtDapanB").val().trim() == "") {
        $("#errorDapanB").text("Vui lòng nhập phương án trả lời câu B!")
        return false
    }
    $("#errorDapanB").text("")

    if ($("#txtDapanC").val().trim() == "") {
        $("#errorDapanC").text("Vui lòng nhập phương án trả lời câu C!")
        return false
    }
    $("#errorDapanC").text("")

    if ($("#txtDapanD").val().trim() == "") {
        $("#errorDapanD").text("Vui lòng nhập phương án trả lời câu D!")
        return
    }
    $("#errorDapanD").text("")

    // Khi tất cả các trường hợp lệ
    return true
}

// Hàm lấy ngày tháng năm hiện tại
function layNgayHienTai() {
    let ngaytao = ""
    let date = new Date()
    let ngay = date.getDate()
    let thang = date.getMonth() + 1

    if (("" + ngay).length === 1) {
        ngay = "0" + ngay
    }
    if (("" + thang).length === 1) {
        thang = "0" + thang
    }

    let nam = date.getFullYear()
    ngaytao = ngay + "/" + thang + "/" + nam

    return ngaytao
}