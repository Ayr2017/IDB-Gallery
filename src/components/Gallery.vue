<template>
  <div v-if="!remoteState" id="gallery">
    <div class="gallery">
      <div class="gallery__row"></div>
      <!-- <div class="gallery__row2">
      <img class="pi" src="http://co13.nevseoboi.com.ua/177/17683/1414364619-5500553-aviasiya-www.nevseoboi.com.ua.jpg">
      <img class="pi" src="http://alternathistory.com/files/users/user3136/FWW-01-04.jpg">
      <img class="pi" src="https://avatars.mds.yandex.net/get-pdb/236760/5df375b5-d471-4de6-bf77-e33f2e8fbf8d/s1200?webp=false">
      <div class="pi"></div>
      <div class="pi"></div>
      <div class="pi"></div>
      <div class="pi"></div>
      <div class="pi"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Picture from "./Picture.vue";
export default {
  name: "Gallery",
  components: { Picture },
  data: () => ({
    galleryHeight: "",
    galleryWidth: "",
  }),
  computed: {
    ...mapGetters(["remoteState", "allElements"]),
    pictureHeight() {
      let w = parseInt(this.galleryWidth / 5);
      return w;
    },
  },
  watch: {
    allElements(n, o) {
      var that = this;
      n.onsuccess = function () {
        that.renderImagesFromDB(n.result);
      };
    },
  },

  mounted() {
    this.galleryHeight = this.$el.scrollHeight;
    this.galleryWidth = this.$el.scrollWidth;
    console.dir(this.$el);
    window.addEventListener("resize", () => {
      this.galleryHeight = this.$el.scrollHeight;
      this.galleryWidth = this.$el.scrollWidth;
    });
    let els = this.getElementsAll({
      dbName: "gallery",
      dbVersion: "2",
      storeName: "imageStore",
    });
  },
  methods: {
    ...mapActions([
      "getDatabase",
      "deleteRecord",
      "getElement",
      "getElementsAll",
      "saveElement",
      "createFilename",
    ]),
    renderImagesFromDB(imagesArray) {
      console.log(imagesArray);
      var span;
      imagesArray.forEach((element) => {
        let img = element.img;
        let src = URL.createObjectURL(img);
        // span = document.createElement("span");
        img = document.createElement("img");
        img.title = img.name;
        img.src = src;
        img.classList.add("picture");

        // span.classList.add("picture__wrapper");
        // span.innerHTML = [
        //   '<img class="picture"  title="',
        //   escape(img.name),
        //   '" src="',
        //   src,
        //   '" />',
        // ].join("");
        document.querySelectorAll(".gallery__row")[0].insertBefore(img, null);
        // document.querySelectorAll(".gallery__row")[0].insertBefore(span, null);
        // document.getElementById("gallery").insertBefore(span, null);
      });
    },
  },
};
</script>
<style lang="scss" >
#gallery {
  background-color: rgb(234, 236, 238);
  display: flex;
  flex-direction: column;
  flex: 3 0 320px;
}
.gallery {
  display: flex;
  flex-direction: column;
  flex: 1 1 320px;
  width: 100%;
  &__row {
    display: flex;
    flex-wrap: wrap;
    .picture {
      height: 100px;
      object-fit: cover;
      margin:2px;
    }
  }
}
</style>