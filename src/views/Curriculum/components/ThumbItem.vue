<script>
/**
 * @overview 课程首页列表项
 *
 * @author  lindongfnag
 */
  export default {
    name: 'CurriculumThumbItem',
    props: {
      item: {
        type: Object,
        default: (() => {}),
      },
    },
    methods: {
      goDetail(id) {
        this.$router.push(`/curriculum/detail/${id}`);
      },
    },
  };
</script>
<template>
  <div
    class="curriculum-item"
    @click="goDetail(item.id)"
  >
    <div class="curriculum-item__thumb">
      <img
        v-lazy="item.cover_url">
        <!-- <div
            v-if="item.stock_remain === 0"
            class="curriculum-item__thumb--full">满员</div> -->
    </div>
    <div class="curriculum-item__desc">
      <div class="curriculum-item-desc__title">{{ item.name }}</div>
      <div class="curriculum-item-desc__content">{{ item.introduce }}</div>
      <div class="curriculum-item-desc__time">{{ item.created }}</div>
      <div
        v-if="item.stock_remain != 0"
        class="curriculum-item-desc__left">还剩{{ item.stock_remain }}个名额</div>
      <div
        v-else
        class="curriculum-item-desc__left">满员</div>
      <div
        v-if="item.price === '0.00' || item.price === null"
        class="curriculum-item-desc__price">￥{{ item.original_price }}</div>
      <div
        v-else
        class="curriculum-item-desc__price">￥{{ item.price }}</div>

    </div>
  </div>
</template>

<style lang="less">
.curriculum-item {
  background-color: #fff;
  display: flex;
  padding: px2vw(26) px2vw(26);
  overflow: hidden;
  font-size: px2vw(@font-size-big);
  margin-bottom: px2vw(10);
}
.curriculum-item__thumb {
  margin-right: px2vw(40);
  position: relative;
}
.curriculum-item__thumb > img {
  width: px2vw(240);
  height: px2vw(240);
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
  font-size: px2vw(32);
  letter-spacing: 1px;
  text-align: left;
  word-break: break-all;
}
.curriculum-item-desc__content {
  width: px2vw(380);
  text-align: left;
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
  font-size: px2vw(28);
  letter-spacing: 1px;
}
.curriculum-list-empty {
  text-align: center;
  margin-top: px2vw(160);
  font-size: px2vw(40);
  letter-spacing: px2vw(4);
}
</style>
