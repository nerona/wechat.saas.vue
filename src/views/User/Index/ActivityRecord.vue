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
      list: [],
    };
  },
  created() {
    this.getBefore();
  },
  methods: {
    getBefore() {
      this.$http.get('/activity/record').then((res) => {
        this.list = res.data;
      });
    },
  },
};

</script>
<template>
  <AppPage class="user-activity">
    <div class="user-activity-list">
      <div
        v-for="item in list"
        :key="item.id"
        class="user-activity-item vux-1px-b">
        <img
          :src="item.activity.cover"
          class="user-activity-item__img">
        <div class="user-activity-item__title">
          <div>{{ item.activity.name }}</div>
          <div>{{ item.created_at.split(' ')[0] }}</div>
        </div>
        <!-- <div class="user-activity-item__result">
          获得学时 {{ item.prize_status }}
        </div> -->
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
