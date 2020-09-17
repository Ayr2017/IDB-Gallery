<template>
  <div v-if="remoteState" id="remoteimages">
    <span v-if="remoteImagesList">
      <h2 style="text-align:center; color:#334">Выберите изображения в коллекцию</h2>
      <div v-show="!isEmptySelectedSet"><button class="btn" @click="saveImages">Сохранить выбранное </button></div>
      <Picture
        v-for="(item, index) in remoteImagesList"
        :key="index"
        :src="item.url"
        @click.native="selectImage"
      />
    </span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Picture from "./Picture.vue";
export default {
  name: "remoteimages",
  components: {
    Picture,
  },
  data: () => ({
    remoteImagesList: null,
    selectedImagesSet: new Set(),
    isEmptySelectedSet: true,
  }),
  computed: {
    ...mapGetters(["remoteState", "jsonFile"]),
    
  },
  watch: {
    jsonFile(n, o) {
      if (!n.length) return;
      this.remoteImagesList = JSON.parse(n).galleryImages;
    },
  },
  methods: {
    downloadRemoteImages() {},
    selectImage(e) {
      let element = e.target;
      if(element.tagName !== "IMG") return;
      element.classList.toggle("picture__content_selected");
      if(element.classList.contains("picture__content_selected")){
          this.selectedImagesSet.add(element);
      } else{
          this.selectedImagesSet.delete(element);
      }
      if(this.selectedImagesSet.size > 0) this.isEmptySelectedSet = false;
      else this.isEmptySelectedSet = true;

      console.dir(this.selectedImagesSet);
    },
    saveImages(){
        console.log('yuy');
    }
  },
};
</script>

<style lang="scss">
#remoteimages {
  display: flex;
  flex-direction: "row";
  flex: 3 0 320px;
  width: 100%;
  border: 1px solid lightslategrey;
}
// .picture {
//   display: inline-flex;

//   &__content {
//     display: flex;
//     margin: 5px;
//     object-fit: cover;
//     height: 100px;
//     &__selected {
//       // border:2px solid rgba(188, 80, 238, 0.404);
//       border: 2px solid red;
//     }
//   }
// }
</style>