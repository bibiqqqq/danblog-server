const axios = require('axios')

async function getGithubRepo (fullname) {
  const url = `https://api.github.com/repos/bibiqqqq/${fullname}`
  const temp = await axios.get(url)
  return {
    name: temp.data.name,
    desc: temp.data.description,
    stars: temp.data.stargazers_count,
    url: temp.data.html_url
  }
}
module.exports = {
  getGithubRepo
}