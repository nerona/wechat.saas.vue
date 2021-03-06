<script>
/**
 * @overview 课程表
 *
 * @author suyanping
 */

import { Datetime, PopupPicker, Group, InlineCalendar } from 'vux';
import { times } from '@/utils';
import { pageUtils } from '@/mixins';

export default {
  name: 'LearnCurriculum',
  components: {
    Datetime,
    PopupPicker,
    Group,
    InlineCalendar,
  },
  filters: {
    getTime(str) {
      const timeArr = str.split(':');
      return `${timeArr[0]}:${timeArr[1]}`;
    },
  },

  mixins: [pageUtils],

  data() {
    return {
      studenId: this.$route.params.id.split('_')[0],
      curriculumId: this.$route.params.id.split('_')[1],

      currList: [['全部']],
      currVal: ['全部'],
      schedule: [],
      curriculum: [],
      curriculumInfo: [],

      showDot: false,
      show: true,
      value: 'TODAY',
      buildSlotFn: (line, index, data) => this.changeDate(line, index, data),
      replaceTextList: { TODAY: '今' },
      dateTime: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}`,
    };
  },

  created() {
    this.getFormData(this.studenId, this.curriculumId);
  },

  methods: {
    getFormData(studenId, curriculumId) {
      this.$_pageMixin_http(`/student/schedule/${studenId}/${curriculumId}`, (res) => {
        this.schedule = res.schedule;
        this.curriculum = res.curriculum;

        if (!this.showDot) {
          this.currList = [];
          const initCurr = ['全部'];
          res.curriculum.forEach((item) => {
            initCurr.push(item.name);
          });
          this.currList.push(initCurr);
          const curriculum = res.curriculum.find(item => item.id === Number(curriculumId));
          this.currVal = [curriculum.name];
        }

        this.showDot = true;
        this.onChange(this.value);
      });
    },

    changeCurr(val) {
      if (val[0] === '全部') {
        this.getFormData(this.studenId, 0);
      } else {
        const curriculum = this.curriculum.find(item => item.name === val[0]);
        this.getFormData(this.studenId, curriculum.id);
      }
    },
    onChange(val) {
      if (this.showDot) {
        this.$vux.loading.show();

        this.dateTime = times.dateChange(val, 'isDay');
        this.curriculumInfo = [];
        this.schedule.forEach((item) => {
          if (times.dateChange(item.date) === val) {
            this.curriculumInfo.push(item);
          }
        });
        this.curriculumInfo.sort(this.timeSort('start_time'));
        this.$vux.loading.hide();
      }
    },
    changeTime(val) {
      const dateArr = val.split('-');
      this.$refs.calendar.switchViewToMonth(dateArr[0] * 1, dateArr[1] * 1);
    },

    changeDate(line, index, data) {
      let strHtml = '<div class="dotBlock"></div>';
      if (this.showDot) {
        const dotDate1 = this.schedule.find(item =>
        (times.dateChange(item.date) === data.formatedDate) && (item.block_status === 1));
        if (dotDate1) {
          strHtml += '<span class="dotType" style="background-color:blue;"></span>';
        }
        const dotDate2 = this.schedule.find(item =>
        (times.dateChange(item.date) === data.formatedDate) && (item.block_status === 2));
        if (dotDate2) {
          strHtml += '<span class="dotType" style="background-color:red;"></span>';
        }
        const dotDate3 = this.schedule.find(item =>
        (times.dateChange(item.date) === data.formatedDate) && (item.block_status === 3));
        if (dotDate3) {
          strHtml += '<span class="dotType" style="background-color:#69FFFE;"></span>';
        }
      }
      return strHtml;
    },

    timeSort(str) {
      return (a, b) => {
        const time1 = new Date(`2018/06/14 ${a[str]}`).getTime();
        const time2 = new Date(`2018/06/14 ${b[str]}`).getTime();
        return time1 - time2;
      };
    },

  },
};
</script>

<template>
  <div class="learn-curriculum">
    <div class="learn-curriculum__block">
      <group>
        <popup-picker
          :data="currList"
          v-model="currVal"
          title="课程"
          @on-change="changeCurr"/>
      </group>
    </div>
    <div>
      <group class="learn-curriculum__team">
        <datetime
          v-model="dateTime"
          title=""
          format="YYYY-MM"
          @on-change="changeTime"/>
      </group>
      <inline-calendar
        ref="calendar"
        :show.sync="show"
        v-model="value"
        :replace-text-list="replaceTextList"
        :return-six-rows="false"
        :render-function="buildSlotFn"
        :hide-header="true"
        class="learn-curriculum__date"
        @on-change="onChange"/>
      <div class="learn-curriculum__inline">
        <div>
          <span class="learn-curriculum-inline__firText"/>&nbsp;上课中
          <span class="learn-curriculum-inline__secText"/>&nbsp;未上课
          <span class="learn-curriculum-inline__thiText"/>&nbsp;已下课
        </div>
      </div>
    </div>
    <div
      v-for="(item,index) in curriculumInfo"
      :key="index"
      class="learn-curriculum__info">
      <div class="learn-curriculum-info__block">
        <div>
          <span style="float:right;">{{ item.block_status_name }}</span>
          <span>课程名称：{{ item.curriculum_name }}</span>
        </div>
        <div>教学内容：{{ item.name }}</div>
        <div>上课时间：
          <span v-if="item.start_time && item.end_time">
            {{ item.start_time | getTime }} - {{ item.end_time | getTime }}
          </span>
        </div>
      </div>

      <div
        v-if="item.performance.legth > 0"
        class="learn-curriculum-info__performance">
        <div style="color:gray">课堂表现</div>
        <div
          v-for="itemPer in item.performance"
          :key="itemPer.name + itemPer.score_name">
          <span>{{ itemPer.name }}</span>
          <span style="float:right;">{{ itemPer.score_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.learn-curriculum{
  height: auto;
  background: #EDEDF2;
}
.learn-curriculum__block{
  padding: px2vw(20) 0;
}
.learn-curriculum .vux-no-group-title{
  margin-top: 0px;
  font-size: px2vw(32);
}
.learn-curriculum__team .weui-cells:after{
  border-bottom: none;
}
.learn-curriculum__inline{
  width: 100%;
  background: #FFFFFF;
  font-size: px2vw(32);
  height: px2vw(64);
  position: relative;
}
.learn-curriculum__inline>div{
  position: absolute;
  right: px2vw(20);
}
.learn-curriculum__inline span{
  display: inline-block;
  width: px2vw(15);
  height: px2vw(15);
  border-radius: 50%;
  position: relative;
  top: px2vw(-4);
  margin-left: px2vw(20);
}
.learn-curriculum-inline__firText{
  background: red;
}
.learn-curriculum-inline__secText{
  background: blue;
}
.learn-curriculum-inline__thiText{
  background: #69FFFE;
}
.learn-curriculum .inline-calendar td.current > span.vux-calendar-each-date{
  background: dodgerblue;
}
.learn-curriculum .inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled{
  color:dodgerblue;
}
.learn-curriculum .inline-calendar td > span.vux-calendar-each-date{
  width: px2vw(52);
  height: px2vw(52);
  line-height: px2vw(52);
}
.learn-curriculum .weui-cell_access .weui-cell__ft:after{
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
    right: px2vw(-5);
}
.learn-curriculum .inline-calendar,.learn-curriculum .vux-calendar-each-date{
  font-size: px2vw(32);
}

.learn-curriculum__info{
  margin: px2vw(10) 0;
  font-size: px2vw(32);
}
.learn-curriculum-info__block{
  background: #FFFFFF;
  margin-bottom: px2vw(10);
}
.learn-curriculum__info div,.learn-curriculum-info__performance div{
  padding: px2vw(10) px2vw(20);
}
.learn-curriculum-info__performance{
  background: #FFFFFF;
  padding: px2vw(10);
  font-size: px2vw(32);
}

//上课中  待上课  已上课 在日期中的显示样式
.dotBlock{
  height: px2vw(38);
  font-size: px2vw(24);
  text-align: center;
  display: inline-block;
}
.dotType{
  display: inline-block;
  width: px2vw(10);
  height: px2vw(10);
  border-radius: 50%;
  margin-left: px2vw(5);
}
</style>

