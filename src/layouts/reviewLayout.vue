<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <q-footer>
      <q-tabs inline-label>
        <q-route-tab icon="mdi-file-document-edit"
                     to="/review/reviewing"
                     replace
                     label="评审页" />
        <q-route-tab icon="mdi-database-search"
                     to="/review/reviewResult"
                     replace
                     label="看数据" />
        <q-btn icon="mdi-cart"
               @click="openCompareDialog"
               flat>去比较
          <q-badge color="red"
                   floating>3</q-badge>

        </q-btn>
        <q-btn icon="mdi-upload"
               @click="notify('positive','已提交结果')"
               flat>提交结果</q-btn>
        <q-btn icon="mdi-logout"
               to="/index"
               flat
               replace
               label="退出评审" />
      </q-tabs>

    </q-footer>

    <q-dialog v-model="compareDialogOpened"
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <q-card style="max-height:768px">
        <div class="">
          <q-carousel swipeable
                      animated
                      v-model="xx"
                      thumbnails
                      infinite
                      @input="changeImage"
                      style="height:768px">
            <q-carousel-slide :name="1"
                              img-src="/statics/cstp.png" />
            <q-carousel-slide :name="2"
                              img-src="/statics/cstp2.png" />
            <q-carousel-slide :name="3"
                              img-src="/statics/cstp3.png" />
            <q-carousel-slide :name="4"
                              img-src="/statics/cstp4.png" />
          </q-carousel>
        </div>
      </q-card>
      <div class="q-pa-xs row items-start q-gutter-xs">
        <q-card class="col-12">
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="row col-3">
                <div class="text-bold">序号：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">名称：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">规格：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">中类：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">件数：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">供应价：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">零售价：</div>
                <div class="">1</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">成本价：</div>
                <div class="">1</div>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions align="right"
                          class="">
            <q-btn flat
                   icon="mdi-delete"
                   @click="notify('positive','已从对比列表删除')">从对比删除
            </q-btn>

            <q-btn icon="mdi-exit-run"
                   flat
                   v-close-popup>离开对比</q-btn>
          </q-card-actions>
        </q-card>

      </div>
    </q-dialog>

    <q-page-container>
      <keep-alive include="reviewing">
        <router-view></router-view>
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      xx: 1,
      compareDialogOpened: false
    }
  },
  methods: {
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    openCompareDialog() {
      this.compareDialogOpened = true
      this.$q.fullscreen.request()
    },
    changeImage(val) {
      console.log(val)
    }
  },
  mounted() {
    this.$q.fullscreen.request()
  }
}
</script>
