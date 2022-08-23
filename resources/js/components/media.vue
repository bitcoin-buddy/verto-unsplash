<template>
<img :src="this.url" class="rounded mx-auto d-block m-2">
    
</template>

<script>

var mode = 0;
var photos = [];
var title = "";

export default {
    name: "MediaView",
    data(){
        return {url:this.$route.params.url}
    }
};

</script>
