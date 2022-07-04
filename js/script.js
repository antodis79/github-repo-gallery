const profileInfo = document.querySelector(".overview");
/*** profile info will appear here ***/
const username = "antodis79";
const repoList = document.querySelector(".repo-list");
const reposContainer = document.querySelector(".repos");
const indivRepoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



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
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getSpecificInfo(repoName);
  }
});

const getSpecificInfo = async function (repoName) {
  const specificRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await specificRepo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displaySpecificInfo(repoInfo, languages);
};

const displaySpecificInfo = function (repoInfo, languages) {
  indivRepoData.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  indivRepoData.append(newDiv);
  indivRepoData.classList.remove("hide");
  reposContainer.classList.add("hide");
  backToRepo.classList.remove("hide");
};

backToRepo.addEventListener("click", function () {
  reposContainer.classList.remove("hide");
  indivRepoData.classList.add("hide");
  backToRepo.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const captureValue = e.target.value;
  //console.log(captureValue);
  const repos = document.querySelectorAll(".repo");
  const searchLowerCase = captureValue.toLowerCase();
  for (const repo of repos) {
    const lowerText = repo.innerText.toLowerCase();
    if (lowerText.includes(searchLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});