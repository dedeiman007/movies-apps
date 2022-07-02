<template>
  <div class="topnav" id="myTopnav">
    <div class="container">
      <div class="d-flex">
        <div style="width: 100%">
          <router-link :to="{name: 'Home'}" :class="{'': true, 'active': this.$route.name == 'Home'}">
            Home
          </router-link>
          <router-link :to="{name: 'MyList'}" :class="{'': true, 'active': this.$route.name == 'MyList'}">
            My List
          </router-link>
        </div>
        <div class="ml-auto">
          <a href="javascript:void(0);" class="icon" @click="searchClick()">
            <i class="fa fa-bars"></i>
          </a>
        </div>
      </div>
      <a href="javascript:void(0)" class="search-position">
        <form @submit.prevent="search()" class="d-flex w-search">
          <input type="text" class="form-control search" placeholder="Search movie or Tv Shows" v-model="query">
          <button class="btn" type="submit">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9121 10.9976L9.07474 8.16023C9.0044 8.11334 8.93405 8.06644 8.8637 8.06644H8.55887C9.28578 7.22228 9.75476 6.09673 9.75476 4.87738C9.75476 2.2042 7.55056 0 4.87738 0C2.18075 0 0 2.2042 0 4.87738C0 7.57401 2.18075 9.75476 4.87738 9.75476C6.09673 9.75476 7.19883 9.30923 8.06644 8.58232V8.88715C8.06644 8.9575 8.08989 9.02785 8.13679 9.09819L10.9741 11.9355C11.0914 12.0528 11.2789 12.0528 11.3727 11.9355L11.9121 11.3962C12.0293 11.3024 12.0293 11.1148 11.9121 10.9976ZM4.87738 8.62921C2.79043 8.62921 1.12555 6.96434 1.12555 4.87738C1.12555 2.81387 2.79043 1.12555 4.87738 1.12555C6.94089 1.12555 8.62921 2.81387 8.62921 4.87738C8.62921 6.96434 6.94089 8.62921 4.87738 8.62921Z" fill="white"/>
            </svg>
          </button>
        </form>
      </a>
    </div>
  </div>
    <!-- <div class="navbar">
      <div class="container">
        <div class="navbar-inner m-no-flex">
          <router-link :to="{name: 'Home'}" :class="{'navbar-link': true, 'active': this.$route.name == 'Home'}">
            Home
          </router-link>
          <router-link :to="{name: 'MyList'}" :class="{'navbar-link': true, 'active': this.$route.name == 'MyList'}">
            My List
          </router-link>
          <div class="ms-auto m-mt-1">
            <form @submit.prevent="search()" class="d-flex">
              <input type="text" class="form-control search" placeholder="Search movie or Tv Shows" v-model="query">
              <button class="btn" type="submit">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9121 10.9976L9.07474 8.16023C9.0044 8.11334 8.93405 8.06644 8.8637 8.06644H8.55887C9.28578 7.22228 9.75476 6.09673 9.75476 4.87738C9.75476 2.2042 7.55056 0 4.87738 0C2.18075 0 0 2.2042 0 4.87738C0 7.57401 2.18075 9.75476 4.87738 9.75476C6.09673 9.75476 7.19883 9.30923 8.06644 8.58232V8.88715C8.06644 8.9575 8.08989 9.02785 8.13679 9.09819L10.9741 11.9355C11.0914 12.0528 11.2789 12.0528 11.3727 11.9355L11.9121 11.3962C12.0293 11.3024 12.0293 11.1148 11.9121 10.9976ZM4.87738 8.62921C2.79043 8.62921 1.12555 6.96434 1.12555 4.87738C1.12555 2.81387 2.79043 1.12555 4.87738 1.12555C6.94089 1.12555 8.62921 2.81387 8.62921 4.87738C8.62921 6.96434 6.94089 8.62921 4.87738 8.62921Z" fill="white"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    searchClick(){
      var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    },
    search(){
        if(this.$route.name == 'Search') {
          this.$router.replace(
            { 
              name: 'Search', 
              query: { 
                'search': this.query
              }
            }
          )
        }else{
          this.$router.push({
              name: 'Search',
              query: {
                'search': this.query
              }
          })
        }
    },
  }
}
</script>

<style scoped>
  .search-position{
    position: absolute;
    right: 0;
    z-index: 12;
    top: -7px;
  }
  .topnav {
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 12;
    width: 100%;
  }

  .topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 20px 20px;
    text-decoration: none;
    font-size: 15px;
  }

  .topnav a.active {
    /* background-color: #000; */
    border-bottom: 2px solid #fff;
  }

  .topnav .icon {
    display: none;
  }
  .w-search{
    width: 350px;
  }

@media screen and (max-width: 600px) {
  .topnav{
    padding: 11px 0px;
    position: relative;
  }
  .topnav a{
    padding: 11px 0px;
  }
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
  .search-position{
    position: unset;
    right: 0;
    z-index: unset;
    top: 0;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
  .topnav a.active {
    border-bottom: unset;
  }
}
</style>