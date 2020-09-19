<template>
  <div v-if="remoteState" class="remote-gallery">
    <h2 class="remote-gallery__title">Выберите изображения в коллекцию</h2>
    <div v-show="!isEmptySelectedSet" class="remote-gallery__actions">
      <button class="btn" @click="saveImages">Сохранить выбранное</button>
    </div>
    <div class="remote-gallery__images">
      <Picture
        v-for="(item, index) in remoteImagesList"
        :key="index"
        :src="item.url"
        :height="100"
        @click.native="selectImage"
      />
    </div>
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
      if (!n?.length) return;
      this.remoteImagesList = JSON.parse(n).galleryImages;
    },
  },
  mounted() {
    console.log("Remoteimages mounted");
    this.getDatabase({
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
    downloadRemoteImages() {},
    selectImage(e) {
      let element = e.target;
      if (element.tagName !== "IMG") return;
      element.classList.toggle("picture__content_selected");
      if (element.classList.contains("picture__content_selected")) {
        this.selectedImagesSet.add(element);
      } else {
        this.selectedImagesSet.delete(element);
      }
      if (this.selectedImagesSet.size > 0) this.isEmptySelectedSet = false;
      else this.isEmptySelectedSet = true;

      console.dir(this.selectedImagesSet);
    },
    saveImages() {
      // console.log('yuy');
      var that = this;
      this.selectedImagesSet.forEach(async function (element) {
        let response = await fetch(element.src);
        if (response.ok) {
          let image = await response.blob();
          let type = image.type.split("/")[0];
          if (type === "image") {
            let ext = image.type.split("/")[1];
            let filename = await that.createFilename();
            image = await new File([image], `${filename}.${ext}`);
            image.uid = filename;
            console.log(image);
            that.saveObject(image);
          }
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      });
    },
    saveObject(image) {
      this.saveElement({
        dbName: "gallery",
        dbVersion: "2",
        storeName: "imageStore",
        element: {
          id: image.uid,
          created: new Date(),
          img: image,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.remote-gallery {
  display: flex;
  flex-direction: column;
  flex: 3 0 320px;
  &__title {
    text-align: center;
    color: #334;
  }
  &__actions {
    padding: 5px;
  }
  &__images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

</style>