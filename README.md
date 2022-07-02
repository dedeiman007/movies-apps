# movies-app

## Project setup
- Create Account at [The Movie DB](https://www.themoviedb.org/signup).
- Go to profile and [Generate API](https://www.themoviedb.org/settings/api).
- Replace the key at src/api/Api.js.


const Api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
      api_key: `{YOUR THE MOVIE DB KEY}`
    }    
})


  
npm install


### Compiles and hot-reloads for development

npm run serve


### Compiles and minifies for production

npm run build


### Lints and fixes files

npm run lint


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).