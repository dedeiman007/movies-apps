<template>
    <div>
        <button :class="{'btn add-to-list': true, 'short': short}" @click="toggleList()">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="is_added">
                <path d="M13.5938 0.625L5.375 8.84375L2.375 5.8125C2.21875 5.6875 1.96875 5.6875 1.84375 5.8125L0.9375 6.71875C0.8125 6.84375 0.8125 7.09375 0.9375 7.25L5.125 11.4062C5.28125 11.5625 5.5 11.5625 5.65625 11.4062L15.0312 2.03125C15.1562 1.90625 15.1562 1.65625 15.0312 1.5L14.125 0.625C14 0.46875 13.75 0.46875 13.5938 0.625Z" fill="white"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                <path d="M11.5 5H7V0.5C7 0.25 6.75 0 6.5 0H5.5C5.21875 0 5 0.25 5 0.5V5H0.5C0.21875 5 0 5.25 0 5.5V6.5C0 6.78125 0.21875 7 0.5 7H5V11.5C5 11.7812 5.21875 12 5.5 12H6.5C6.75 12 7 11.7812 7 11.5V7H11.5C11.75 7 12 6.78125 12 6.5V5.5C12 5.25 11.75 5 11.5 5Z" fill="white"/>
            </svg>
            <template v-if="!short">
                <div class="text" v-if="is_added">
                    Added To List
                </div>
                <div class="text" v-else>
                    Add To List
                </div>
            </template>
        </button>
        
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String
        },
        movie: {
            type: Object
        },
        short: {
            type: Boolean
        }
    },
    data() {
        return{
            is_added: false,
            key: 'my-movie-list'
        }
    },
    created() {
        var raw_list = localStorage.getItem(this.key)
        if(raw_list) {
            var list = JSON.parse(raw_list)
            list.forEach((item)=>{
                if(item.id == this.movie.id) {
                    this.is_added = true
                }
            })
        }
    },
    methods: {
        toggleList() {
            if(this.is_added) {
                var added_raw_list = localStorage.getItem(this.key)
                var added_list = JSON.parse(added_raw_list)
                if(added_list.length == 1){
                    localStorage.removeItem(this.key)
                }else{
                    var index = added_list.findIndex((item)=>{
                        return item.id == this.movie.id
                    })
                    added_list.splice(index, 1)
                    localStorage.setItem(this.key, JSON.stringify(added_list))
                }
                this.is_added = false
                this.$emit('removeFromList')
            }else{
                var raw_list = localStorage.getItem(this.key)
                if(raw_list) {
                    var list = JSON.parse(raw_list)
                    list.push(this.movie)
                    localStorage.setItem(this.key, JSON.stringify(list))
                }else{
                    var new_list = [this.movie]
                    localStorage.setItem(this.key, JSON.stringify(new_list))
                }
                this.is_added = true
            }
        }
    }
}
</script>