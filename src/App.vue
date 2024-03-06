<template>
  <div class="wrap" ref="wrapRef">
    <div
      v-for="(item, index) in galleryData"
      :key="item.src"
      :ref="(el) => setItemRefs(el, item, index)"
      class="photo photo-front"
      @click.stop.prevent="turn(index, $event)"
    >
      <div class="photo-wrap">
        <div class="side side-front">
            <img :src="item.src" :alt="item.desc">
        </div>
        <div class="side side-back">
          <p class="desc" v-html="item.desc"></p>
        </div>
      </div>
    </div>

    <div class="nav">
      <span
        v-for="(item, index) in galleryData"
        :key="item.src"
        :ref="(el) => setNavItemRefs(el, index)"
        class="i"
        @click="handleClickNav(index, $event)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useData } from './utils/useData'
import { random } from './utils/utils'

const { galleryData, setItemRefs, itemRefs, range, wrapRef } = useData()

const navItemRefs = ref<{ id: number, el: Element }[]>([])
const currentIndex = ref(-1) // 记录当前的索引，用来判断下个点击是当前索引之前还是之后，设置导航样式
const setNavItemRefs = (el: any, index: number) => {
  if (el) navItemRefs.value.push({ id: index, el })
}

onMounted(() => {
  resort(random([0, galleryData.value.length]))
})

function turn(index: number, ev: MouseEvent) {
  const ele = ev.currentTarget as HTMLElement
  let className = ele.className
  if (/photo-center/.test(className)) {
    if (/photo-front/.test(className)) {
      className = className.replace(/photo-front/, 'photo-back')
    } else {
      className = className.replace(/photo-back/, 'photo-front')
    }
    ele.className = className
  } else {
    resort(index)
  }
}

function handleClickNav(index: number, ev: MouseEvent) {
  const ele = itemRefs.value[index].el
  const navEle = ev.currentTarget as HTMLElement
  let className = ele.className
  let navClassName = navEle.className
  if (/photo-center/.test(className)) {
    if (/photo-front/.test(className)) {
      className = className.replace(/photo-front/, 'photo-back')
      navClassName = navClassName.replace(/front/, 'back')
    } else {
      className = className.replace(/photo-back/, 'photo-front')
      navClassName = navClassName.replace(/back/, 'front')
    }
    ele.className = className
    navEle.className = navClassName
  } else {
    resort(index)
  }
}

function resort(n: number) {
  const photos = itemRefs.value.map(v => v.el)
  photos.forEach((el, i) => {
    el.classList.remove('photo-center')
    el.classList.replace('photo-back', 'photo-front')
    navItemRefs.value[i].el.classList.remove('i-current', 'i-front', 'i-back')
  })

  const photo_center = photos.splice(n, 1)[0]
  photo_center.classList.add('photo-center')

  const photos_left = photos.splice(0, Math.ceil(photos.length / 2))
  const photos_right = photos

  const ranges = range()
  photos_left.forEach((el) => {
    (el as HTMLElement).style.left = random(ranges.left.x as [number, number]) + 'px';
    (el as HTMLElement).style.top = random(ranges.left.y as [number, number]) + 'px';
    (el as HTMLElement).style.transform = `rotate(${random([-150, 150])}deg)`
  })

  photos_right.forEach((el) => {
    (el as HTMLElement).style.left = random(ranges.right.x as [number, number]) + 'px';
    (el as HTMLElement).style.top = random(ranges.right.y as [number, number]) + 'px';
    (el as HTMLElement).style.transform = `rotate(${random([-150, 150])}deg)`
  })
  if (currentIndex.value === n) return
  if (currentIndex.value > n) {
    navItemRefs.value[n].el.classList.add('i-current', 'i-front')
  } else {
    navItemRefs.value[n].el.classList.add('i-current', 'i-back')
  }
  currentIndex.value = n
}
</script>
