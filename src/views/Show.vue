<template>
  <div class="home">
    <div class="container">
      <div class="highlighted-movie show" v-if="is_movie_ready"
        :style="{'background-image': 'url(' + generateImageUrl(movie.backdrop_path, true) + ')'}">
        <div class="highlighted-movie-content">
          <div class="highlighted-movie-title">
            {{ this.isTvShow || this.$route.query.is_tv_show ? movie.name : movie.title  }}
          </div>
          <div class="highlighted-movie-overview">
            {{ movie.overview }}
          </div>
          <div class="mt-3">
            <small>
              Yor Rate
            </small>
            <a href="javascript:void(0)" style="margin-left: 5px" @click="deleteRate()" v-if="value != null">
                <i class="fa fa-times-circle text-red"></i>
              </a>
          </div>
            <div class="rating">
              <input type="radio" v-model="value" id="10" name="rating" value="10.0" @change="sendRate()" />
              <label class="star" for="10" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="9" name="rating" value="9.0" @change="sendRate()" />
              <label class="star" for="9" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="8" name="rating" value="8.0" @change="sendRate()" />
              <label class="star" for="8" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="7" name="rating" value="7.0" @change="sendRate()" />
              <label class="star" for="7" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="6" name="rating" value="6.0" @change="sendRate()" />
              <label class="star" for="6" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="4" name="rating" value="4.0" @change="sendRate()" />
              <label class="star" for="4" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="5" name="rating" value="5.0" @change="sendRate()" />
              <label class="star" for="5" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="3" name="rating" value="3.0" @change="sendRate()" />
              <label class="star" for="3" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="2" name="rating" value="2.0" @change="sendRate()" />
              <label class="star" for="2" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="1" name="rating" value="1.0" @change="sendRate()" />
              <label class="star" for="1" aria-hidden="true"></label>
              <input type="radio" v-model="value" id="0" name="rating" value="0.5" @change="sendRate()" />
              <label class="star" for="0" aria-hidden="true"></label>
          </div>
        </div>
        <div class="movie-rating">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5109 4.70272L10.5202 4.12872L8.71625 0.4934C8.41559 -0.135265 7.48625 -0.162598 7.15826 0.4934L5.38159 4.12872L1.36361 4.70272C0.65294 4.81205 0.379608 5.68672 0.89894 6.20605L3.76893 9.02137L3.0856 12.9847C2.97627 13.6954 3.7416 14.242 4.37026 13.914L7.95092 12.028L11.5042 13.914C12.1329 14.242 12.8982 13.6954 12.7889 12.9847L12.1056 9.02137L14.9756 6.20605C15.4949 5.68672 15.2216 4.81205 14.5109 4.70272Z"
              fill="#FAC766" />
          </svg>
          {{ movie.vote_average }}
        </div>
        <div class="movie-sidebar-content d-none d-lg-block">
          <div class="movie-image" :style="{'background-image': 'url(' + generateImageUrl(movie.poster_path) + ')'}">
          </div>
          <div class="mt-4 ps-3">
            <div class="d-flex" v-if="this.isTvShow || this.$route.query.is_tv_show">
              <div class="me-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.875 0H1.125C0.492188 0 0 0.515625 0 1.125V10.875C0 11.5078 0.492188 12 1.125 12H10.875C11.4844 12 12 11.5078 12 10.875V1.125C12 0.515625 11.4844 0 10.875 0ZM10.875 10.875H1.125V6.5625H10.875V10.875ZM10.875 5.4375H1.125V1.125H10.875V5.4375ZM3.75 4.125H4.125C4.3125 4.125 4.5 3.96094 4.5 3.75V3.5625H7.5V3.75C7.5 3.96094 7.66406 4.125 7.875 4.125H8.25C8.4375 4.125 8.625 3.96094 8.625 3.75V3.1875C8.625 2.78906 8.27344 2.4375 7.875 2.4375H4.125C3.70312 2.4375 3.375 2.78906 3.375 3.1875V3.75C3.375 3.96094 3.53906 4.125 3.75 4.125ZM3.75 9.5625H4.125C4.3125 9.5625 4.5 9.39844 4.5 9.1875V9H7.5V9.1875C7.5 9.39844 7.66406 9.5625 7.875 9.5625H8.25C8.4375 9.5625 8.625 9.39844 8.625 9.1875V8.625C8.625 8.22656 8.27344 7.875 7.875 7.875H4.125C3.70312 7.875 3.375 8.22656 3.375 8.625V9.1875C3.375 9.39844 3.53906 9.5625 3.75 9.5625Z" fill="white"/>
                </svg>
              </div>
              <small>
                {{ movie.number_of_episodes }} episodes
                <br>
                {{ movie.number_of_seasons }} seasons
              </small>
            </div>
            <div class="d-flex align-items-center" v-else>
              <div class="me-2">
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.25 0.25C2.93548 0.25 0.25 2.93548 0.25 6.25C0.25 9.56452 2.93548 12.25 6.25 12.25C9.56452 12.25 12.25 9.56452 12.25 6.25C12.25 2.93548 9.56452 0.25 6.25 0.25ZM6.25 11.0887C3.56452 11.0887 1.41129 8.93548 1.41129 6.25C1.41129 3.58871 3.56452 1.41129 6.25 1.41129C8.91129 1.41129 11.0887 3.58871 11.0887 6.25C11.0887 8.93548 8.91129 11.0887 6.25 11.0887ZM7.72581 8.57258C7.87097 8.66935 8.04032 8.64516 8.1371 8.5L8.59677 7.89516C8.69355 7.75 8.66935 7.58064 8.52419 7.48387L6.92742 6.29839V2.8629C6.92742 2.71774 6.78226 2.57258 6.6371 2.57258H5.8629C5.69355 2.57258 5.57258 2.71774 5.57258 2.8629V6.85484C5.57258 6.92742 5.59677 7.02419 5.66935 7.07258L7.72581 8.57258Z"
                    fill="white" />
                </svg>
              </div>
              <small>
                {{ getTime(movie.runtime) }}
              </small>
            </div>
            <div class="d-flex align-items-center mt-3">
              <div class="me-2">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.7143 1.71429H9.42857V0.321429C9.42857 0.160714 9.26786 0 9.10714 0H8.03571C7.84821 0 7.71429 0.160714 7.71429 0.321429V1.71429H4.28571V0.321429C4.28571 0.160714 4.125 0 3.96429 0H2.89286C2.70536 0 2.57143 0.160714 2.57143 0.321429V1.71429H1.28571C0.5625 1.71429 0 2.30357 0 3V12.4286C0 13.1518 0.5625 13.7143 1.28571 13.7143H10.7143C11.4107 13.7143 12 13.1518 12 12.4286V3C12 2.30357 11.4107 1.71429 10.7143 1.71429ZM10.5536 12.4286H1.44643C1.33929 12.4286 1.28571 12.375 1.28571 12.2679V4.28571H10.7143V12.2679C10.7143 12.375 10.6339 12.4286 10.5536 12.4286Z"
                    fill="white" />
                </svg>
              </div>
              <small>
                {{ this.isTvShow || this.$route.query.is_tv_show ? date(movie.release_date, 'lll') : date(movie.first_air_date, 'lll') }}
              </small>
            </div>
          </div>
        </div>

        <ButtonAddToList type="movie" :movie="movie" />
      </div>
      <div v-else>
        <HighlightLoader class="mb-5" />
      </div>
      
      <div class="show-detail-content" v-if="is_movie_ready">
        <div>
          <div class="mt-4 pb-4 d-block d-lg-none ">
            <div class="d-flex" v-if="this.isTvShow || this.$route.query.is_tv_show">
              <div class="me-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.875 0H1.125C0.492188 0 0 0.515625 0 1.125V10.875C0 11.5078 0.492188 12 1.125 12H10.875C11.4844 12 12 11.5078 12 10.875V1.125C12 0.515625 11.4844 0 10.875 0ZM10.875 10.875H1.125V6.5625H10.875V10.875ZM10.875 5.4375H1.125V1.125H10.875V5.4375ZM3.75 4.125H4.125C4.3125 4.125 4.5 3.96094 4.5 3.75V3.5625H7.5V3.75C7.5 3.96094 7.66406 4.125 7.875 4.125H8.25C8.4375 4.125 8.625 3.96094 8.625 3.75V3.1875C8.625 2.78906 8.27344 2.4375 7.875 2.4375H4.125C3.70312 2.4375 3.375 2.78906 3.375 3.1875V3.75C3.375 3.96094 3.53906 4.125 3.75 4.125ZM3.75 9.5625H4.125C4.3125 9.5625 4.5 9.39844 4.5 9.1875V9H7.5V9.1875C7.5 9.39844 7.66406 9.5625 7.875 9.5625H8.25C8.4375 9.5625 8.625 9.39844 8.625 9.1875V8.625C8.625 8.22656 8.27344 7.875 7.875 7.875H4.125C3.70312 7.875 3.375 8.22656 3.375 8.625V9.1875C3.375 9.39844 3.53906 9.5625 3.75 9.5625Z" fill="white"/>
                </svg>
              </div>
              <small>
                {{ movie.number_of_episodes }} episodes
                {{ movie.number_of_seasons }} seasons
              </small>
            </div>
            <div class="d-flex align-items-center" v-else>
              <div class="me-2">
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.25 0.25C2.93548 0.25 0.25 2.93548 0.25 6.25C0.25 9.56452 2.93548 12.25 6.25 12.25C9.56452 12.25 12.25 9.56452 12.25 6.25C12.25 2.93548 9.56452 0.25 6.25 0.25ZM6.25 11.0887C3.56452 11.0887 1.41129 8.93548 1.41129 6.25C1.41129 3.58871 3.56452 1.41129 6.25 1.41129C8.91129 1.41129 11.0887 3.58871 11.0887 6.25C11.0887 8.93548 8.91129 11.0887 6.25 11.0887ZM7.72581 8.57258C7.87097 8.66935 8.04032 8.64516 8.1371 8.5L8.59677 7.89516C8.69355 7.75 8.66935 7.58064 8.52419 7.48387L6.92742 6.29839V2.8629C6.92742 2.71774 6.78226 2.57258 6.6371 2.57258H5.8629C5.69355 2.57258 5.57258 2.71774 5.57258 2.8629V6.85484C5.57258 6.92742 5.59677 7.02419 5.66935 7.07258L7.72581 8.57258Z"
                    fill="white" />
                </svg>
              </div>
              <small>
                {{ getTime(movie.runtime) }}
              </small>
            </div>
            <div class="d-flex align-items-center mt-3">
              <div class="me-2">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.7143 1.71429H9.42857V0.321429C9.42857 0.160714 9.26786 0 9.10714 0H8.03571C7.84821 0 7.71429 0.160714 7.71429 0.321429V1.71429H4.28571V0.321429C4.28571 0.160714 4.125 0 3.96429 0H2.89286C2.70536 0 2.57143 0.160714 2.57143 0.321429V1.71429H1.28571C0.5625 1.71429 0 2.30357 0 3V12.4286C0 13.1518 0.5625 13.7143 1.28571 13.7143H10.7143C11.4107 13.7143 12 13.1518 12 12.4286V3C12 2.30357 11.4107 1.71429 10.7143 1.71429ZM10.5536 12.4286H1.44643C1.33929 12.4286 1.28571 12.375 1.28571 12.2679V4.28571H10.7143V12.2679C10.7143 12.375 10.6339 12.4286 10.5536 12.4286Z"
                    fill="white" />
                </svg>
              </div>
              <small>
                {{ this.isTvShow || this.$route.query.is_tv_show ? date(movie.release_date, 'lll') : date(movie.first_air_date, 'lll') }}
              </small>
            </div>
          </div>

          <h5>
            Genres
          </h5>
          <span class="tag" v-for="genre in movie.genres" :key="'genre' + genre.id">
            {{ genre.name }}
          </span>
        </div>
        <div class="mt-5" v-if="is_credit_ready">
          <h5>
            Cast
          </h5>
          <div class="row cast-content" id="castContent">
            <div class="col-md-6 mb-3" v-for="cast in credit.cast" :key="'cast' + cast.id">
              <div class="d-flex align-items-center">
                <div class="cast-image" :style="{'background-image': 'url(' + generateImageUrl(cast.profile_path) + ')'}">
                </div>
                <div class="ms-3">
                  <div class="cast-character">
                    {{ cast.character }}
                  </div>
                  <small class="cast-name">
                    {{ cast.name }}
                  </small>
                </div>

              </div>
            </div>
          </div>
          <div class="mt-4" v-if="credit.cast.length > 6">
            <a href="javascript:void(0)" @click="showMoreCast()">
              <u>
                {{ cast_showed ? 'Show Less': 'Show More' }}
              </u>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../api/Api';
  import HighlightLoader from '../components/HighlightLoader.vue';
  import ButtonAddToList from '../components/ButtonAddToList.vue';

  export default {
    components: {
      HighlightLoader,
      ButtonAddToList,
    },
    props: {
      id: {
        type: [Number, String]
      },
      isTvShow: {
        type: Boolean
      }
    },
    name: 'Show',
    data() {
      return {
        image_configuration: null,
        movie: null,
        is_movie_ready: false,
        credit: null,
        is_credit_ready: false,
        cast_showed: false,
        value: null,
        key: '',
        guest_session_id: null,
      }
    },
    created() {
      this.getConfiguration()
      this.getMovieDetail()
      this.getMovieCast()
      this.getSession()
    },
    methods: {
      getSession(){
          var url = `/authentication/guest_session/new`
          if(localStorage.getItem('guest_session_id')){
            this.guest_session_id = localStorage.getItem('guest_session_id')
            var key = `${ this.id }-${ this.guest_session_id }`
            var rating = localStorage.getItem(key)
            if(rating) {
                this.value = rating
            }
            this.key = key
            
            return false
          }
          Api.get(url)
            .then((res) => {
              this.key  = key
              this.guest_session_id = res.data.guest_session_id
              localStorage.setItem('guest_session_id', this.guest_session_id)
            })
            .catch((err) => {
              console.log(err)
          })
      },
      sendRate() {
        var data = {value: parseFloat(this.value)}
        Api.post(`/movie/${this.id}/rating`,data, {params: {guest_session_id: this.guest_session_id} })
        .then(() => {
          var key = this.key
          localStorage.setItem(key, this.value)
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      deleteRate() {
        Api.delete(`/movie/${this.id}/rating`, {params: {guest_session_id: this.guest_session_id} })
        .then(() => {
          var key = this.key
          localStorage.removeItem(key)
          this.value = null
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      getMovieDetail() {
        var url = `/movie/${ this.id }`
        if(this.isTvShow || this.$route.query.is_tv_show ) {
          url = `/tv/${ this.id }`
        }
        Api.get(url)
          .then((res) => {
            var data = res.data
            this.movie = data
            this.is_movie_ready = true
          })
          .catch((err) => {
            this.is_movie_ready = false
            console.log(err)
          })
      },
      getMovieCast() {
        var url = `/movie/${ this.id }/credits`
        if(this.isTvShow || this.$route.query.is_tv_show) {
          url = `/tv/${ this.id }/credits`
        }
        Api.get(url)
          .then((res) => {
            var data = res.data
            this.credit = data
            this.is_credit_ready = true
          })
          .catch((err) => {
            this.is_credit_ready = false
            console.log(err)
          })
      },
      getConfiguration() {
        Api.get(`/configuration`)
          .then((res) => {
            var data = res.data.images
            this.image_configuration = data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      generateImageUrl(image, big) {
        var config = this.image_configuration
        if (big) {
          return config.base_url + config.poster_sizes[5] + image
        } else {
          return config.base_url + config.poster_sizes[2] + image
        }
      },
      getTime(time) {
        var hours = parseInt(time / 60)
        var minutes = parseInt(time % 60)
        return hours + ' hours ' + minutes + ' minutes'
      },
      showMoreCast() {
        var element = document.getElementById("castContent");
        if(this.cast_showed) {
          element.classList.remove("showed");
        }else{
          element.classList.add("showed");
        }
        this.cast_showed = !this.cast_showed
      }
    }
  }
</script>

<style scoped>
@media only screen and (max-width: 720px) {
  .highlighted-movie.show .highlighted-movie-content{
    left: 20px;
  }
  .highlighted-movie .movie-sidebar-content{
    /* display: none; */
  }
  .highlighted-movie{
    margin-bottom: 1rem;
    height: 420px;
  }
  .highlighted-movie::after{
    height: 420px;
  }
}
</style>