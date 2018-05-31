<script>
/**
 * @overview 学习中心 - 首页
 *
 * @author suyanping
 */
import { Group, Cell, Popup, TransferDom, Icon } from 'vux';
import courseList from './courseList';

export default {
  name: 'LearnIndex',

  directives: {
    TransferDom,
  },
  components: {
    courseList,
    Group,
    Cell,
    Popup,
    Icon,
  },

  data() {
    return {
      kidInfo: { current: {} },

      kidMenus: [],
      currKidId: null,
      showSheeet: false,

    };
  },

  created() {
    this.$vux.loading.show();
    this.$http.get('/student')
    .then((res) => {
      this.kidMenus = res.students;
      if (res.students.length < 1) {
        this.$router.push('/learn/kid');
      } else if (this.$route.query.id) {
        const getKid = res.students.find(item => item.id === (this.$route.query.id * 1));
        this.kidInfo = getKid;
        this.currKidId = this.kidInfo.id;
      } else {
        this.kidInfo = res.students[0];
        this.currKidId = this.kidInfo.id;
      }

      this.$vux.loading.hide();
    })
    .catch(({ message }) => {
      this.$vux.loading.hide();
      this.$vux.toast.text(message, 'middle');
    });
  },

  methods: {
    changeKid() {
      this.showSheeet = true;
    },

    getKid(key) {
      if (key !== this.currKidId) {
        this.currKidId = key;
        window.location.replace(`/learn/index?id=${this.currKidId}`);
      }
      this.showSheeet = false;
    },

    addKId() {
      this.$router.push('/learn/kid');
      this.showSheeet = false;
    },

    editAdd(id) {
      this.$router.push(`/learn/edit/${id}`);
    },

    goCurriculum(curriculumId) {
      this.$router.push(`/learn/curriculum/${this.currKidId}_${curriculumId}`);
    },
  },

};
</script>

<template>
  <AppPageWithTabbar>
    <div class="learn-learn-index">
      <header class="learn-learn-index__header">
        <img
          :src="kidInfo.head_url"
          class="learn-learn-index-header__img">
        <div class="learn-learn-index-header__info">
          <span>{{ kidInfo.name }}</span>&nbsp;&nbsp;
          <span @click="editAdd(kidInfo.id)">
            <img
              src="./../../assets/edit.png"
              class="learn-learn-index-header__edit">
          </span>
          <br>
          <span>{{ kidInfo.birth_at }}</span>
        </div>
        <div
          class="learn-learn-index-header__manage"
          @click="showSheeet = true">
          <span>
            管理小孩&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <div v-transfer-dom>
          <popup
            v-model="showSheeet"
            is-transparent>
            <div class="learn-learn-index-header__transfer">
              <div
                v-for="item in kidMenus"
                :key="item.id"
                :class="currKidId === item.id ? 'learn-learn-index-header-manage__speDiv '
                  + 'learn-learn-index-header-manage__padDiv'
                : 'learn-learn-index-header-manage__speDiv'"
                @click="getKid(item.id)">
                <icon
                  v-if="currKidId === item.id"
                  type="success-no-circle"/>
                <img
                  slot="icon"
                  :src="item.head_url"
                  class="learn-learn-index-header-manage__img"
                >
                <span>{{ item.name }}</span>
              </div>
              <div
                class="learn-learn-index-header-manage__div"
                @click="addKId"
              >添加小孩</div>
              <div
                class="learn-learn-index-header-manage__div"
                @click="showSheeet = false">取消</div>
            </div>
          </popup>
        </div>

      </header>
      <hr>
      <div class="learn-learn-index__body">
        <group>
          <cell
            v-if="Object.keys(kidInfo.current).length > 0"
            :value="kidInfo.current.range + '有课'"
            title="课程信息"
            is-link
            @click.native="goCurriculum(kidInfo.current.curriculum_id)"/>
          <cell
            v-else
            value="无课"
            title="课程信息"
            is-link/>
        </group>
      </div>

      <course-list
        :course-data="kidInfo.curriculum"
        :student-id="currKidId"
      />

    </div>
  </AppPageWithTabbar>
</template>

<style lang="less">
.learn-learn-index__header{
  padding: px2vw(40);
  display: flex;
  position: relative;
  background: white;
}
.learn-learn-index-header__transfer{
  width: 100%;
  background-color:#fff;
  font-size: px2vw(32);
}
.learn-learn-index-header__transfer .weui-icon-success-no-circle{
  font-size: px2vw(46);
}
.learn-learn-index-header__img{
  width: px2vw(100);
  height: px2vw(100);
  border-radius: 50%;
}
.learn-learn-index-header__edit{
  display: inline-block;
  width: px2vw(30);
  height: px2vw(30);
  position: relative;
  top: px2vw(6);
}
.learn-learn-index-header__info{
  margin-left: px2vw(30);
  font-size: px2vw(30);
}
.learn-learn-index-header__manage{
  position: absolute;
  right: px2vw(40);
  top: px2vw(60);
  font-size: px2vw(32);
}
.learn-learn-index-header__manage>span::after{
  content: " ";
  display: inline-block;
  height: px2vw(12);
  width: px2vw(12);
  border-width: px2vw(4) px2vw(4) 0 0;
  border-color: gray;
  border-style: solid;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: absolute;
  top: 50%;
  margin-top: px2vw(-8);
  right: px2vw(4);;
}
.learn-learn-index__body{
  background: white;
}
.learn-learn-index__body .weui-cells{
  margin-top: px2vw(6);
  margin-bottom: px2vw(8);
  font-size: px2vw(32);
}
.learn-learn-index__body .weui-cell_access .weui-cell__ft:after{
    content: " ";
    display: inline-block;
    height: px2vw(12);
    width: px2vw(12);
    border-width: px2vw(4) px2vw(4) 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: px2vw(-8);
    right: px2vw(-8);
}
.learn-learn-index-header-manage__div{
  text-align: center;
  line-height: px2vw(90);
  border-bottom: px2vw(2) solid gainsboro;
}
.learn-learn-index-header-manage__speDiv{
  padding-left: 40%;
  padding-top: px2vw(5);
  padding-bottom: px2vw(20);
  border-bottom: px2vw(2) solid gainsboro;
}
.learn-learn-index-header-manage__padDiv{
  padding-left: 30%;
}
.learn-learn-index-header-manage__img{
  width: px2vw(60);
  height: px2vw(60);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  top: px2vw(16);
}
</style>
