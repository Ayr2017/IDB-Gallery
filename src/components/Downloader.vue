<template>
  <div class="downloader">
    <div
      id="drugndrop"
      class="drugndrop"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop="drop"
    >
      <h1 class="op5">DRAG AND DROP</h1>
      <h2 class="op5">or</h2>
      <h1 class="op5">UPLOAD</h1>
    </div>
    <div class="input-group">
      <div id="output" class="preview" >
        <span class="preview__wrapper">
          <img class="preview__img" src="empty.png" alt="empty" />
        </span>
      </div>
      <input id="file" class="file" type="file" @change="selectFile" />
      <label for="file" class="file-label">{{fileLabelText}}</label>
      <input
        v-if="fileType=='img'"
        :class="['btn', !isEmpty ? 'btn_disabled' :'']"
        type="submit"
        value="SAVE IMAGE"
        @click="saveObject"
        :disabled="!isEmpty"
      />
      <input
        v-if="fileType=='json'"
        :class="['btn', 'btn_success']"
        type="submit"
        value="TO GALLERY"
        @click="toGallery"
      />
      <input class="btn" type="submit" value="Моковая" @click="createFilename" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Downloader",

  data: () => ({
    fileLabelText: "Выберите файл",
    uploadedFile: null,
    fileType: null,
  }),
  computed: {
    ...mapGetters(["jsonFile","remoteState"]),
    isEmpty: {
      get() {
        if (this.uploadedFile) return true;
        else return false;
      },
    },
  },
  watch: {
    uploadedFile(n, o) {
      console.log(n,o)
      if (n && !(n.size === o?.size && n.lastModified === o?.lastModified))
        this.shFile();
    },
  },

  mounted() {
    console.log("Downloader mounted");
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
    ...mapMutations([
      "remoteImagesTrue",
      "remoteImagesFalse",
      "fillJson",
      "clearJson",
    ]),
    saveObject() {
      this.saveElement({
        dbName: "gallery",
        dbVersion: "2",
        storeName: "imageStore",
        element: {
          id: this.uploadedFile.uid,
          created: new Date(),
          img: this.uploadedFile,
        },
      });
    },
    selectFile(e) {
      this.uploadedFile = e.target.files[0];
    },
    async shFile() {
      let file = this.uploadedFile;
      let type = file.type.split("/")[0];
      let ext = file.type.split("/")[1];
      if (type === "image") {
        var reader = new FileReader();
        reader.onload = (function (theFile) {
          return function (e) {
            // Render thumbnail.
            let span = document.createElement("span");
            span.innerHTML = [
              '<img class="thumb"  title="',
              escape(theFile.name),
              '" src="',
              e.target.result,
              '" />',
            ].join("");
            let node = document.getElementById("output").firstChild;
            document.getElementById("output").insertBefore(span, null);
            node.parentNode.removeChild(node);
          };
        })(file);
        reader.readAsDataURL(file);
        file.uid = await this.createFilename();
        this.fileType = "img";
        this.remoteImagesFalse();
      } else if (type === "application" && ext === "json") {
        this.fileType = "json";
        let h2 = document.createElement("H2");
        h2.innerHTML = "JSON";
        let node = document.getElementById("output").firstChild;
        document.getElementById("output").insertBefore(h2, null);
        node.parentNode.removeChild(node);
        this.remoteImagesTrue();
        // read json file
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          this.$store.commit("fillJson", reader.result);
        };
        reader.onerror = function () {
          console.log("Error. Can not ot read json-file.");
        };
      } else {
        this.fileType = null;
        console.log("Exeption: file type is not img or text/json");
      }
    },
    dragOver(e) {
      e.target.style.backgroundColor = "rgba(170, 170, 170, 0.281)";
      e.stopPropagation();
      e.preventDefault();
    },
    dragLeave(e) {
      e.target.style.backgroundColor = "";
      e.stopPropagation();
      e.preventDefault();
    },
    drop(e) {
      e.stopPropagation();
      e.preventDefault();
      let dt = e.dataTransfer;
      this.uploadedFile = dt.files[0];
      e.target.style.backgroundColor = "";
    },
    toGallery() {
      console.log("to gallery");
      this.clearJson();
      this.remoteImagesFalse();
      this.fileType = null;
       
      this.uploadedFile = new File([""], "filename.txt", {webkitRelativePath:'empty.png' ,type: "image/jpg", lastModified: new Date()})
      console.log(this.uploadedFile)
      this.getElementsAll({
      dbName: "gallery",
      dbVersion: "2",
      storeName: "imageStore",
    });
    },
  },
};
</script>

<style lang="scss" >
.downloader {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(84, 97, 84);
  flex: 1 1 320px;
  justify-content: space-evenly;
  .drugndrop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed #d3d3d3ab;
    box-sizing: border-box;
    &:hover {
      background-color: #aaaaaa48;
    }
  }
}


.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.file-label {
  cursor: pointer;
}

.preview {
  display:flex;
  margin: 5px;
  &__img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
.thumb {
  object-fit: cover;
  max-width:120px;
  height: 100px;
}
</style>