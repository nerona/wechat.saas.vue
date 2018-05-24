<script>
/**
 * @overview 学习中心 - 添加和编辑小孩
 *
 * @author suyanping
 */

import { XButton, Group, Cell, XInput, Datetime, PopupPicker, ChinaAddressData, XAddress } from 'vux';

export default {
  name: 'LearnKid',

  components: {
    XButton,
    Group,
    Cell,
    XInput,
    Datetime,
    PopupPicker,
    ChinaAddressData,
    XAddress,
  },

  data() {
    return {
      kidId: this.$route.params.id,

      formData: {
        name: '',
        gender: null,
        grade: null,
        school: '',
        birth_at: '',
        head_name: '',
        head_url: '',
        face_token: '',
      },

      formBefore: {
        gender: [],
        grade: [],
        school: [],
      },

      genderList: [],
      gradeList: [],


      gender: [],
      grade: [],
      addressData: ChinaAddressData,
      address: [],


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

    isSubmit() {
      const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]{0,10}$/;
      const isName = pattern.test(this.formData.name);
      if (!isName) {
        this.$vux.toast.text('姓名最多只能输入10个字符', 'middle');
      }

      return this.formData.head_url &&
      isName &&
      this.formData.birth_at &&
      this.formData.gender;
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
        })
        .catch(({ message }) => {
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
      this.$refs.inputImg.click();
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

    submit() {
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
    <div class="learn-kid__header">
      <group>
        <cell
          is-link
          title="上传头像"
          @click.native="uploadImg">
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
        ref="inputImg"
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
      <x-address
        v-model="address"
        :list="addressData"
        title="就读学校"
        placeholder="请选择"
        raw-value/>
      <popup-picker
        :data="gradeList"
        v-model="grade"
        title="选择年级"
        placeholder="请选择"
        @on-change="changeGrade"/>
      <div class="learn-kid-submit">
        <x-button
          :disabled="!isSubmit"
          type="primary"
          @click.native="submit">提交</x-button>
      </div>
    </div>
  </AppPage>
</template>

<style lang="less">
.learn-kid__header .weui-cells{
  margin-top: 10px;
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
  }
  .weui-cell:before,.vux-cell-box:not(:first-child):before{
    border-top: none;
  }
}
.learn-kid-submit {
  padding: 0 px2vw(40);
  margin-top: px2vw(40);
}
</style>
