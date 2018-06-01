<script>
/**
 * @overview 学习中心 - 添加和编辑小孩
 *
 * @author suyanping
 */

import { XButton, Group, Cell, XInput, Datetime, Picker, PopupPicker } from 'vux';

export default {
  name: 'LearnKid',

  components: {
    XButton,
    Group,
    Cell,
    XInput,
    Datetime,
    Picker,
    PopupPicker,
  },

  data() {
    return {
      chinaJSON: this.$assets.chinaJSON,

      kidId: this.$route.params.id,

      formData: {
        name: '',
        gender: null,
        grade: null,
        school: null,
        birth_at: '',
        head_name: '',
        head_url: '',
        face_token: '',
      },

      formBefore: {
        gender: [],
        grade: [],
      },
      initSchoolList: [],

      genderList: [],
      gradeList: [],
      schoolList: [{
        name: '无',
        value: -1,
      }],


      gender: [],
      grade: [],
      address: [],
      school: [],


      url: '/student/upload',
      heardName: 'head_url',

      routePage: '',

    };
  },

  computed: {

    // 完整接口
    action() {
      const productionURL = this.$http.apiRoot + this.url;

      return productionURL;
    },

  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let routePage = (from.matched.length > 0) ? from.path : '/learn/index';

      if (Object.keys(from.query).length > 0) {
        routePage += '?';
        Object.keys(from.query).forEach((item, index) => {
          if (index !== (Object.keys(from.query).length - 1)) {
            routePage = `${routePage + item}=${from.query[item]}&`;
          } else {
            routePage = `${routePage + item}=${from.query[item]}`;
          }
        });
      }
      vm.getBackPage(routePage);
    });
  },

  created() {
    if (this.kidId) {
      this.$vux.loading.show();
    }
    this.$http.get('/student/store_before')
    .then((res) => {
      this.formBefore = res;

      const gender = [];
      const grade = [];
      res.gender.forEach((item) => {
        gender.push(item.name);
      });
      res.grade.forEach((item) => {
        grade.push(item.name);
      });
      this.genderList.push(gender);
      this.gradeList.push(grade);
    }).then(() => {
      if (this.kidId) {
        this.$http.get(`/student/${this.kidId}`)
        .then((res) => {
          this.formData = {
            name: res.name,
            gender: res.gender,
            grade: res.grade,
            school: res.school,
            birth_at: res.birth_at,
            head_name: res.head_name,
            head_url: res.head_url,
            face_token: res.face_token,
          };
          this.gender.push(res.gender_name);
          if (res.grade_name) {
            this.grade.push(res.grade_name);
          }

          if (res.school && res.school !== '0') {
            this.$http.get(`/student/city/${res.school}`)
            .then((resData) => {
              if (resData.city_code) {
                this.address = [String(resData.province_code), String(resData.city_code)];
              } else {
                this.address = [String(resData.province_code), null];
              }
              this.changeAddress(this.address, res.school);
            })
            .catch(({ message }) => {
              this.$vux.toast.text(message, 'middle');
            });
          }

          this.$vux.loading.hide();
        })
        .catch(({ message }) => {
          this.$vux.loading.hide();
          this.$vux.toast.text(message, 'middle');
        });
      }
    });
  },

  methods: {
    getBackPage(url) {
      this.routePage = url;
    },

    uploadImg() {
      const input = document.getElementById('inputImg');
      input.click();
    },

    changeImg() {
      this.formData.head_url = '';
      this.formData.head_name = '';
      this.formData.face_token = '';

      const file = this.$refs.inputImg.files[0];
      const pattern = /^image\/(jpe?g|png|bmp|JPE?G|PNG|BMP)$/;
      const isPicture = pattern.test(file.type);
      const isLt2M = file.size / 1024 / 1024 <= 2;
      if (!isPicture) {
        this.$vux.toast.text('请上传jpg/png/bmp图片', 'middle');
      } else if (!isLt2M) {
        this.$vux.toast.text('图片不能超过2M', 'middle');
      } else {
        const formData = new FormData();
        formData.append(this.heardName, file);

        fetch(this.action, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        // eslint-disable-next-line
          .then((res) => {
            // 处理接口返回信息
            if (res.ok) {
              return res.json();
            }
            return res.json()
              .then((e) => {
                throw e;
              });
          })
          .then((res) => {
            this.$vux.toast.text('头像上传成功', 'middle');
            this.formData.head_url = res.head_url;
            this.formData.head_name = res.head_name;
            this.formData.face_token = res.face_token;
          })
          .catch(({ message }) => {
            this.$vux.toast.text(message, 'middle');
          });
      }
      this.$refs.inputImg.value = '';
    },

    changeGender(val) {
      if (val[0]) {
        const gender = this.formBefore.gender.find(item => item.name === val[0]);
        this.formData.gender = gender.value;
      }
    },
    changeGrade(val) {
      if (val[0]) {
        const grade = this.formBefore.grade.find(item => item.name === val[0]);
        this.formData.grade = grade.value;
      }
    },

    changeAddress(val, school) {
      this.formData.school = null;
      this.initSchoolList = [];
      this.schoolList = [{ name: '无', value: '-1' }];
      this.school = [];
      //eslint-disable-next-line
      let url;
      if (!val[1]) {
        url = `/student/school/${val[0]}`;
      } else {
        url = `/student/school/${val[0]}/${val[1]}`;
      }
      this.$http.get(url)
      .then((res) => {
        this.initSchoolList = res;
        if (res.length > 0) {
          this.schoolList = [];
          res.forEach((item) => {
            this.schoolList.push({ name: item.name, value: String(item.value) });
          });

          if (school) {
            this.school = [String(school)];
          }
        }
      })
      .catch(({ message }) => {
        this.$vux.toast.text(message, 'middle');
      });
    },

    changeSchool(val) {
      if (val.length === 0) {
        this.formData.school = null;
      } else if (val[0] === '-1') {
        this.formData.school = null;
      } else {
        this.formData.school = val[0] * 1;
      }
    },

    submit() {
      const pattern = /^[A-Za-z\u4e00-\u9fa5]{0,10}$/;
      const isName = pattern.test(this.formData.name);

      if (!this.formData.head_url) {
        this.$vux.toast.text('请上传头像', 'middle');
        return;
      }
      if (!this.formData.name) {
        this.$vux.toast.text('请输入小孩姓名', 'middle');
        return;
      }
      if (!isName) {
        this.$vux.toast.text('姓名最多只能输入10个汉字或者英文字母', 'middle');
        return;
      }
      if (!this.formData.birth_at) {
        this.$vux.toast.text('请选择出生年月', 'middle');
        return;
      }
      if (!this.formData.gender) {
        this.$vux.toast.text('请选择性别', 'middle');
        return;
      }
      if (this.address.length > 0 && this.school.length < 1) {
        this.$vux.toast.text('请选择学校', 'middle');
        return;
      }
      if (this.address.length > 0 && !this.formData.school) {
        this.$vux.toast.text('请选择一个有学校的地区在选择学校', 'middle');
        return;
      }

      if (this.kidId) {
        this.$http.patch(`/student/${this.kidId}`, this.formData)
        .then(() => {
          this.$vux.toast.text('修改小孩成功', 'middle');
          this.$router.push(this.routePage);
        })
        .catch(({ message }) => {
          this.$vux.toast.text(message, 'middle');
        });
      } else {
        this.$http.post('/student', this.formData)
        .then(() => {
          this.$vux.toast.text('添加小孩成功', 'middle');
          this.$router.push(this.routePage);
        })
        .catch(({ message }) => {
          this.$vux.toast.text(message, 'middle');
        });
      }
    },

  },
};
</script>

<template>
  <AppPage class="learn-kid">
    <div
      class="learn-kid__header"
      @click="uploadImg">
      <group>
        <cell
          is-link
          title="上传头像">
          <div>
            <img
              v-if="formData.head_url"
              :src="formData.head_url">
            <div
              v-else
              class="learn-kid-header__div"/>
          </div>
        </cell>
      </group>
      <input
        id="inputImg"
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/bmp"
        style="display:none;"
        @change="changeImg">
    </div>
    <div class="learn-kid__body">
      <x-input
        v-model="formData.name"
        :show-clear="false"
        title="小孩姓名"
        text-align="right"
        placeholder-align="right"
        placeholder="请输入小孩姓名"
        required/>
      <datetime
        v-model="formData.birth_at"
        title="出生年月"
        placeholder="请选择"/>
      <popup-picker
        :data="genderList"
        v-model="gender"
        title="性别"
        placeholder="请选择"
        @on-change="changeGender"/>
      <popup-picker
        v-model="address"
        :data="chinaJSON"
        :columns="2"
        :show-name="true"
        title="选择地区"
        placeholder="请选择"
        @on-change="changeAddress"/>
      <popup-picker
        v-model="school"
        :data="schoolList"
        :columns="1"
        :show-name="true"
        placeholder="请选择"
        title="选择学校"
        @on-change="changeSchool"/>
      <popup-picker
        :data="gradeList"
        v-model="grade"
        title="选择年级"
        placeholder="请选择"
        @on-change="changeGrade"/>
      <div class="learn-kid-submit">
        <x-button
          type="primary"
          @click.native="submit">提交</x-button>
      </div>
    </div>
  </AppPage>
</template>

<style lang="less">
.learn-kid__header .vux-label{
  font-size: px2vw(32);
}
.learn-kid__header .weui-cell_access .weui-cell__ft:after{
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
    right: px2vw(-4);
}
.learn-kid__header .weui-cells{
  margin-top: px2vw(20);
}
.learn-kid-header__div{
  display: inline-block;
  width: px2vw(100);
  height: px2vw(100);
  border-radius: 50%;
  background: darkgrey;
}
.learn-kid__header img{
  display: inline-block;
  width: px2vw(100);
  height: px2vw(100);
  border-radius: 50%;
}
.learn-kid__body{
  & .vux-x-input,.vux-datetime,.vux-cell-box {
    background: white;
    margin-top: px2vw(20);
    font-size: px2vw(32);
  }
  .weui-cell:before,.vux-cell-box:not(:first-child):before{
    border-top: none;
  }
  .weui-cell_access .weui-cell__ft:after{
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
    right: px2vw(-4);
  }
}
.learn-kid-submit {
  padding: 0 px2vw(40);
  margin-top: px2vw(40);
}
</style>
