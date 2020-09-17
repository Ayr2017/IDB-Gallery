<template>
  <span class="picture">
    <img class="picture__content" :src="src" :style="`height:${height}px`" />
  </span>
</template>

<script>
export default {
  name: "Picture",
  props: ["src", "height"],
  mounted() {
    console.log("Picture mounted");
  },
  methods: {
    selectImage(e) {
      e.target.classList.toggle("picture__content_selected");
    },
  },
};
</script>
<style lang="scss">
.picture {
  display: inline-flex;

  &__content {
    display: flex;
    margin: 5px;
    object-fit: cover;
    height: 100px;

    &_selected {
      box-sizing: border-box;
      border: 3px solid rgba(80, 154, 238, 0.404);
    }
  }
}
</style>