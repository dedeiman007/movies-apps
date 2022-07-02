<template>
  <div class="page-space">
    <div class="container">
      <h4 class="section-title" v-if="my_list.length > 0">
        My List
      </h4>
      <div class="movies" v-if="is_my_list_ready">
        <template v-if="my_list.length > 0">
          <template v-for="movie in my_list">
            <template v-if="movie.title">
              <MovieCard class="movie-card" :movie="movie" :image-configuration="image_configuration"  :key="'mylist' + movie.id" @removeFromList="removeFromList"/>
            </template>
            <template v-else>
              <TvShowCard class="movie-card" :show="movie" :image-configuration="image_configuration"  :key="'mylist' + movie.id"  @removeFromList="removeFromList"/>
            </template>
          </template>
        </template>
        <template v-else>
          <h3 class="my-5 text-secondary text-center">
            Your List is Empty
          </h3>
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
  name: 'Home',
  data() {
    return{
      image_configuration: null,
      my_list: [],
      is_my_list_ready: false,
      key: 'my-movie-list'
    }
  },
  created() {
    this.getConfiguration()
  },
  methods: {
    getMyList() {
      var raw_list = localStorage.getItem(this.key)
      if(raw_list) {
        var list = JSON.parse(raw_list)
        this.my_list = list
        this.is_my_list_ready = true
      }else{
        this.is_my_list_ready = true
      }
    },
    getConfiguration() {
      Api.get(`/configuration`)
          .then((res) => {
              var data = res.data.images
              this.image_configuration = data
              this.getMyList()
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
    },
    removeFromList(movie) {
      var added_list = this.my_list
      if(added_list.length == 1){
          localStorage.removeItem(this.key)
          this.my_list = []
      }else{
          var index = added_list.findIndex((item)=>{
              return item.id == movie.id
          })
          added_list.splice(index, 1)
      }

    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 720px) {
  .page-space{
    padding-top: 20px;
  }
}
</style>