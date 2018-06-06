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
          id: 'xm',
          link: '#xm',
          name: '厦门',
          area: [
            {
              name: '思明区地点',
              school: [
                {
                  name: '五缘湾旗舰校区',
                  location: '厦门市湖里区五缘尊府2号楼201～205',
                  prefix: '0592',
                  tel: '5025315',
                  phone: 'tel:0592-5025315',
                },
              ],
            },
          ],
        }, {
          id: 'other',
          link: '#other',
          name: '其他地区',
        }],

        areaCity: [
          {
            id: 'xm',
            link: '#xm',
            name: '厦门',
            area: [
              {
                address: '思明区地点',
                school: [
                  {
                    name: '疯狂龙博士',
                    location: '厦门市思明区湖滨南路787号',
                    phone: '15960215498',
                  },
                  {
                    name: '助成教育',
                    location: '厦门市思明区万寿路68号商洲文体中心3楼301号',
                    phone: '18850573774',
                  },
                  {
                    name: '奥斯达托管补习中心',
                    location: '厦门市思明区公园南路13号玉滨城7层',
                    phone: '15359023283',
                  },
                  {
                    name: '百年树人',
                    location: '厦门市思明区体育路38号华强企业大楼3层',
                    phone: '0592-5031010',
                  },
                  {
                    name: '彩虹蜗牛',
                    location: '厦门市思明区侨岳里路79号-101号、102号、103号',
                    phone: '15880205966',
                  },
                  {
                    name: '心超越瑞景校区',
                    location: '思明区洪文一里133号103',
                    phone: '13313853339',
                  },
                  {
                    name: '心超越民立校区',
                    location: '思明区仙岳路里78号111室',
                    phone: '15860724160',
                  },
                  {
                    name: '心超越莲花校区',
                    location: '思明区莲花南路冶金大夏3楼',
                    phone: '15606090010',
                  },
                  {
                    name: '心超越松柏校区',
                    location: '思明区连岳路188号松柏永乐中心2楼 ',
                    phone: '18606090010',
                  },
                  {
                    name: '心超越海峡国际校区',
                    location: '思明区会展北里48号101 ',
                    phone: '18020739915',
                  },
                ],
              },
              {
                address: '湖里区地点',
                school: [
                  {
                    name: '心超越开心优悦校区',
                    location: '湖里区华嘉路22~26 ',
                    phone: '',
                  },
                  {
                    name: '天天艾学',
                    location: '湖里区五缘西三里源昌鑫海湾140号1101',
                    phone: '13306050790',
                  },
                  {
                    name: '尚学趣',
                    location: '厦门市湖里区凯诚花园565#302',
                    phone: '15260178530',
                  },
                  {
                    name: '爱考拉',
                    location: '厦门市湖里区五缘尊府B座2楼201-205号',
                    phone: '16605923911',
                  },
                  {
                    name: '百年树人',
                    location: '厦门市湖里区金湖路43-45号金湖大厦701室',
                    phone: '0592-2575156',
                  },
                  {
                    name: '心超越湖里校区',
                    location: '厦门市湖里区梧桐里御之苑68号',
                    phone: '15259224544',
                  },
                  {
                    name: '心超越蔡塘校区',
                    location: '湖里区蔡塘路博艺公寓2楼',
                    phone: '15159299563',
                  },
                ],
              },
              {
                address: '集美区地点',
                school: [
                  {
                    name: '心超越中航城校区',
                    location: '集美区杏林湾路园博二里104',
                    phone: '13275002188',
                  },
                  {
                    name: '心超越曾营校区',
                    location: '杏林区月美路403号',
                    phone: '15159578765',
                  },
                  {
                    name: '光合教育',
                    location: '集美区银江路132号星空下艺术文化中心',
                    phone: '19906058872',
                  },
                ],
              },
              {
                address: '海沧区地点',
                school: [
                  {
                    name: '晓课堂',
                    location: '天心岛校区（天心岛校区5号楼1107）',
                    phone: '18030038639',
                  },
                  {
                    name: '晓课堂',
                    location: '外附校区（兴港花园一期17栋186梯101）',
                    phone: '18030038639',
                  },
                  {
                    name: '晓课堂',
                    location: '北附校区（蓝月湾二期8号楼801）',
                    phone: '18030038639',
                  },
                  {
                    name: '晓课堂',
                    location: '延奎校区（沧二小区8号楼78号101）',
                    phone: '18030038639',
                  },
                ],
              },
              {
                address: '翔安区地点',
                school: [
                  {
                    name: '春苗教育',
                    location: '厦门市翔安区东方新城祥福二里29号201室',
                    phone: '18064414303',
                  },
                ],
              },
            ],
          },
          {
            id: 'other',
            link: '#other',
            name: '其他地区',
            area: [],
          },
        ],
      };
    },
    methods: {
      // 经纬度
      openMap() {

      },
    },
  };
</script>
<template>
  <div
    id="class"
    class="learn-index-class">
    <!-- <div class="learn-index-board__title">
      <span>上课时间</span>
    </div> -->
    <!-- <div class="learn-index-class__range">{{ range }}</div> -->
    <!-- <div class="learn-index-board__title">
      <span>上课地点</span>
    </div> -->
    <!-- <div class="learn-index-class__area">
      <a
        v-for="(item,index) in citys"
        :key="index"
        :href="item.link"
      >{{ item.name }}</a>
    </div> -->

    <!-- <div class="learn-index-class__citys">
      <div
        v-for="item in citys"
        :key="item.id"
      >
        <div
          :id="item.id"
          class="learn-index-class-citys__name">
          {{ item.name }}
        </div>
        <div
          v-for="innerItem in item.area"
          :key="innerItem.name">
          <div class="learn-index-class-citys__disname">
            <span>{{ innerItem.name }}</span>
          </div>
          <div
            v-for="school in innerItem.school"
            :key="school.name"
            class="learn-index-class-citys__school">
            <div class="learn-index-class-citys-school__name">{{ school.name }}</div>
            <div
              class="learn-index-class-citys-school__item"
              @click="openMap(school.location)">
              <div class="learn-index-class-citys-school-item_1">
                地址: {{ school.location }}
              </div>
              <div class="learn-index-class-citys-school-item_2">
                <img src="./../../../assets/activity/learn/l1.png">
              </div>
            </div>
            <a
              :href="school.phone"
              class="learn-index-class-citys-school__item">
              <div class="learn-index-class-citys-school-item_1">
                电话: ({{ school.prefix }}) {{ school.tel }}
              </div>
              <div class="learn-index-class-citys-school-item_2">
                <img src="./../../../assets/activity/learn/l4.png">
              </div>
            </a>
          </div>
        </div>
      </div> -->

    <!--  -->
    <!-- <div class="learn-index-class-citys_other">
        莆田、泉州、漳州、龙岩、三明、南平、宁德等地区正在筹备中，敬请期待！
      </div>
    </div> -->
    <div class="learn-index-class__title">
      <span>上课地点</span>
    </div>
    <div
      v-for="item in areaCity"
      :key="item.id"
      class="learn-index-class__areas">
      <p>{{ item.name }}</p>
      <div
        v-if="item.area.length > 0">
        <div
          v-for="area in item.area"
          :key="area.address"
          class="learn-index-class__address">
          <p class="learn-index-class__text1">
            <span>{{ area.address }}</span>
          </p>
          <div
            v-for="school in area.school"
            :key="school.location"
            class="learn-index-class__school">
            <p class="learn-index-class__text2">{{ school.name }}</p>
            <p
              class="learn-index-class__text3"
              @click="openMap(school.location)">
              <img src="./../../../assets/activity/learn/icon_location.png">
              <span>{{ school.location }}</span>
            </p>
            <p
              v-if="school.phone"
              class="learn-index-class__text3">
              <a :href="'tel:' + school.phone">
                <img src="./../../../assets/activity/learn/icon_tel.png">
                <span>{{ school.phone }}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="learn-index-class__other_areas">
          福州、莆田、泉州、漳州、龙岩、三明、南平、宁德等地区正在筹备中，敬请期待！
        </div>
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
    /* background-color: #f39800; */
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
 color: #666;
 -webkit-touch-callout: default;
}
.learn-index-class-citys-school-item_1 {
  flex: 1;
}
.learn-index-class-citys-school-item_2 {
  position: relative;
  width: px2vw(36);
  height: px2vw(36);
  margin-left: px2vw(20);
  // a {
  //   -webkit-touch-callout: default;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // }
  img {
    width: px2vw(36);
    height: px2vw(36);
  }
}


.learn-index-class-citys_other {
  font-size: px2vw(30);
  color: #f39800;
  font-weight: bold;
}

.learn-index-class__title{
  font-size: px2vw(50);
  text-align: center;
  padding-top: px2vw(50);
  color: black;
  margin-bottom: px2vw(40);
}
.learn-index-class__areas{
  margin-bottom: px2vw(30);
  margin-right: px2vw(50);
}
.learn-index-class__areas>p{
  color: black;
  width: px2vw(250);
  background: #ffd900;
  text-align: center;
  border-top-right-radius: px2vw(30);
  border-bottom-right-radius: px2vw(30);
  font-size: px2vw(40);
}
.learn-index-class__address{
  margin-left: px2vw(50);
  margin-top: px2vw(30);
}
.learn-index-class__text1 span{
  color: black;
  font-size: px2vw(40);
  border-bottom: px2vw(1) solid black;
  padding-bottom: px2vw(10);
}
.learn-index-class__text2{
  font-size: px2vw(35);
}
.learn-index-class__text3{
  font-size: px2vw(32);
}
.learn-index-class__text3 a{
  color: #8B8B8B;
}
.learn-index-class__text3 img{
  display: inline-block;
  width: px2vw(30);
  position: relative;
  top: px2vw(7);
  margin-right: px2vw(10);
}
.learn-index-class__school{
  margin-top: px2vw(20);
}
.learn-index-class__other_areas{
  font-size: px2vw(34);
  color: black;
  margin-left: px2vw(50);
  margin-top: px2vw(30);
}
</style>
