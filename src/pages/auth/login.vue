<template>
  <q-page padding>
    <div class="page">
      <div class="content">
        <q-card
          style="position:absolute;top:-5rem;width:100%;"
          class="no-shadow transparent"
        >
          <q-card-section style="text-align:center;">
            <span style="font-weight:bold;font-size:1.5rem;color:white;"
              >产品评审模块</span
            >
            <br />
            <small style="color:white;">
              coded by Lyb
              <span style="color:red">♥</span>
            </small>
          </q-card-section>
        </q-card>
        <q-card class="no-shadow">
          <form @submit.prevent.stop="login" @reset.prevent.stop="resetLogin">
            <q-card-section>
              <q-input
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                v-model.trim="user.account"
                class="q-mt-lg"
                label="用户名"
                lazy-rules
                :rules="[val => (val && val.length > 0) || '账号不能为空']"
                ref="account"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>
              <q-input
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                v-model.trim="user.password"
                label="密码"
                type="password"
                ref="password"
                class="q-mt-sm"
                lazy-rules
                :rules="[val => (val !== null && val !== '') || '密码不能为空']"
                @keyup.enter="login"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-textbox-password" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="重置" flat color="secondary" type="reset" />
              <q-btn
                label="登录"
                :loading="loading"
                color="primary"
                icon="mdi-login"
                type="submit"
              />
            </q-card-actions>
          </form>
        </q-card>
        <q-card
          style="position:absolute;bottom:-4rem;width:100%;"
          class="no-shadow transparent"
        >
          <q-card-section
            style="text-align:center;color:white;"
            @click="openURL('https://beian.miit.gov.cn')"
          >
            <small>博洋家纺信息中心</small>
            <br />
            <small>浙ICP备17039878号-4</small>
          </q-card-section>
        </q-card>
      </div>
      <div class="bg-boxes">
        <svg width="300px" height="100%" id="col1">
          <rect
            width="150px"
            height="150px"
            x="75px"
            y="75px"
            class="bubble"
            id="bub1"
          />
        </svg>
        <svg width="200px" height="100%" id="col2">
          <rect
            width="100px"
            height="100px"
            x="50px"
            y="50px"
            class="bubble"
            id="bub2"
          />
        </svg>
        <svg width="260px" height="100%" id="col3">
          <rect
            width="130px"
            height="130px"
            x="65px"
            y="65px"
            class="bubble"
            id="bub3"
          />
        </svg>
        <svg width="160px" height="100%" id="col4">
          <rect
            width="80px"
            height="80px"
            x="40px"
            y="40px"
            class="bubble"
            id="bub4"
          />
        </svg>
        <svg width="240px" height="100%" id="col5">
          <rect
            width="120px"
            height="120px"
            x="60px"
            y="60px"
            class="bubble"
            id="bub5"
          />
        </svg>
        <!--Here is a triangle-->
        <svg width="200px" height="100%" id="col6">
          <polygon points="50,150 100,50 150,150" class="bubble" id="bub6" />
        </svg>
        <svg width="200px" height="100%" id="col7">
          <rect
            width="100px"
            height="100px"
            x="50px"
            y="50px"
            class="bubble"
            id="bub7"
          />
        </svg>
        <svg width="200px" height="100%" id="col8">
          <rect
            width="100px"
            height="100px"
            x="50px"
            y="50px"
            class="bubble"
            id="bub8"
          />
        </svg>
        <svg width="200px" height="100%" id="col9">
          <rect
            width="100px"
            height="100px"
            x="50px"
            y="50px"
            class="bubble"
            id="bub9"
          />
        </svg>
        <svg width="200px" height="100%" id="col10">
          <rect
            width="100px"
            height="100px"
            x="50px"
            y="50px"
            class="bubble"
            id="bub10"
          />
        </svg>
        <svg width="100px" height="100%" id="col11">
          <rect
            width="50px"
            height="50px"
            x="25px"
            y="25px"
            class="bubble"
            id="bub11"
          />
        </svg>
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from "quasar";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      user: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    openURL,
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      });
    },
    resetLogin() {
      Object.assign(this.user, this.$options.data.call(this).user);
      this.$refs.account.resetValidation();
      this.$refs.password.resetValidation();
    },
    login() {
      this.$refs.account.validate();
      this.$refs.password.validate();
      if (!this.$refs.account.hasError & !this.$refs.password.hasError) {
        this.loading = true;
        this.$store
          .dispatch("user/Login", this.user)
          .then(response => {
            let data = response.data;
            this.$router.push("/index");
            this.loading = false;
            this.notify("positive", data.msg);
          })
          .catch(error => {
            this.loading = false;
          });
      }
    },
    onBackKeyDown() {
      this.$q
        .dialog({
          title: "警告",
          message: "确定要退出吗",
          ok: "确定",
          cancel: "我点错了"
        })
        .onOk(() => {
          navigator.app.exitApp();
        });
    }
  },
  created() {
    document.addEventListener("backbutton", this.onBackKeyDown, false);
  },
  mounted() {
    if (this.$q.platform.is.cordova) {
      navigator.splashscreen.hide();
    }
    //this.$refs.account.focus()
  },
  beforeDestroy() {
    //remove the event listener
    document.removeEventListener("backbutton", this.onBackKeyDown, false);
  }
};
</script>

<style lang="stylus" scoped>
.page
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #00b4db
  background linear-gradient(to bottom right, #00b4db 0%, #0083b0 100%)
  height 100vh /* Allow spacing based on window height */
  margin 0
  min-height 240px
  z-index 6000
/* The background from https://codepen.io/lotap/pen/yNYxRz */
/* The form part */
.content
  /* A box that the form resides in - centered vertically and horizontally based on the window. The max-width and % width combo allow it to resize for small devices */
  background #FFF
  border-radius 8px
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  display block
  left 50%
  max-width 360px
  position absolute
  top 50%
  -ms-transform translate(-50%, -50%)
  -webkit-transform translate(-50%, -50%)
  transform translate(-50%, -50%)
  width 90%
  z-index 2
/* The Background Part - Each svg element will act as a column that rises. Within each svg column will be a rect element that rotates. Due to an error FF regarding the transform-origin of objects in an svg, the transform-orgin must be explicitly given without percents */
.bg-boxes
  /* Set the container for the svg elements to take up the whole window and hide objects outside of the window */
  height 100%
  min-height 240px
  position absolute
  overflow hidden
  width 100%
  z-index 1
svg
  /* Set defaults for svg columns. Opacity set to 0 so the elements are invisible before the animation begins and will not show up on browsers without animation */
  -webkit-animation riser 20s infinite
  animation riser 20s infinite
  opacity 0
  overflow visible
  position absolute
.bubble
  /* Set the defaults for the "bubbles". transform-origin should always be the center-point of the object including blank-space within the svg. Since the object should be centered, this is equal to the width of the object. The default bubble is 100px by 100px in an svg object with a width of 200px */
  -webkit-animation rotator 20s linear infinite
  animation rotator 20s linear infinite
  fill #FFF
  -webkit-transform-origin 100px 100px
  transform-origin 100px 100px
#col1
  /* Since this element is larger than the set default, I want it to rise a little faster to give a subtle sense of depth */
  -webkit-animation-duration 15s
  animation-duration 15s
#bub1
  /* The transform-origin has to be redefined because this bubble is not the set default size */
  -webkit-transform-origin 150px 150px
  transform-origin 150px 150px
#col2
  /* To offset the columns, adjust their left attribute and add an animation-delay */
  left 15%
  -webkit-animation-delay 18s
  animation-delay 18s
#col3
  left 30%
  -webkit-animation-delay 14s
  animation-delay 14s
  -webkit-animation-duration 17s
  animation-duration 17s
#bub3
  -webkit-animation-delay 14s
  animation-delay 14s
  -webkit-transform-origin 130px 130px
  transform-origin 130px 130px
#col4
  left 45%
  -webkit-animation-delay 8s
  animation-delay 8s
  -webkit-animation-duration 22s
  animation-duration 22s
#bub4
  -webkit-animation-delay 8s
  animation-delay 8s
  -webkit-transform-origin 80px 80px
  transform-origin 80px 80px
#col5
  left 60%
  -webkit-animation-delay 15s
  animation-delay 15s
  -webkit-animation-duration 18s
  animation-duration 18s
#bub5
  -webkit-animation-delay 15s
  animation-delay 15s
  -webkit-transform-origin 120px 120px
  transform-origin 120px 120px
#col6
  left 75%
  -webkit-animation-delay 19s
  animation-delay 19s
#col7
  left 90%
  -webkit-animation-delay 4s
  animation-delay 4s
#col8
  left -5%
  -webkit-animation-delay 11s
  animation-delay 11s
#col9
  left 25%
  -webkit-animation-delay 5s
  animation-delay 5s
#col10
  left 50%
  -webkit-animation-delay 12s
  animation-delay 12s
#col11
  left 67%
  -webkit-animation-delay 1s
  animation-delay 1s
  -webkit-animation-duration 25s
  animation-duration 25s
#bub11
  -webkit-animation-delay 1s
  animation-delay 1s
  -webkit-transform-origin 50px 50px
  transform-origin 50px 50px
/* Rotation Animation - Should be set to a factor of 360 to prevent jumpiness */
@keyframes rotator
  to
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
@keyframes rotator
  to
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
@keyframes riser
  0%
    opacity 0.2
    -webkit-transform translateY(100%)
    transform translateY(100%)
  100%
    opacity 0.2
    -webkit-transform translateY(-250px)
    transform translateY(-250px)
@keyframes riser
  0%
    opacity 0.2
    -webkit-transform translateY(100%)
    transform translateY(100%)
  100%
    opacity 0.2
    -webkit-transform translateY(-250px)
    transform translateY(-250px)
</style>
