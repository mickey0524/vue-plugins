/**
 * [用于判断节点是否挂载到文档流]
 * @param  {element obj} el [指令挂载的节点]
 * @return {boolean}    [如果节点已经挂载到文档流中，返回true，否则返回false]
 */
const isAttached = (el) => {
  let currentNode = el.parentNode;
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true;
    }
    if (currentNode.nodeType === 11) {
      return false;
    }
    currentNode = currentNode.parentNode;
  }
  return false;
};


/**
 * [创建瀑布流的各条图片流]
 * @param  {number} lineNum      [有多少图片流]
 * @param  {number} lineInterval [两条图片流之间的间隔]
 * @return {[fragment element, array]}              [返回fragment，和图片流节点组成的array]
 */
const createImgLine = (lineNum, lineInterval) => {
  let fragment = document.createDocumentFragment();
  let lineArr = [];
  for (let i = 0; i < lineNum; i++) {
    let lineNode = document.createElement('div');
    let cssText = 'display: inline-block; vertical-align: top;';
    lineNode.className = 'waterfall-line';
    if (i < lineNum - 1) {
      cssText += ' margin-right: ' + lineInterval + 'px;';
    }
    lineNode.style.cssText = cssText;
    fragment.appendChild(lineNode);
    lineArr.push(lineNode);
  }
  return [ fragment, lineArr ];
};


/**
 * [获取当前高度最短的图片流节点]
 * @param  {[element array]} lineArr [图片流数组]
 * @return {element}         [图片流节点]
 */
const getMinHeightLine = (lineArr) => {
  let res = lineArr[0];
  for (let i = 0, len = lineArr.length; i < len; i++) {
    if (lineArr[i].offsetHeight < res.offsetHeight) {
      res = lineArr[i];
    }
  }
  return res;
};


/**
 * [将图片节点插入文档流]
 * @param  {element obj} el      [指令挂载的节点]
 * @param  {element obj} imgNode [图片节点]
 */
const insertImg = (el, imgNode) => {
  let insertedLine = getMinHeightLine(el.lineArr);
  insertedLine.appendChild(imgNode);
};


export default {
  install: Vue => {
    Vue.directive('waterfall', {
      bind: (el, binding, vnode) => {
        vnode.context.$on('hook:mounted', () => {
          vnode.context.$nextTick(() => {
            let initImgWidth = () => {
              let elWidth = getComputedStyle(el).width.replace('px', '');
              el.imgNum = 0;
              el.lineInterval = el.getAttribute('waterfall-interval') || 10;
              el.lineNum = el.getAttribute('waterfall-num') || 4;
              el.imgWidth = parseInt((elWidth - el.lineInterval * (el.lineNum - 1)) / el.lineNum, 10);
            };
            if (isAttached(el)) {
              initImgWidth();
              let [ fragment, lineArr ] = createImgLine(el.lineNum, el.lineInterval);
              el.lineArr = lineArr;
              el.appendChild(fragment);
              return ;
            }
            let trybind = () => {
              if (isAttached(el)) {
                initImgWidth();
                let [ fragment, lineArr ] = createImgLine(el.lineNum, el.lineInterval);
                el.lineArr = lineArr;
                el.appendChild(fragment);
              }
              else {
                setTimeout(trybind, 1000 / 60);
              }
            };
            trybind();
          });
        });
      },
      update: (el, binding) => {
        let imgArr = binding.value;
        let newImgArr = imgArr.slice(el.imgNum);
        for (let i = 0, len = newImgArr.length; i < len; i++) {
          let image = new Image();
          image.src = newImgArr[i];
          image.onload = function() {
            let originWidth = image.width,
                originHeight = image.height;
            let imgHeight = parseInt(originHeight / (originWidth / el.imgWidth), 10);
            let imgNode = document.createElement('div');
            imgNode.className = 'img-container';
            imgNode.innerHTML =
              `
                <img src=${newImgArr[i]} width=${el.imgWidth} height=${imgHeight} />
              `;
            insertImg(el, imgNode);
          };
        }
        el.imgNum = imgArr.length;
      }
    });
  }
};

