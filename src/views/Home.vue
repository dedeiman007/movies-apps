<template>
  <div class="home">
    <div class="container">
      <div class="highlighted-movie" v-if="is_popular_movies_ready" :style="{'background-image': 'url(' + generateImageUrl(highlighted_movie.backdrop_path, true) + ')'}">
        <div class="highlighted-movie-content">
          <div class="highlighted-movie-title">
            {{ highlighted_movie.title }}
          </div>
          <div class="highlighted-movie-overview">
            {{ highlighted_movie.overview }}
          </div>
        </div>
        <div class="movie-rating">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5109 4.70272L10.5202 4.12872L8.71625 0.4934C8.41559 -0.135265 7.48625 -0.162598 7.15826 0.4934L5.38159 4.12872L1.36361 4.70272C0.65294 4.81205 0.379608 5.68672 0.89894 6.20605L3.76893 9.02137L3.0856 12.9847C2.97627 13.6954 3.7416 14.242 4.37026 13.914L7.95092 12.028L11.5042 13.914C12.1329 14.242 12.8982 13.6954 12.7889 12.9847L12.1056 9.02137L14.9756 6.20605C15.4949 5.68672 15.2216 4.81205 14.5109 4.70272Z" fill="#FAC766"/>
            </svg>
            {{ highlighted_movie.vote_average }}
        </div>
        
        <ButtonAddToList type="movie" :movie="highlighted_movie" />
      </div>
      <div v-else>
        <HighlightLoader  class="mb-5"/>
      </div>
      <h4 class="section-title">
        Popular Movies
      </h4>
      <div class="movies" v-if="is_popular_movies_ready">
        <MovieCard class="movie-card" v-for="movie in popular_movies" :key="'popular_movies' + movie.id" :movie="movie" :image-configuration="image_configuration" />
      </div>
      <div v-else>
        <CardLoader />
      </div>
      <h4 class="section-title mt-5">
        Top Rated Movies
      </h4>
      <div class="movies" v-if="is_top_rated_movies_ready">
        <MovieCard class="movie-card" v-for="movie in top_rated_movies" :key="'rated_movies' + movie.id" :movie="movie" :image-configuration="image_configuration" />
      </div>
      <div v-else>
        <CardLoader />
      </div>
      <h4 class="section-title mt-5">
        Popular Tv Shows
      </h4>
      <div class="movies" v-if="is_popular_show_ready">
        <TvShowCard class="movie-card" v-for="show in popular_show" :key="'rated_show' + show.id" :show="show" :image-configuration="image_configuration" />
      </div>
      <div v-else>
        <CardLoader />
      </div>
      <h4 class="section-title mt-5">
        Top Rated Tv Shows
      </h4>
      <div class="movies" v-if="is_top_rated_show_ready">
        <TvShowCard class="movie-card" v-for="show in top_rated_show" :key="'rated_show' + show.id" :show="show" :image-configuration="image_configuration" />
      </div>
      <div v-else>
        <CardLoader />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api/Api';
import CardLoader from '../components/CardLoader.vue';
import HighlightLoader from '../components/HighlightLoader.vue';
import MovieCard from '../components/MovieCard.vue';
import TvShowCard from '../components/TvShowCard.vue';
import ButtonAddToList from '../components/ButtonAddToList.vue';

export default {
  components: {
    CardLoader,
    HighlightLoader,
    MovieCard,
    TvShowCard,
    ButtonAddToList,
  },
  name: 'Home',
  data() {
    return{
      image_configuration: null,
      popular_movies: [],
      top_rated_movies: [],
      popular_show: [],
      top_rated_show: [],
      is_popular_movies_ready: false,
      is_top_rated_movies_ready: false,
      is_popular_show_ready: false,
      is_top_rated_show_ready: false,
      highlighted_movie: null
    }
  },
  created() {
    this.getConfiguration()
  },
  methods: {
    getPopularMovie() {
      Api.get(`/movie/popular`)
          .then((res) => {
              var data = res.data.results
              this.popular_movies = data
              this.highlighted_movie = data[0]
              this.is_popular_movies_ready = true
          })
          .catch((err) => {
              this.is_popular_movies_ready = false
              console.log(err)
          })
    },
    getTopRatedMovie() {
      Api.get(`/movie/top_rated`)
          .then((res) => {
              var data = res.data.results
              this.top_rated_movies = data
              this.is_top_rated_movies_ready = true
          })
          .catch((err) => {
              this.is_top_rated_movies_ready = false
              console.log(err)
          })
    },
    getPopularTv() {
      Api.get(`/discover/tv`, {
              params: {
                sort_by: 'popularity.desc'
              }
          })
          .then((res) => {
              var data = res.data.results
              this.popular_show = data
              this.is_popular_show_ready = true
          })
          .catch((err) => {
              this.is_popular_show_ready = false
              console.log(err)
          })
    },
    getTopRatedTv() {
      Api.get(`/tv/top_rated`)
          .then((res) => {
              var data = res.data.results
              this.top_rated_show = data
              this.is_top_rated_show_ready = true
          })
          .catch((err) => {
              this.is_top_rated_show_ready = false
              console.log(err)
          })
    },
    getConfiguration() {
      Api.get(`/configuration`)
          .then((res) => {
              var data = res.data.images
              this.image_configuration = data
              this.getPopularMovie()
              this.getTopRatedMovie()
              this.getPopularTv()
              this.getTopRatedTv()
          })
          .catch((err) => {
              console.log(err)
          })
    },
    generateImageUrl(image, big) {
      var config = this.image_configuration
      if(big){
        return config.base_url + config.poster_sizes[5] + image
      }else{
        return config.base_url + config.poster_sizes[2] + image
      }
    }
  }
}
</script>
