
var siteTitle = document.getElementById("title");
var siteUrl = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableData = document.getElementById("tbody");

var sites = [];

if (localStorage.getItem("bookmark")) {
    sites = JSON.parse(localStorage.getItem("bookmark"));
    addtable();

}

    var pattern = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?" +
        "(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
        "i"
    );
  
function validateName(name) {
    if (name.length < 3) {
        return false;
    }
    return true;
}
function validateURL(url) {
    if (!pattern.test(url)) {
        return false;
    }
    return true;
}
function deleteSite(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    })
        .then((result) => {
           
            if (result.isConfirmed) {
                sites.splice(index, 1);
                localStorage.setItem("bookmark", JSON.stringify(sites));
                addtable();
                Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                )
            }           
        })
    
}

function addtable()
{
    tableData.innerHTML = "";
    for (var i = 0; i < sites.length; i++) {
        tableData.innerHTML += `
        <tr>
        <td>${i}</td>
        <td>${sites[i].title}</td>
        <td><a href="${sites[i].url}" target="_blank" class="btn btn-primary">Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button></td>
        </tr>
        `;
    }
}
function clearInput() {
    siteTitle.value = "";
    siteUrl.value = "";
    if (siteTitle.classList.contains("is-valid")) {
        siteTitle.classList.remove("is-valid");
    }
    if (siteUrl.classList.contains("is-valid")) {
        siteUrl.classList.remove("is-valid");
    }
  
}
addBtn.addEventListener('click', function () {
    if (validateName(siteTitle.value) && validateURL(siteUrl.value)) {
        sites.push({
            title: siteTitle.value,
            url: siteUrl.value
        });
        localStorage.setItem("bookmark", JSON.stringify(sites));
        addtable();
        clearInput();
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Site Name or URL is not valid.",
            footer: `<p class="text-start fw-semibold">
        <i class="icon-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="icon-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
        });
    }
}
);

siteTitle.addEventListener("input", () => {
    if (validateName(siteTitle.value)) {
        siteTitle.classList.add("is-valid");
        siteTitle.classList.remove("is-invalid");
    }
    else {
        siteTitle.classList.remove("is-valid");
        siteTitle.classList.add("is-invalid");
    }
});

siteUrl.addEventListener("input", () => {
    if (validateURL(siteUrl.value)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    }
    else {
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
    }
});
