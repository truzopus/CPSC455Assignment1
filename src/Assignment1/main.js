function navigate(bool) {
    const main = document.getElementById("main-page");
    const card = document.getElementById("card-page");
    if (bool) {
        main.style.display='block';
        card.style.display='none';
    } else {
        main.style.display='none';
        card.style.display='block';
    }
}