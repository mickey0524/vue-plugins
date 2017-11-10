# vue-plugins
一些vue插件，包括自定义指令，元指令...

### waterfall

vue版本的瀑布流插件，用法如下所示

```
app.vue

<template>
	<div id="app">
		<div v-waterfall="imgArr" waterfall-num="4" waterfall-interval="10"></div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				imgArr: []
			}
		}
	}
</script>

main.js

Vue.use(Waterfall)
```
