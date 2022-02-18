const ENV = process.env.NODE_ENV || "development";
const { config } = require("../config/env/" + ENV);
const githubAdapter = require("../adapters/github-adapter");
const { exec } = require("child_process");

const getRepos = async () => {
  const repos = await githubAdapter.getRepos(
    config.gitHubUrl,
    config.gitHubPAT
  );
  let reposUrl = [];
  repos.items.forEach((repo) => {
    reposUrl.push(`${repo.clone_url}`);
  });
  await cloneRepos(reposUrl);
};

const cloneRepos = async (repos) => {
  console.log(`Repo's to clone => ${repos.length} \n`);
  repos.forEach((repo) => {
    const command = `cd ${config.destinationUrlClone} && git clone ${repo}`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout => ${stdout}`);
      console.log(`stderr => ${stderr}`);
    });
  });
};

module.exports = { getRepos };
