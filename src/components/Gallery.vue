<template>

    <div v-if="!remoteState" id="gallery">
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550755.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
      <Picture
        :height="pictureHeight"
        :src="`https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg`"
      />
    </div> 
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex';
import Picture from "./Picture.vue";
export default {
  name: "Gallery",
  components: { Picture },
  data: () => ({
    galleryHeight: "",
    galleryWidth: "",
  }),
  computed: {
    ...mapGetters(["remoteState"]),
    pictureHeight() {
      let w = parseInt(this.galleryWidth / 5);
      return w;
    },
  },

  mounted() {
    this.galleryHeight = this.$el.scrollHeight;
    this.galleryWidth = this.$el.scrollWidth;
    console.dir(this.$el)
    window.addEventListener("resize", () => {
      this.galleryHeight = this.$el.scrollHeight;
      this.galleryWidth = this.$el.scrollWidth;
    });
  },
};
</script>
<style lang="scss">

#gallery {
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(91, 91, 117);
  flex: 1 1 220px;
  min-width: 320px;
  max-width: 860px;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 576px) {
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
  }
}
</style>