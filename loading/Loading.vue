<template>
<!--   <transition
    name="loading"
    @after-leave="handleAfterLeave"> -->
    <div
      v-show="visible"
      :class="['loading-mask', fullscreen && 'fullscreen']">
      <div class="loading">
        ...
      </div>
      <div class="loading-text" v-if="text">
        {{ text }}
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      visible: true,
      fullscreen: true,
      text: '等待中'
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    }
  }
}
</script>

<style>
  .loading-mask{
    position: absolute; /*非全屏模式下，position是absolute*/
    z-index: 10000;
    background-color: rgba(255,235,215, .8);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
  }
  .loading-mask.fullscreen{
    position: fixed;  /* 全屏模式下，position是fixed*/
  }
</style>