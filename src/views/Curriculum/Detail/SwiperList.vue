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
    attachment: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {};
  },
  computed: {
    auto() {
      return this.attachment.length !== 1;
    },
  },
  mounted() {
    this.attachment.forEach((item) => {
      // eslint-disable-next-line
      item.img = item.url;
       // eslint-disable-next-line
      item.url = 'javascript:void';
    });
  },
  methods: {
    show() {
      return false;
    },
  },
};
</script>
<template>
  <div class="swiper-list">
    <swiper
      :list="attachment"
      :show-desc-mask="false"
      :auto="auto"
      :aspect-ratio="350/750"
      :interval="5000"
      loop
      dots-class="swiper-list__dots"
      dots-position="center"
      @click.native="show($event)"
    />
  </div>
</template>

<style lang="less">
.swiper-list {
  position: relative;
}
.swiper-list-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>
