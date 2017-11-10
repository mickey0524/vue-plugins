import Vue from 'vue';

const noticeConstructor = Vue.extend(require('./Notice.vue'));

const Notice = (content) => {
  let noticeInstance = new noticeConstructor({
    data: {
      content: content
    }
  });
  noticeInstance.vm = noticeInstance.$mount();
  noticeInstance.vm.visible = true;
  noticeInstance.dom = noticeInstance.vm.$el;
  noticeInstance.dom.style.zIndex = '1000';
  document.body.appendChild(noticeInstance.dom);
  return noticeInstance.vm;
}

export default {
  install: Vue => {
    Vue.prototype.$notice = Notice;
  }
}
