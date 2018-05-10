<script>
/**
 * @overview 用户中心 - 参与的活动记录
 *
 * @author
 */

export default {
  name: 'UserActivity',
  data() {
    return {
      list: [
        {
          id: 1,
          img: 'http://placeholder.qiniudn.com/750x350/FF3B3B/ffffff',
          title: '送你一朵fua',
          created: '2018-05-05',
          result: 4,
        },
        {
          id: 2,
          img: 'http://placeholder.qiniudn.com/750x350/FFEF7D/ffffff',
          title: '送你一次旅行',
          created: '2018-05-05',
          result: 6,
        },
        {
          id: 3,
          img: 'http://placeholder.qiniudn.com/750x350/8AEEB1/ffffff',
          title: '送你一朵fua',
          created: '2018-05-05',
          result: 8,
        },
      ],
    };
  },
};

</script>
<template>
  <AppPage class="user-activity">
    <div class="user-activity-list">
      <div
        v-for="item in list"
        :key="item.id"
        class="user-activity-item">
        <img
          :src="item.img"
          class="user-activity-item__img">
        <div class="user-activity-item__title">
          <div>{{ item.title }}</div>
          <div>{{ item.created }}</div>
        </div>
        <div class="user-activity-item__result">
          获得学时 {{ item.result }}
        </div>
      </div>
    </div>
  </AppPage>
</template>
<style lang="less">
.user-activity-item {
  background-color: #fff;
  margin-bottom: px2vw(30);
  font-size: px2vw(30);
}
.user-activity-item__img {
  width: 100%;
}
.user-activity-item__title {
  display: flex;
  justify-content: space-between;
  padding: px2vw(16) px2vw(30);
}
.user-activity-item__result {
  padding: 0 px2vw(30) px2vw(30);
}
</style>
