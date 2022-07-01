const profileInfo = document.querySelector(".overview");
/*** profile info will appear here ***/
const username = "antodis79";
const repoList = document.querySelector(".repo-list");



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
  getRepo();
};

const getRepo = async function () {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await res.json();
  displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};