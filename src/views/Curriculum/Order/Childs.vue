<script>
/**
 * @overview 选择小孩
 *
 * @author  lindongfnag
 */
export default {
  name: 'OrderChilds',
  props: {
    childs: {
      type: Array,
      default: () => ([]),
    },
    childValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  created() {
    this.childs.forEach((item) => {
      if (item.name === this.childValue) {
        this.selected = item.id;
      }
    });
  },
  methods: {
    goAddChild() {
      this.$router.push('/learn/kid');
    },
    updateChild(id) {
      this.$emit('updateChild', id);
    },
  },
};
</script>
<template>
  <div>
    <div class="order-childs">
      <div
        v-for="item in childs"
        :key="item.id"
        :class="{'active': item.id === selected}"
        class="order-childs-item"
        @click="updateChild(item.id)">
        <img
          :src="item.head_url"
          class="order-childs-item__header">
        <div class="order-childs-item__name">{{ item.name }}</div>
      </div>
    </div>

    <div class="order-childs-btns">
      <div
        class="order-childs-btns__add"
        @click="goAddChild" >
        添加小孩
      </div>
      <!-- <div class="order-childs-btns__sure">确定</div> -->
    </div>
  </div>
</template>

<style lang="less">
.order-childs {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: px2vw(60) px2vw(30) px2vw(60) px2vw(30);
  overflow-y: scroll;
  background-color: #fff;
}
.order-childs-item {
  width: 30%;
  margin-bottom: px2vw(40);
  box-sizing: border-box;
  img {
    border-radius: 50%;
  }
}
.order-childs-item.active img {
  border: 3px solid #ffd900;
}
.order-childs .order-childs-item:not(:nth-child(3n)) {
  margin-right: 5%;
}
.order-childs-item__header {
  width: 100%;
}
.order-childs-item__name {
  margin-top: px2vw(12);
}
.order-childs-btns {
  height: px2vw(100);
  line-height: px2vw(100);
  font-size: px2vw(36);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 9;
  color: rgb(255, 255, 255);
  display: flex;
  text-align: center;
  letter-spacing: 2px;
}
.order-childs-btns__add {
  width: 100%;
  background: linear-gradient(90deg, rgb(255, 94, 58), rgb(255, 149, 0));
}
.order-childs-btns__sure {
  width: 50%;
  background: linear-gradient(90deg, rgb(29, 98, 240), rgb(25, 213, 253));
}

</style>
