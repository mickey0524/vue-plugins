<template>
  <div class="notice">
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notice',
    data() {
      return {
        visible: false,
        content: '',
        duration: 3000
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close() // 3000ms之后调用关闭方法
        }, this.duration)
      },
      close() {
        this.visible = false;
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }, 500)
      }
    },
    mounted() {
      this.setTimer() // 挂载的时候就开始计时，3000ms后消失
    }
  }
</script>

<style>
  .notice {
    border: 1px solid red;
    position: fixed;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>