<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title style="font-weight:bold">
          {{$route.meta.title}}
          <!-- <div slot="subtitle">IT Center</div> -->
        </q-toolbar-title>
        <q-btn flat label="退出" @click="logout()" icon="mdi-logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      :breakpoint="1000"
      show-if-above
      v-if="isSuper"
      bordered
      content-class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable v-ripple :to="menuItem.navi" exact>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        @leave="resetScroll"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
const menuList = [
  {
    icon: 'mdi-home',
    label: '主页',
    navi: '/index',
    separator: true
  },
  {
    icon: 'mdi-account-group',
    label: '用户管理',
    navi: '/user',
    separator: false
  },
  {
    icon: 'mdi-account-details',
    label: '角色管理',
    navi: '/role',
    separator: true
  },
  {
    icon: 'mdi-file-document-edit',
    label: '评审会管理',
    navi: '/reviewManage',
    separator: false
  },
  {
    icon: 'mdi-bed-empty',
    label: '产品管理',
    navi: '/productManage',
    separator: true
  },
  {
    icon: 'mdi-database-search',
    label: '数据统计',
    navi: '/reviewData',
    separator: false
  }
]
export default {
  name: 'mainLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menuList
    }
  },
  computed: {
    roleType() {
      return this.$store.getters['user/userInfo'].type != 2
    },
    isSuper() {
      return (
        this.$store.getters['user/userInfo'].id == 1 ||
        this.$store.getters['user/userInfo'].id == 2
      )
    }
  },
  methods: {
    openURL,
    checkAuth(auth) {
      if (
        this.permissions.indexOf(1) > -1 ||
        this.permissions.indexOf(2) > -1
      ) {
        return true
      }
      if (this.permissions.indexOf(auth) > -1) {
        return true
      } else {
        return false
      }
    },
    logout() {
      this.$q
        .dialog({
          title: '退出登录',
          message: '你确定要退出登录吗？',
          ok: '确定',
          cancel: '取消'
        })
        .onOk(() => {
          this.$store.dispatch('user/FedLogout').then(() => {
            this.$router.push('/auth/login')
            this.notify('warning', '已登出')
          })
        })
    },
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    resetScroll(el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  }
}
</script>

<style>
</style>
