<script>
/**
 * @overview 课程首页列表
 *
 * @author  lindongfnag
 */
  export default {
    name: 'CurriculumItem',
    props: {
      thumbs: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {};
    },
    methods: {
      goDetail(id) {
        this.$router.push(`/curriculum/detail/${id}`);
      },
    },
  };
</script>
<template>
  <div class="curriculum-list">
    <div
      v-for="item in thumbs"
      :key="item.id"
      class="curriculum-item"
      @click="goDetail(item.id)"
    >
      <div class="curriculum-item__thumb">
        <img
          :src="item.thumb"
          alt="">
        <div
          v-if="item.status === 1"
          class="curriculum-item__thumb--full">满员</div>
      </div>
      <div class="curriculum-item__desc">
        <div class="curriculum-item-desc-top">
          <div class="curriculum-item-desc-top__title">{{ item.title }}</div>
          <div class="curriculum-item-desc-top__content">{{ item.desc }}</div>
          <div class="curriculum-item-desc-top__time">{{ item.created }}</div>
        </div>

        <div class="curriculum-item-desc__footer">
          <div class="curriculum-item-desc-footer__price">￥{{ item.price }}</div>
          <div
            v-if="item.status == 0"
            class="curriculum-item-desc-footer__left">还剩{{ item.left }}个名额</div>
          <div
            v-else
            class="curriculum-item-desc-footer__left">满员</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.curriculum-list {
  margin-top: px2vw(30);
}
.curriculum-item {
  background-color: #fff;
  display: flex;
  padding: px2vw(20) px2vw(16);
  overflow: hidden;
  font-size: px2vw(28);
  margin-bottom: px2vw(16);
}
.curriculum-item__thumb {
  width: 33%;
  margin-right: 2%;
  position: relative;
}
.curriculum-item__thumb > img {
  width: 100%;
}
.curriculum-item__thumb--full {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  background-color: rgba(0,0,0,.3);
  font-size: px2vw(32);
  font-weight: bold;
  letter-spacing: 2px;
  padding: px2vw(4) px2vw(14);
}
.curriculum-item__desc {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.curriculum-item-desc-top__title {
  font-size: px2vw(32);
  font-weight: bold;
}
.curriculum-item-desc-top__content {
  text-align: justify;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: px2vw(6);
}
.curriculum-item-desc-top__time {
  color: #999;
}
.curriculum-item-desc__footer {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.curriculum-item-desc-footer__price {}
.curriculum-item-desc-footer__left {
  color: red;
}
</style>
