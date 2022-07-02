<template>
  <div class="page-space">
    <div class="container">
      <h4 class="section-title">
        Result for '{{ this.query }}'
      </h4>
      <div class="movies" v-if="is_searched_movies_ready">
        <template  v-for="movie in searched_movies" >
          <template v-if="movie.title">
            <MovieCard class="movie-card" :movie="movie" :image-configuration="image_configuration"  :key="'searched' + movie.id"/>
          </template>
          <template v-else>
            <TvShowCard class="movie-card" :show="movie" :image-configuration="image_configuration"  :key="'searched' + movie.id"/>
          </template>
        </template>
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
import MovieCard from '../components/MovieCard.vue';
import TvShowCard from '../components/TvShowCard.vue';

export default {
  components: {
    CardLoader,
    MovieCard,
    TvShowCard,
  },
  name: 'Search',
  data() {
    return{
      image_configuration: null,
      searched_movies: [],
      is_searched_movies_ready: false,
      query: ''
    }
  },
  watch: {
      '$route.query': function () {
          if(Object.keys(this.$route.query).length > 0) {
              this.query = this.$route.query.search
              this.searchMovie()
          }
      },
  },
  created() {
    this.getConfiguration()
  },
  methods: {
    searchMovie() {
        Api.get(`/search/multi`, {
          params: {
            query: this.query
          }
        })
          .then((res) => {
              var data = res.data.results
              this.searched_movies = data
              this.is_searched_movies_ready = true
          })
          .catch((err) => {
              this.is_searched_movies_ready = false
              console.log(err)
          })
    },
    getConfiguration() {
      Api.get(`/configuration`)
          .then((res) => {
              var data = res.data.images
              this.image_configuration = data
              this.query = this.$route.query.search
              this.searchMovie()
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
