<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-4"
           v-for="(prod, index) in prodList"
           :key="index">
        <q-card class="my-card">
          <q-img src="/assets/cstp.png"
                 @click="openProdDetailDialog">
            <div class="absolute-bottom row items-center no-wrap"
                 style="height:40px">
              <div class="col text-subtitle2">
                {{"序号:"+prod.order+" "+prod.name}}
              </div>

            </div>

          </q-img>
          <q-card-actions align="right"
                          class="">
            <q-option-group v-model="prod.result"
                            dense
                            :options="reviewOptions"
                            color="primary"
                            inline />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="prodDetailOpened"
              persistent
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <q-card style="background:url(/statics/cstp.png) no-repeat;height:768px">
        <q-card-section class="row items-center">
          <!-- <q-space /> -->
          <q-btn icon="close"
                 flat
                 round
                 dense
                 v-close-popup />
        </q-card-section>
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
          <q-card-section>
            <q-input v-model="yy"
                     filled
                     style="max-height:10px"
                     type="textarea" />
          </q-card-section>
          <q-separator inset />
          <q-card-actions align="right"
                          class="">

            <q-option-group v-model="xx"
                            :options="reviewOptions"
                            color="primary"
                            inline />
            <q-space />
            <q-btn color="orange"
                   icon="mdi-cart"
                   @click="notify('positive','已加入对比栏')">加入对比
            </q-btn>
            <q-btn icon="mdi-upload"
                   color="info"
                   @click="openOpinionDialog">查看评论</q-btn>
            <q-btn icon="mdi-upload"
                   color="primary"
                   v-close-popup
                   @click="notify('positive','已提交结果')">提交结果</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <q-dialog v-model="prodOpinionOpened"
              transition-show="scale"
              transition-hide="scale">
      <q-card class=""
              style="width: 500px">
        <q-card-section>
          <div class="text-h6">产品评论</div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 500px">
              <q-chat-message name="张三"
                              :text="['这产品很好，我很喜欢。']"
                              bg-color="light-green"
                              sent />
              <q-chat-message name="李四"
                              bg-color="light-green"
                              :text="['产品不错，可惜不符合我的审美~']" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right"
                        class="bg-white text-teal">
          <q-btn flat
                 label="关闭"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const prodList = [
  {
    name: '静净白鹅绒春被',
    order: 1,
    result: 1
  },
  {
    name: '静净白鹅绒夏被',
    order: 2,
    result: 2
  },
  {
    name: '静净白鹅绒秋被',
    order: 3,
    result: 2
  },
  {
    name: '静净白鹅绒冬被',
    order: 4,
    result: 3
  },
  {
    name: '静净白鹅绒春夏被',
    order: 5,
    result: 3
  },
  {
    name: '静净白鹅绒春秋被',
    order: 6,
    result: 2
  },
  {
    name: '静净白鹅绒秋冬被',
    order: 7,
    result: 1
  },
  {
    name: '静净白鹅绒XX被',
    order: 8,
    result: 1
  },
  {
    name: '静净白鹅绒YY被',
    order: 9,
    result: 2
  },
  {
    name: '静净白鹅绒ZZ被',
    order: 10,
    result: 3
  }
]
export default {
  data() {
    return {
      xx: 1,
      yy: '我对产品的评论',
      prodDetailOpened: false,
      prodOpinionOpened: false,
      prodDetail: {
        name: '',
        image: '',
        costPrice: ''
      },
      prodList,
      reviewOptions: [
        {
          label: '通过',
          value: 1
        },
        {
          label: '淘汰',
          value: 2
        },
        {
          label: '待定',
          value: 3
        }
      ]
    }
  },
  methods: {
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    openProdDetailDialog() {
      this.prodDetailOpened = true
    },
    openOpinionDialog() {
      this.prodOpinionOpened = true
    }
  },
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
</style>
