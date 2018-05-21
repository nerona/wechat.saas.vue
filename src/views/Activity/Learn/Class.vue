<script>
/**
 * @overview 活动页 - 上课信息
 *
 * @author lindongfang
 */
  export default {
    name: 'LearnClass',
    data() {
      return {
        range: '7月1日至8月31日',
        citys: [{
          link: '#xm',
          name: '厦门',
        }, {
          link: '#fz',
          name: '福州',
        }, {
          link: '#other',
          name: '其他地区',
        }],
      };
    },
  };
</script>
<template>
  <div
    id="class"
    class="learn-index-class">
    <div class="learn-index-board__title">
      <span>上课时间</span>
    </div>
    <div class="learn-index-class__range">{{ range }}</div>
    <div class="learn-index-board__title">
      <span>上课地点</span>
    </div>
    <div class="learn-index-class__area">
      <a
        v-for="(item,index) in citys"
        :key="index"
        :href="item.link"
      >{{ item.name }}</a>
    </div>

    <div class="learn-index-class__citys">
      <!--  -->
      <div
        id="xm"
        class="learn-index-class-citys__name">
        厦门
      </div>
      <div class="learn-index-class-citys__disname">
        <span>思明区地点</span>
      </div>
      <div class="learn-index-class-citys__school">
        <div class="learn-index-class-citys-school__name">五缘湾旗舰校区</div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            地址: 环岛东路1803号君尚广场2楼20015号
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l1.png">
          </div>
        </div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            电话: (0592) 7812964
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l4.png">
          </div>
        </div>
      </div>
      <div class="learn-index-class-citys__school">
        <div class="learn-index-class-citys-school__name">XXXX 校区</div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            地址: 环岛东路1803号君尚广场2楼20015号
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l1.png">
          </div>
        </div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            电话: (0592) 7812964
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l4.png">
          </div>
        </div>
      </div>
      <div class="learn-index-class-citys__disname">
        <span>湖里区地点</span>
      </div>
      <div class="learn-index-class-citys__school">
        <div class="learn-index-class-citys-school__name">XXXX 校区</div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            地址: 环岛东路1803号君尚广场2楼20015号
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l1.png">
          </div>
        </div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            电话: (0592) 7812964
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l4.png">
          </div>
        </div>
      </div>
      <!--  -->
      <div
        id="fz"
        class="learn-index-class-citys__name">
        福州
      </div>
      <div class="learn-index-class-citys__disname">
        <span>鼓楼区地点</span>
      </div>
      <div class="learn-index-class-citys__school">
        <div class="learn-index-class-citys-school__name">南街旗舰校区</div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            地址: 环岛东路1803号君尚广场2楼20015号
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l1.png">
          </div>
        </div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            电话: (0592) 7812964
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l4.png">
          </div>
        </div>
      </div>
      <div class="learn-index-class-citys__school">
        <div class="learn-index-class-citys-school__name">XXXX 校区</div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            地址: 环岛东路1803号君尚广场2楼20015号
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l1.png">
          </div>
        </div>
        <div class="learn-index-class-citys-school__item">
          <div class="learn-index-class-citys-school-item_1">
            电话: (0592) 7812964
          </div>
          <div class="learn-index-class-citys-school-item_2">
            <img src="./../../../assets/activity/learn/l4.png">
          </div>
        </div>
      </div>
      <!--  -->
      <div
        id="other"
        class="learn-index-class-citys__name">
        其他校区
      </div>
      <div class="learn-index-class-citys_other">
        泉州、漳州、XXXX正在筹备中，敬请期待！
      </div>
    </div>
  </div>
</template>
<style lang="less">
.learn-index-class {
  margin-top: px2vw(20);
  padding-bottom: px2vw(60);
  color: #898989;
  text-align: justify;
  font-size: px2vw(30);
  position: relative;

  a {
    -webkit-touch-callout: default;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    width: px2vw(26);
    height: px2vw(82);
    background: url('./../../../assets/activity/learn/l15.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: px2vw(-50);
    left: 23%;
  }
  &::after {
    left: auto;
    right: 23%
  }
}
.learn-index-class__range {
  text-align: center;
  font-weight: bold;
  font-size: px2vw(30);
  margin-top: px2vw(20);
  letter-spacing: px2vw(4);
  color: #333;
}
.learn-index-class__area {
  margin: px2vw(20) 4% 0;
  display: flex;
  flex-wrap: wrap;
  a {
    display: block;
    width: 32%;
    background-color: #fabe00;
    color: #000;
    line-height: px2vw(60);
    text-align: center;
    margin-right: 2%;
    margin-bottom: px2vw(20);
    position: relative;
  }
  a:nth-child(2n) {
    background-color: #f39800;
  }
  a:nth-child(3n) {
    margin-right: 0;
  }
}

.learn-index-class__citys {
  margin: px2vw(16) 4%;
  font-size: px2vw(30);
}
.learn-index-class-citys__name {
  color: #f39800;
  font-size: px2vw(32);
  display: inline-block;
  font-weight: bold;
  letter-spacing: px2vw(4);
  position: relative;
  line-height: px2vw(50);
  padding-left: px2vw(30);
  margin-top: px2vw(20);

  &::before,
  &::after {
    content: '';
    display: block;
    width: px2vw(8);
    height: px2vw(8);
    background-color: #f39800;
    border-radius: 50%;
    position: absolute;
    top: px2vw(22);
    left: px2vw(10);
  }
  &::after {
    left: auto;
    right: px2vw(-16);
  }
}
.learn-index-class-citys__disname {
  color: #333;
  font-weight: bold;
  margin-top: px2vw(24);
  font-size: px2vw(30);
  letter-spacing: px2vw(4);
  span {
    border-bottom: 1px solid #333;
    display: inline-block;
    padding-left: 2px;
  }

}
.learn-index-class-citys__school {
  margin-top: px2vw(8);
  text-align: justify;
}
.learn-index-class-citys-school__name {
  color: #595757;
  letter-spacing: px2vw(2);
}
.learn-index-class-citys-school__item {
 display: flex;
 align-items: center;
}
.learn-index-class-citys-school-item_1 {
  flex: 1;
}
.learn-index-class-citys-school-item_2 {
  img {
    width: px2vw(36);
    height: px2vw(36);
    margin-left: px2vw(20);
  }
}


.learn-index-class-citys_other {
  font-size: px2vw(30);
  color: #f39800;
  font-weight: bold;
}
</style>
