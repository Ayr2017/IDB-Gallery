<template>
  <div id="downloader">
    <div id="drugndrop" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop="drop">
      <h1 class="transparent">DRAG AND DROP</h1>
      <h2 class="transparent">or</h2>
      <h1 class="transparent">UPLOAD</h1>
    </div>
    <div class="input-group">
      <div id="output" class="preview" style="width:100px; height:100px;">
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
        value="SAVE IMAGES"
        @click="saveDownloadedImages"
      />
      <input class="btn" type="submit" value="Отправить" @click="createFilename" />
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
    ...mapGetters(["jsonFile"]),
    isEmpty: {
      get() {
        if (this.uploadedFile) return true;
        else return false;
      },
    },
  },
  watch: {
    uploadedFile(n, o) {
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
    ...mapActions(["getDatabase", "deleteRecord", "getElement", "saveElement","createFilename"]),
    ...mapMutations(['remoteImagesTrue', 'remoteImagesFalse','fillJson','clearJson']),
    // createFilename() {
    //   let date = new Date().getTime();
    //   let num = Math.floor(Math.random() * 25);
    //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //   let filename = `img-${str[getRandomNumber()]}${str[getRandomNumber()]}${
    //     str[getRandomNumber()]
    //   }-${date}`;
    //   function getRandomNumber() {
    //     return Math.floor(Math.random() * 25);
    //   }
    //   return filename;
    // },
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
            reader.onload = ()=>{
                this.$store.commit('fillJson',reader.result);
            }
            reader.onerror = function(){
                console.log('Error. Can not ot read json-file.');
            }
            
      } else {
        this.fileType = null;
        console.log("exeption");
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
    saveDownloadedImages() {
      console.log("click");
    },
  },
};
</script>

<style lang="scss">
#downloader {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(84, 97, 84);
  flex: 1 1 320px;
  justify-content: space-evenly;
}

.transparent {
  opacity: 0.5;
}

#drugndrop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed rgba(211, 211, 211, 0.671);
  box-sizing: border-box;
  @media (max-width: 575px) {
    display: none;
  }
}
#drugndrop:hover {
  background-color: rgba(170, 170, 170, 0.281);
}
.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  min-width: 100px;
  min-height: 30px;
  padding:5px;
  background-color: rgb(9, 196, 253);
  color: white;
  border: none;
  border-radius: 4px;
  margin: 5px;

  &_disabled {
    background-color: rgb(181, 187, 189);
    cursor: not-allowed;
  }
  &_success {
    background-color: rgb(8, 158, 33);
  }
}
.btn:focus {
  border: none;
  outline: none;
}
.btn:hover {
  box-shadow: 0 0 6px 1px rgba(41, 40, 40, 0.667);
  &_disabled {
    box-shadow: 0 0 0 0 rgba(41, 40, 40, 0);
  }
}
.btn:active {
  box-shadow: 0 0 3px 1px rgba(41, 40, 40, 0.667);
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
  // border:1px solid lightgrey;
  margin: 5px;
  &__img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
.thumb {
  object-fit: cover;
  width: 100px;
}


</style>