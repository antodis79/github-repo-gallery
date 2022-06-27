const profileInfo = document.querySelector(".overview");
/*** profile info will appear here ***/
const username = "antodis79";

const getUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    displayUserInfo(data);
};
getUserInfo();


const displayUserInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  profileInfo.append(newDiv);
};