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
        <div class="curriculum-item-desc__title">{{ item.title }}</div>
        <div class="curriculum-item-desc__content">{{ item.desc }}</div>
        <div class="curriculum-item-desc__time">{{ item.created }}</div>
        <div
          v-if="item.status == 0"
          class="curriculum-item-desc__left">还剩{{ item.left }}个名额</div>
        <div
          v-else
          class="curriculum-item-desc__left">满员</div>
        <div class="curriculum-item-desc__price">￥{{ item.price }}</div>

      </div>
    </div>
  </div>
</template>

<style lang="less">
.curriculum-list {
  margin-top: px2vw(20);
}
.curriculum-item {
  background-color: #fff;
  display: flex;
  padding: px2vw(26) px2vw(26);
  overflow: hidden;
  font-size: px2vw(@font-size-big);
  margin-bottom: px2vw(20);
}
.curriculum-item__thumb {
  width: 36%;
  margin-right: px2vw(40);
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
  font-size: px2vw(@font-size-big);
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
.curriculum-item-desc__title {
  font-size: px2vw(@font-size-bigger);
  letter-spacing: 1px;
}
.curriculum-item-desc__content {
  text-align: justify;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-top: px2vw(4);
}
.curriculum-item-desc__time {
  color: @font-size-third-color;
  font-size: px2vw(@font-size-default);
  margin-top: px2vw(4);
}
.curriculum-item-desc__price {
  color: @font-size-error-color;
  font-size: px2vw(@font-size-bigger);
  letter-spacing: 1px;
}
.curriculum-item-desc__left {
  color: @button-background-color;
  font-size: px2vw(@font-size-default);
}
</style>
