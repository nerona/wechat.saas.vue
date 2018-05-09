<script>
/**
 * @overview 轮播
 *
 * @author  lindongfnag
 */

import { Swiper, SwiperItem } from 'vux';

export default {
  name: 'SwiperList',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    swiperList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {};
  },
  computed: {
    auto() {
      return this.swiperList.length !== 1;
    },
  },
};
</script>
<template>
  <div class="swiper-list">
    <swiper
      :list="swiperList"
      :show-desc-mask="false"
      :auto="auto"
      :aspect-ratio="350/750"
      :interval="5000"
      loop
      dots-class="swiper-list__dots"
      dots-position="center"
    />
  </div>
</template>

<style lang="less">

</style>
