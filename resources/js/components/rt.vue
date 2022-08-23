<template>
    <div class="d-flex flex-column">
    <div class="d-flex justify-content-center mt-5"><h1>Search for Images</h1></div>
    <div class="d-flex justify-content-center mt-5">
    <form class="form-inline my-2 my-lg-0" @submit.prevent="search">
                <input id="searchterm" class="form-control mr-sm-2" type="search" placeholder="Search"
                    aria-label="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" @click="search">
                    Search
                </button>
            </form>
            <router-link class="nav-link" to="/library">
            <button class="btn btn-outline-info my-2 my-sm-0">
                    User Library
                </button>
                </router-link>
    </div>
    </div>
    

    <div class="container">
        <div class="row" id="cardcontainer">
            <div class="card col-md-4 my-3" style="width: 18rem" v-for="data in rst">
                <img class="card-img-top" :src="data.urls.thumb" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">{{ data.alt_description }}</h5>
                    <p class="card-text">
                        {{ data.description }}
                    </p>

                    <button type="submit" class="btn btn-primary float-right my-2 mx-2" @click="
                        addData(data.urls.regular, data.alt_description, data.description)
                    ">
                        Add
                    </button>
                    <button type="button" class="btn btn-primary float-right my-2 mx-2"
                        @click="mediaPage(data.urls.regular)">Preview</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/roter";
var mode = 0;
var photos = [];
var title = "";


export default {

    name: "App",
    data() {
        return {
            photo: [],
            json: [],
            accessKey: "MQTSzBkXjG9biUave6AEqFAWO1RKhxjKBH-_s_oDEZQ",
            url: "https://api.unsplash.com/search/photos",
            res: "",
            searchterm: "tree",
            rst: [],
        };
    },
    //https://api.unsplash.com/search/photos?query=tree&client_id=MQTSzBkXjG9biUave6AEqFAWO1RKhxjKBH-_s_oDEZQ&per_page=2


    methods: {
        mediaPage(url) {
            router.push({
                name: "MediaView",
                params: { url: url },
            });
        },
        addData(url, titl, desc) {
            
            var j = window.sessionStorage.getItem('p')
            if (j && this.json.length == 0) {
                var s = "[" + j + "]";
                s = JSON.parse(s);

                s.forEach(i => {
                    var ndata =
                        '{ "url":"' +
                        i.url +
                        '" , "title":"' +
                        i.title +
                        '", "description":"' +
                        i.description +
                        '", "id":"' + this.json.length + '" }';

                    this.json.push(ndata)
                });
                console.log(this.json)
            }
            var data =
                '{ "url":"' +
                url +
                '" , "title":"' +
                titl +
                '", "description":"' +
                desc +
                '", "id":"' + this.json.length + '" }';

            console.log(data)

            this.json.push(data);
            //   console.log(this.json)
            window.sessionStorage.setItem('p', this.json)
        },

        search: function () {
            fetch(
                "https://api.unsplash.com/search/photos?query=" +
                document.getElementById("searchterm").value +
                "&client_id=MQTSzBkXjG9biUave6AEqFAWO1RKhxjKBH-_s_oDEZQ&per_page=40"
            )
                .then((response) => {
                    return response.json();
                })
                .then((parsedJson) => {
                    console.log(parsedJson.results);
                    this.rst = parsedJson.results;
                });
        },
    },
};


//https://api.unsplash.com/search/photos?query=tree&client_id=MQTSzBkXjG9biUave6AEqFAWO1RKhxjKBH-_s_oDEZQ&per_page=2
</script>
