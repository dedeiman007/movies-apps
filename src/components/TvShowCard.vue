<template>
    <div class="movie-card">
        <div class="movie-image" :style="{'background-image': 'url(' + generateImageUrl(show.poster_path) + ')'}" @click="showDetail()">
            <div class="movie-rating">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5109 4.70272L10.5202 4.12872L8.71625 0.4934C8.41559 -0.135265 7.48625 -0.162598 7.15826 0.4934L5.38159 4.12872L1.36361 4.70272C0.65294 4.81205 0.379608 5.68672 0.89894 6.20605L3.76893 9.02137L3.0856 12.9847C2.97627 13.6954 3.7416 14.242 4.37026 13.914L7.95092 12.028L11.5042 13.914C12.1329 14.242 12.8982 13.6954 12.7889 12.9847L12.1056 9.02137L14.9756 6.20605C15.4949 5.68672 15.2216 4.81205 14.5109 4.70272Z" fill="#FAC766"/>
                </svg>
                {{ show.vote_average }}
            </div>
        </div>
        <div class="movie-action">
            <ButtonAddToList type="movie" :movie="show" :short="true" @removeFromList="removeFromList"/>
        </div>
        <div class="movie-detail" @click="showDetail()">
            <div class="movie-title">
                {{ show.name }}
            </div>
            <div class="movie-release-date">
                {{ date(show.first_air_date, 'll') }}
            </div>
        </div>
    </div>
</template>

<script>
import ButtonAddToList from './ButtonAddToList.vue';
export default {
    components: {
        ButtonAddToList,
    },
    props: {
        show: {
            type: Object
        },
        imageConfiguration: {
            type: Object
        },
    },
    data() {
        return {
            visible: true
        }
    },
    methods: {
        generateImageUrl(image) {
            var config = this.imageConfiguration
            return config.base_url + config.poster_sizes[2] + image
        },
        showDetail() {
            this.$router.push({
                name: 'Show',
                params: {
                    id: this.show.id,
                    isTvShow: true,
                },
                query: {
                    is_tv_show: true,
                }
            })
        },
        removeFromList() {
            if(this.$route.name == 'MyList') {
                this.$emit('removeFromList', this.show)
            }
        }
    }
}
</script>