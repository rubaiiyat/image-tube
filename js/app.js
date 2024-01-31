const allBtn = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const musicBtn = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => console(data.data));
};

const displayData = (data) => {
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
        <p>${author.profile_name}</p>
        
        ${
          author.verified ? `<p><i class="bi bi-patch-check-fill"></i></p>` : ``
        }
    </div>
    `
    )}
        
       
       <p>${dataList.others.views}</p>
      
    
    `;

    cardContainer.appendChild(newElement);
  });
};

allBtn();
