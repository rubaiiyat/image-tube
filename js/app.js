document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category button");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      buttons.forEach((btn) => btn.classList.remove("visited"));

      btn.classList.add("visited");
    });

    if (index === 0) {
      btn.classList.add("visited");
    }
  });
});

const loadData = (categoryID) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayData = (data) => {
  if (data.length == 0) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const newElement = document.createElement("div");
    newElement.classList.add("drawingIcon");
    newElement.innerHTML = `
      <img src="Icon.png" alt="" />
      <h1>Oops!! Sorry, There is no content here</h1>
  `;
    cardContainer.appendChild(newElement);
  }
  const cardContainer = document.getElementById("card-container");
  data.forEach((dataList) => {
    const newElement = document.createElement("div");
    newElement.classList.add("card-box");
    newElement.innerHTML = `
      <img class="main-img" src="${dataList.thumbnail}" alt="" />
      ${dataList.authors.map(
        (author) => `
      <div class="profile-title">
          <img src="${author.profile_picture}" alt="" />
          <h4>${dataList.title}</h4>
      </div>
      <div class="verified-profile">
          <p class="profile-name">${author.profile_name}</p>
          
          ${
            author.verified
              ? `<p><i class="bi bi-patch-check-fill"></i></p>`
              : ``
          }
      </div>
      `
      )}
         
      <p class="profile-name">${dataList.others.views}</p>
      `;

    cardContainer.appendChild(newElement);
  });
};
window.onload = () => {
  loadData(1000);
};
