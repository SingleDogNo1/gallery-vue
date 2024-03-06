import { computed, ref } from 'vue'
import { sortBy } from 'lodash-es'

interface Gallery {
  /** 图片路径 */
  src: string,
  /** 图片描述 */
  desc: string
}

export function useData() {
  const descList = [
    'hello, world1<br/>\
    你好，世界1。',
    'hello, world2<br/>\
    你好，世界2。',
    'hello, world3<br/>\
    你好，世界3。',
    'hello, world4<br/>\
    你好，世界4。',
    'hello, world5<br/>\
    你好，世界5。',
    'hello, world6<br/>\
    你好，世界6。',
    'hello, world7<br/>\
    你好，世界7。',
    'hello, world8<br/>\
    你好，世界8。',
    'hello, world9<br/>\
    你好，世界9。',
    'hello, world10<br/>\
    你好，世界10。',
    'hello, world11<br/>\
    你好，世界11。',
    'hello, world12<br/>\
    你好，世界12。',
    'hello, world13<br/>\
    你好，世界13。'
  ]
  const imagesMap = import.meta.glob('../gallery/*.png', { eager: true })
  const imagesPath = Object.keys(imagesMap).map(k => ((imagesMap[k] as Record<string, string>).default))
  const imagesList = sortBy(imagesPath, (v) => parseFloat(v.match(/\d+/g)![0]))
  const galleryData = computed(() => imagesList.map((src, index) => ({ src, desc: descList[index] })))

  const wrapRef = ref<HTMLElement>()
  const itemRefs = ref<{ id: number, el: Element }[]>([])

  function range() {
    const range: Record<string, Record<string, [number, number] | []>> = {
      left: { x: [], y: [] },
      right: { x: [], y: [] }
    }
    const wrap = {
      w: wrapRef.value?.clientWidth,
      h: wrapRef.value?.clientHeight
    }
    const photo = {
      w: itemRefs.value[0].el.clientWidth,
      h: itemRefs.value[0].el.clientHeight
    }

    range.left.x = [-photo.w / 2, wrap.w! / 2 - photo.w / 2]
    range.left.y = [-photo.h / 2, wrap.h!]
    range.right.x = [wrap.w! / 2 + photo.w / 2, wrap.w! - photo.w / 2]
    range.right.y = range.left.y
    return range
  }

  const setItemRefs = (el: any, _item: Gallery, index: number) => {
    if (el) {
      itemRefs.value.push({
        id: index,
        el
      })
    }
  }

  return { galleryData, range, setItemRefs, wrapRef, itemRefs }
}