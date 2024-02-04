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

    const posteddate = parseInt(dataList.others.posted_date / 60);
    const hour = parseInt(posteddate / 60);
    const minute = posteddate - hour * 60;

    newElement.innerHTML = `
      <div class="image-container"><img class="main-img"  src="${
        dataList.thumbnail
      } " alt="" />
      <p class="posted_date">${
        dataList.others.posted_date ? `${hour} hours ${minute} minutes ago` : ""
      }</p></div>
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

const sortByViewsBtn = (categoryID) => {
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  )
    .then((res) => res.json())
    .then((data) => {
      const sortedView = data.data?.sort(
        (a1, a2) => parseFloat(a2.others.views) - parseFloat(a1.others.views)
      );

      const cardContainer = document.getElementById("card-container");
      cardContainer.innerHTML = "";
      displayData(sortedView);
    });
};
window.onload = () => {
  loadData(1000);
};
