<template>
  <q-page padding>
    <div class="row q-col-gutter-md" style="margin-bottom:10px">
      <div class="col-2">总数：{{zs}}</div>
      <div class="col-2">已评：{{yp}}</div>
      <div class="col-2">未评：{{wp}}</div>
      <div class="col-2">通过：{{tg}}</div>
      <div class="col-2">淘汰：{{tt}}</div>
      <div class="col-2">待定：{{dd}}</div>
    </div>
    <div class="row q-col-gutter-md" style="margin-bottom:10px">
      <q-space />
      <div class="col-2">
        <q-btn label="提交结果" color="primary" @click="uploadAllResult()" />
      </div>
      <div class="col-2">
        <q-input dense class="no-padding" clearable color="primary" v-model="searchId" label="搜索" />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(prod, index) in prodList" :key="index">
        <q-card class="my-card" v-if="searchId==''||(index+1)==searchId">
          <q-img
            :src="api + '/image/' + prod.id + '/' + prod.thumbnail"
            @click="openProdDetailDialog(index,prod)"
          >
            <div class="absolute-bottom row items-center no-wrap" style="height:40px">
              <div class="col text-subtitle2">{{"序号:"+(index+1)+" "+prod.name}}</div>
            </div>
          </q-img>
          <q-card-actions align="right" class>
            <q-btn-group>
              <q-btn
                dense
                label="通过"
                :color="getResultByProdId(prod.id)==1?'blue':'white'"
                :text-color="getResultByProdId(prod.id)==1?'white':'black'"
                @click="changeResult(1,prod.id)"
              />
              <q-btn
                dense
                label="淘汰"
                :color="getResultByProdId(prod.id)==2?'red':'white'"
                :text-color="getResultByProdId(prod.id)==2?'white':'black'"
                @click="changeResult(2,prod.id)"
              />
              <q-btn
                dense
                label="待定"
                :color="getResultByProdId(prod.id)==3?'orange':'white'"
                :text-color="getResultByProdId(prod.id)==3?'white':'black'"
                @click="changeResult(3,prod.id)"
              />
            </q-btn-group>
            <!-- {{getResultByProdId(prod.id)}} -->
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog
      v-model="prodDetailOpened"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="singleProdStyle()">
        <q-card-section class="row items-center">
          <!-- <q-space /> -->
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
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
            <q-btn-group>
              <q-btn
                label="通过"
                :color="getResultByProdId(singleProd.id)==1?'blue':'white'"
                :text-color="getResultByProdId(singleProd.id)==1?'white':'black'"
                @click="changeResult(1,singleProd.id)"
              />
              <q-btn
                label="淘汰"
                :color="getResultByProdId(singleProd.id)==2?'red':'white'"
                :text-color="getResultByProdId(singleProd.id)==2?'white':'black'"
                @click="changeResult(2,singleProd.id)"
              />
              <q-btn
                label="待定"
                :color="getResultByProdId(singleProd.id)==3?'orange':'white'"
                :text-color="getResultByProdId(singleProd.id)==3?'white':'black'"
                @click="changeResult(3,singleProd.id)"
              />
            </q-btn-group>
            <q-space />
            <q-btn flat label="关闭" v-close-popup />
            <q-btn color="orange" icon="mdi-cart" @click="joinCompare(singleProd)">加入对比</q-btn>
            <q-btn icon="mdi-message-bulleted" color="info" @click="openOpinionDialog">产品评论</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <q-dialog
      v-model="prodOpinionOpened"
      transition-show="scale"
      transition-hide="scale"
      persistent
    >
      <q-card class style="width: 500px">
        <q-card-section>
          <div class="text-h6">产品评论</div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md row">
            <div class="col-12" style="width: 100%; max-width: 600px">
              <q-chat-message
                v-for="(comment, index) in commentList"
                :key="index"
                :name="getName(comment.userId)"
                :text="[comment.comment]"
                bg-color="light-green"
                :sent="comment.userId==userId"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="关闭" v-close-popup />
          <q-btn color="primary" label="我要点评" @click="openMyComment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- param dialog -->
    <q-dialog v-model="commentDialogOpened" persistent>
      <q-card style="width: 400px; max-width: 80vw;">
        <q-form
          @submit="submitCommentDialog"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-card-section>
            <div class="text-h6">我的评论</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-input
              class="col-12"
              outlined
              type="textarea"
              v-model.trim="mySingleResult.comment"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '评论不能为空']"
              ref="comment"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-message-bulleted" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="submit" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { getProductByReviewSeasonId } from 'src/api/productManage'
import {
  getReviewResultByUserId,
  getReviewResultByProdId,
  getReviewResultByUserIdAndProdId,
  getReviewResultBySeasonId,
  getReviewResultBySeasonIdAndUserId,
  getReviewResultBySeasonIdAndProdId,
  addReviewResult,
  addResultComment,
  getUserReviewStatus
} from 'src/api/reviewManage'
import {
  getUserList,
  updatePassword,
  addUser,
  getUserById
} from 'src/api/userManage'
export default {
  data() {
    return {
      commentDialogOpened: false,
      isReview: true,
      api: process.env.API,
      prodDetailOpened: false,
      prodOpinionOpened: false,
      prodDetail: {
        name: '',
        image: '',
        costPrice: ''
      },
      allResultList: [],
      userResultList: [],
      checkProdList: [],
      prodList: [],
      prodId: '',
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
      ],
      searchId: '',
      singleProd: {},
      detailIndex: '',
      commentList: [],
      form: {
        page: 1,
        row: 1000
      },
      userList: [],
      mySingleResult: {
        userId: '',
        seasonId: '',
        prodId: '',
        comment: ''
      },
      compareProdList: []
    }
  },
  computed: {
    userId() {
      return this.$store.getters['user/userInfo'].id
    },
    zs() {
      return this.userResultList.length
    },
    yp() {
      let x = 0
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].status != 4) {
          x++
        }
      }
      return x
    },
    wp() {
      return this.zs - this.yp
    },
    tg() {
      let x = 0
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].status == 1) {
          x++
        }
      }
      return x
    },
    dd() {
      let x = 0
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].status == 3) {
          x++
        }
      }
      return x
    },
    tt() {
      let x = 0
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].status == 2) {
          x++
        }
      }
      return x
    }
  },
  methods: {
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    openProdDetailDialog(index, prod) {
      this.singleProd = prod
      this.detailIndex = index
      this.prodDetailOpened = true
    },
    openOpinionDialog() {
      this.getComment()
      this.prodOpinionOpened = true
    },
    //fetch  result
    getAllReviewResult() {
      getReviewResultBySeasonId(parseInt(this.$route.query.rs))
        .then(response => {
          let data = response.data.data
          this.allResultList = data
        })
        .catch(error => {})
    },
    getUserAllResult(id) {
      getReviewResultBySeasonIdAndUserId(parseInt(this.$route.query.rs), id)
        .then(response => {
          let data = response.data.data
          this.userResultList = data
        })
        .catch(error => {})
    },
    getAllProduct() {
      getProductByReviewSeasonId(parseInt(this.$route.query.rs))
        .then(response => {
          let data = response.data.data
          this.prodList = data
        })
        .catch(error => {})
    },
    //filter
    getResultByProdId(id) {
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].prodId == id) {
          return this.userResultList[i].status
        }
      }
    },
    changeResult(value, id) {
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].prodId == id) {
          let xx = this.userResultList[i]
          xx.status = value
          this.userResultList.splice(i, 1, xx)
          //Vue.set(this.userResultList, i, this.userResultList[i])
        }
      }
    },
    uploadAllResult() {
      if (this.wp > 0) {
        this.notify(
          'warning',
          '还有' + this.wp + '款产品未评，请全部完成再提交'
        )
        return
      }
      if (this.isReview) {
        this.notify('warning', '您已完成评审，无法重复提交')
        return
      }
      addReviewResult(this.userResultList)
        .then(response => {
          this.notify('positive', '提交成功')
          //this.getUserAllResult(this.userId)
          this.isReview = true
        })
        .catch(error => {})
    },
    checkUserStatus() {
      getUserReviewStatus(parseInt(this.$route.query.rs), this.userId)
        .then(response => {
          this.isReview = response.data.data
        })
        .catch(error => {})
    },
    singleProdStyle() {
      return {
        background:
          'url(' +
          this.api +
          '/image/' +
          this.singleProd.id +
          '/' +
          this.singleProd.thumbnail +
          ') no-repeat',
        height: '768px'
      }
    },
    getComment() {
      this.commentList = []
      getReviewResultBySeasonIdAndProdId(
        parseInt(this.$route.query.rs),
        this.singleProd.id
      )
        .then(response => {
          let data = response.data.data
          for (let i = 0; i < data.length; i++) {
            if (null != data[i].comment && '' != data[i].comment) {
              this.commentList.push(data[i])
            }
          }
        })
        .catch(error => {})
    },
    getAllUser() {
      getUserList(this.form)
        .then(response => {
          let data = response.data.data
          this.userList = data.rows
        })
        .catch(error => {})
    },
    getName(id) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id == id) {
          return this.userList[i].name
        }
      }
    },
    openMyComment() {
      this.commentDialogOpened = true
    },
    submitCommentDialog() {
      this.mySingleResult.userId = this.userId
      this.mySingleResult.prodId = this.singleProd.id
      this.mySingleResult.seasonId = parseInt(this.$route.query.rs)
      addResultComment(this.mySingleResult)
        .then(response => {
          this.notify('positive', '点评成功')
          this.getComment()
          this.commentDialogOpened = false
        })
        .catch(error => {})
    },
    joinCompare(prod) {
      console.log(this.$store.getters['user/compareProdList'])
      this.$store.commit('user/AddCompareProdList', prod)
      this.notify('positive', '已加入对比')
      // console.log(prod)
      // for (let i = 0; i < this.compareProdList.length; i++) {
      //   console.log(i)
      //   console.log(this.compareProdList[i])
      //   if (this.compareProdList[i].id == prod.id) {
      //     console.log(i)
      //     return
      //   }
      // }
      // this.compareProdList.push(prod)
      // console.log(this.compareProdList)
    }
  },
  created() {
    //this.getAllReviewResult()
    this.getAllProduct()
  },
  mounted() {
    this.getUserAllResult(this.userId)
    this.checkUserStatus()
    this.getAllUser()
    this.$store.commit('user/SetRs', this.$route.query.rs)
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
</style>
