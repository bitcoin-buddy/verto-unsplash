<template>

  <div class="d-flex flex-column">
    <div class="d-flex justify-content-center mt-5"><h1>User Library</h1></div>
    <router-link class="nav-link" to="/">
            <button class="btn btn-outline-info my-2 my-sm-0">
                    Go to search
                </button>
                </router-link>
    </div>

  <div class="container">
    <div class="row" id="cardcontainer">


      <div v-for="data in posts" :key="data.id">
        <div class="modal fade" :id="'exampleModal'+data.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit preview</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="img-fluid" :src="data.url" alt="Preview">
                <input class="form-control form-control-sm my-2" :id="'input' + data.id" type="text"
                  placeholder="Edit Title" :value="data.title">
                <textarea class="form-control form-control-sm my-2" name="" :id="'textarea' + data.id" cols="30"
                  rows="10" placeholder="Edit Description" :value="data.description"></textarea>
              </div>
              <div class="modal-footer">
                <button type="submit" :id="'sv' + data.id" class="btn btn-primary float-right mx -2 my-2"
                  @click="updateData(data.id)" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 my-3">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="data.url" alt="Card image cap">

            <div class="card-body">
              <h5 class="card-title" :id="'title' + data.id">{{ data.title }}</h5>

              <p class="card-text" :id="'desc' + data.id">{{ data.description }}</p>
              
              <button type="button" :id="'sb' + data.id" class="btn btn-primary float-right mx-2 my-2" data-toggle="modal" :data-target="'#exampleModal'+data.id">Edit</button>
              <button type="button" class="btn btn-primary float-right my-2 mx-2" @click="mediaPage(data.url)">Preview</button>

            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import router from "@/roter";

export default {
  
  name: "LibraryView",
  data() {
    return {
      posts: '',
      idx: 0,
    }
  },
  mounted: function () {
    this.posts = window.sessionStorage.getItem('p')
    console.log(this.posts)
    var s = "[" + this.posts + "]";
    this.posts = JSON.parse(s);
    console.log(this.posts[0])
  },
  methods: {
    mediaPage(url){
            router.push({
            name: "MediaView",
            params: { url: url },
    });
    },
    updateData(id) {

      var newtitle = document.getElementById('input' + id).value;
      var newdescp = document.getElementById('textarea' + id).value;

      var temp = window.sessionStorage.getItem('p');
      var s = "[" + temp + "]"
      temp = JSON.parse(s)
      console.log(temp)
      temp[id].title = newtitle;
      temp[id].description = newdescp;

      temp = JSON.stringify(temp);
      temp = temp.slice(1, -1);
      console.log(temp)
      window.sessionStorage.setItem('p', temp)

      document.getElementById("title" + id).textContent = newtitle;
      document.getElementById("desc" + id).textContent = newdescp;
    }

  }
}



</script>