function login() {
    let name = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (name === "" || pass === "") {
        alert("Please enter name and password");
        return;
    }

    let savedPass = localStorage.getItem("diaryPass");

    if (savedPass === null) {
        localStorage.setItem("diaryPass", pass);
        localStorage.setItem("diaryUser", name);
    }

    if (pass === localStorage.getItem("diaryPass")) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("diaryBox").style.display = "flex";
    } else {
        alert("Wrong password");
    }
}

function autoGrow(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
}

function savePage() {
    let title = document.getElementById("pageName").value.trim();
    let text = document.getElementById("pageText").value;

    if (title === "") return;

    localStorage.setItem(
        "page_" + title.toLowerCase(),
        btoa(text)
    );

    document.getElementById("pageTitle").innerText = "📄 " + title;
}

function loadPage(title) {
    let data = localStorage.getItem("page_" + title.toLowerCase());
    if (!data) return;

    document.getElementById("pageName").value = title;
    document.getElementById("pageText").value = atob(data);
    document.getElementById("pageTitle").innerText = "📄 " + title;
}

function searchPage() {
    let q = document.getElementById("search").value.toLowerCase();

    for (let key in localStorage) {
        if (key.startsWith("page_") && key.includes(q)) {
            let title = key.replace("page_", "");
            loadPage(title);
            break;
        }
    }
}
