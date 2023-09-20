const API_URL = "https://api.github.com/users/";
const profiles = document.querySelector('.profiles');


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchPoint = document.querySelector('#searchBar').value;

    getUser(searchPoint)

    document.querySelector('#searchBar').value = "";

})


async function getUser(username){
    
    try{
        const res = await fetch(API_URL + username);
        const data = await res.json();

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        await createUserCard(data)
        await getRepos(username)
    } catch(err){

        profiles.innerHTML = `
            <div class = "error">
                <h1>No profile with this username</h1>
            </div>
        `;
        
        document.querySelector('#searchBar').value = "";
    }
    
}

async function createUserCard(user){
    profiles.innerHTML = `
        <div class = "profile">
            <div class = "image-profile"><img src = "${user.avatar_url}"></div>
            <div class = "info">
                <h2>${user.login}</h2>
                <p class = "text">${user.bio}</p>
                <div class = "followers">
                    <div class = "info-followers">
                        <p class = "number">${user.followers}</p>
                        <p>Followers</p>
                    </div>
                    <div class = "info-followers">
                        <p class = "number">${user.following}</p>
                        <p>Following</p>
                    </div>
                    <div class = "info-followers">
                        <p class = "number">${user.public_repos}</p>
                        <p>Repos</p>
                    </div>
                </div>
                <p class = "label">Repositories:</p>
                <div class = "repos"></div>
            </div>
        </div>
    `;
}

async function getRepos(username){
    try{
        const res = await fetch(API_URL + username + '/repos?sort=created');
        const data = await res.json();

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

    createRepo(data)        

    } catch(err){
        console.log(err)
    }
}

function createRepo(repos){
    let reposDiv = document.querySelector('.repos');

    repos
        .slice(0, 10)
        .forEach(repo => {
            let repoEl = document.createElement('a');

            repoEl.classList.add('repo');
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;
            repoEl.href = repo.html_url;

            reposDiv.append(repoEl)
        }) 
}