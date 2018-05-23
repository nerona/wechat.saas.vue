<script>
/**
 * @overview 课程表
 *
 * @author suyanping
 */

import { Datetime, PopupPicker, Group, InlineCalendar } from 'vux';

export default {
  name: 'LearnCurriculum',
  components: {
    Datetime,
    PopupPicker,
    Group,
    InlineCalendar,
  },

  data() {
    return {
      currList: [['全部', '小学英语', '自然拼读']],
      currVal: ['全部'],

      show: true,
      value: 'TODAY',
      listValue: '',
      useCustomFn: false,
      buildSlotFn: (line, index, data) => this.changeDate(line, index, data),
      replaceTextList: { TODAY: '今' },
      dateTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    };
  },
  watch: {
  },

  methods: {
    changeCurr() {
      // console.log(val);
    },
    onChange() {
      // console.log('on-change', val);
    },
    onViewChange() {
      // console.log('on view change', val, count);
    },
    changeTime(val) {
      // console.log(val);
      const dateArr = val.split('-');
      this.$refs.calendar.switchViewToMonth(dateArr[0] * 1, dateArr[1] * 1);
    },
    changeDate(line, index, data) {
      let strHtml = '';
      if (/8/.test(data.date)) {
        strHtml = '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>';
      } else if (/5/.test(data.date)) {
        strHtml = '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:gray;border-radius:50%;"></span></div>';
      } else if (/6/.test(data.date)) {
        strHtml = '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:orange;border-radius:50%;"></span></div>';
      } else if (/9/.test(data.date)) {
        strHtml = '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:blue;border-radius:50%;"></span></div>';
      } else {
        strHtml = '<div style="height:19px;"></div>';
      }
      return strHtml;
    },
  },
};
</script>

<template>
  <div class="learn-curriculum">
    <div class="learn-curriculum__div">
      <group>
        <popup-picker
          :data="currList"
          v-model="currVal"
          title="课程"
          @on-change="changeCurr"/>
      </group>
    </div>
    <div>
      <group class="learn-curriculum__group">
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
        class="learn-curriculum__calendar"
        @on-change="onChange"
        @on-view-change="onViewChange"/>
      <div class="learn-curriculum__inline">
        <div>
          <span class="learn-curriculum-inline__span learn-curriculum-inline__red"/>&nbsp;缺勤
          <span class="learn-curriculum-inline__span learn-curriculum-inline__orange"/>&nbsp;已评价
          <span class="learn-curriculum-inline__span learn-curriculum-inline__blue"/>&nbsp;已上课
          <span class="learn-curriculum-inline__span learn-curriculum-inline__gray"/>&nbsp;待上课
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.learn-curriculum__div{
  padding: px2vw(20) 0;
}
.learn-curriculum .vux-no-group-title{
  margin-top: 0px;
}
.learn-curriculum__group .weui-cells:after{
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
.learn-curriculum-inline__span{
  display: inline-block;
  width: px2vw(15);
  height: px2vw(15);
  border-radius: 50%;
  position: relative;
  top: px2vw(-4);
  margin-left: px2vw(20);
}
.learn-curriculum-inline__red{
  background: red;
}
.learn-curriculum-inline__orange{
  background: orange;
}
.learn-curriculum-inline__blue{
  background: blue;
}
.learn-curriculum-inline__gray{
  background: gray;
}
.learn-curriculum .inline-calendar td.current > span.vux-calendar-each-date{
  background: dodgerblue;
}
.learn-curriculum .inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled{
  color:dodgerblue;
}
</style>

