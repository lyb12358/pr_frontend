<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <q-footer>
      <q-tabs inline-label>
        <q-route-tab
          icon="mdi-file-document-edit"
          :to="{ name: 'reviewing' , query: { rs: this.$route.query.rs }}"
          replace
          label="评审页"
        />
        <q-route-tab
          icon="mdi-database-search"
          :to="{ name: 'reviewResult' , query: { rs: this.$route.query.rs }}"
          replace
          label="看数据"
        />
        <q-btn icon="mdi-cart" @click="openCompareDialog" flat>
          去比较
          <q-badge color="red" floating>{{this.compareList.length}}</q-badge>
        </q-btn>
        <q-btn icon="mdi-logout" to="/index" flat replace label="退出评审" />
      </q-tabs>
    </q-footer>

    <q-dialog
      v-model="compareDialogOpened"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height:768px">
        <div class>
          <q-carousel
            swipeable
            animated
            v-model="xx"
            thumbnails
            infinite
            @input="changeImage"
            style="height:768px"
          >
            <q-carousel-slide
              v-for="(prod, index) in compareList"
              :key="index"
              :name="index"
              :img-src="api + '/image/' + prod.id + '/' + prod.thumbnail"
            />
          </q-carousel>
        </div>
      </q-card>
      <div class="q-pa-xs row items-start q-gutter-xs">
        <q-card class="col-12">
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="row col-3">
                <div class="text-bold">序号：</div>
                <div class>{{this.singleProd.orderId}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">名称：</div>
                <div class>{{this.singleProd.name}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">规格：</div>
                <div class>{{this.singleProd.speName}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">中类：</div>
                <div class>{{this.singleProd.middleTypeName}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">件数：</div>
                <div class>{{this.singleProd.numModel}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">供应价：</div>
                <div class>{{this.singleProd.supplyPrice}}</div>
              </div>
              <div class="row col-3">
                <div class="text-bold">零售价：</div>
                <div class>{{this.singleProd.retailPrice}}</div>
              </div>
              <div class="row col-3" :v-if="this.$store.getters['user/userInfo'].type!=2">
                <div class="text-bold">成本价：</div>
                <div class>{{this.singleProd.costPrice}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions align="right" class>
            <q-btn flat icon="mdi-delete" @click="deleteProd(singleProd.id)">从对比删除</q-btn>

            <q-btn icon="mdi-exit-run" flat v-close-popup>离开对比</q-btn>
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
      api: process.env.API,
      xx: 0,
      compareDialogOpened: false
    }
  },
  computed: {
    compareList() {
      return this.$store.getters['user/compareProdList']
    },
    singleProd() {
      if (this.compareList.length > 0) {
        //console.log(this.compareList[yy])
        return this.compareList[this.xx]
      } else {
        return {}
      }
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
      if (this.compareList.length == 0) {
        this.notify('warning', '对比列表为空，请先把想对比的产品加入列表')
        return
      }
      this.compareDialogOpened = true
      //this.$q.fullscreen.request()
    },
    changeImage(val) {},
    deleteProd(id) {
      this.$store.commit('user/ReduceCompareProdList', id)
    }
  },
  mounted() {}
}
</script>
