<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

<template>
    <div class="d-flex">
        <content-loader
            :speed="2"
            primaryColor="#1A1A1A"
            secondaryColor="#413A3A"
        >
            <rect x="0" y="0" rx="8" ry="8" width="185" height="260" /> 
            <rect x="200    " y="0" rx="8" ry="8" width="185" height="260" /> 
        </content-loader>
        <content-loader
            :speed="2"
            primaryColor="#1A1A1A"
            secondaryColor="#413A3A"
        >
            <rect x="0" y="0" rx="8" ry="8" width="185" height="260" />
            <rect x="200" y="0" rx="8" ry="8" width="185" height="260" /> 
        </content-loader>
    </div>
</template>