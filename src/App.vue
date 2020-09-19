<template>
  <div id="app">
    <Gallery id="gallery"/>
    <RemoteImages  id="remote-images"/>
    <Downloader id="downloader"/>
  </div>
</template>

<script>
import Gallery from "./components/Gallery.vue";
import Downloader from "./components/Downloader.vue";
import RemoteImages from "./components/RemoteImages.vue";

export default {
  name: "App",
  components: {
    Downloader,
    Gallery,
    RemoteImages,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  justify-content: space-around;

  @media (max-width: 320px) {
    flex-direction: column;
    max-width: 320px;
  }
  @media (min-width: 576px) {
    flex-direction: column;
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
</style>
