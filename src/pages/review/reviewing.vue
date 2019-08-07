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
    <div class="row" style="margin-bottom:10px">
      <q-space />
      <q-btn
        style="margin-right:10px"
        label="提交结果"
        dense
        color="primary"
        @click="uploadAllResult()"
      />
      <q-input
      style="margin-right:10px"
        dense
        color="primary"
        debounce="1000"
        @input="searchProdList"
        v-model="product.orderId"
        label="搜索序号"
      />
      <q-btn style="margin-right:10px" label="重置搜索" dense color="primary" @click="resetProdList" />
    </div>
    <!-- <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(prod, index) in prodList" :key="index">
        <q-card class="my-card" v-if="searchId==''||prod.orderId==searchId">
          <q-img :src="checkImage(prod)" @click="openProdDetailDialog(prod.orderId,prod)">
            <div class="absolute-bottom row items-center no-wrap" style="height:40px">
              <div class="col text-subtitle2">{{"序号:"+prod.orderId+" "+prod.name}}</div>
            </div>
          </q-img>
          <q-card-actions align="right" class>
            <q-btn-group>
              <q-btn
                dense
                label="通过"
                :color="getResultByProdId(prod.id)==1?'blue':'white'"
                :text-color="getResultByProdId(prod.id)==1?'white':'black'"
                @click="changeResult(1,prod)"
              />
              <q-btn
                dense
                label="淘汰"
                :color="getResultByProdId(prod.id)==2?'red':'white'"
                :text-color="getResultByProdId(prod.id)==2?'white':'black'"
                @click="changeResult(2,prod)"
              />
              <q-btn
                dense
                label="待定"
                :color="getResultByProdId(prod.id)==3?'orange':'white'"
                :text-color="getResultByProdId(prod.id)==3?'white':'black'"
                @click="changeResult(3,prod)"
              />
            </q-btn-group>
          </q-card-actions>
        </q-card>
      </div>
    </div>-->
    <div class="row q-col-gutter-md">
      <q-table
        :data="prodList"
        :columns="columns"
        row-key="orderId"
        grid
        hide-header
        :pagination.sync="pagination"
        class="my-table"
      >
        <template v-slot:item="props">
          <div class="col-4 q-pa-xs">
            <q-card class="my-card">
              <q-img
                :src="checkImage(props.row)"
                @click="openProdDetailDialog(props.row.orderId,props.row)"
              >
                <div class="absolute-bottom row items-center no-wrap" style="height:40px">
                  <div class="col text-subtitle2">{{"序号:"+props.row.orderId+" "+props.row.name}}</div>
                </div>
              </q-img>
              <q-card-actions align="right" class>
                <q-btn-group>
                  <q-btn
                    dense
                    label="通过"
                    :color="getResultByProdId(props.row.id)==1?'blue':'white'"
                    :text-color="getResultByProdId(props.row.id)==1?'white':'black'"
                    @click="changeResult(1,props.row)"
                  />
                  <q-btn
                    dense
                    label="淘汰"
                    :color="getResultByProdId(props.row.id)==2?'red':'white'"
                    :text-color="getResultByProdId(props.row.id)==2?'white':'black'"
                    @click="changeResult(2,props.row)"
                  />
                  <q-btn
                    dense
                    label="待定"
                    :color="getResultByProdId(props.row.id)==3?'orange':'white'"
                    :text-color="getResultByProdId(props.row.id)==3?'white':'black'"
                    @click="changeResult(3,props.row)"
                  />
                </q-btn-group>
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </q-table>
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
        <q-card-section class="row items-center">
          <q-btn
            icon="mdi-arrow-left-bold"
            class="text-white"
            flat
            round
            @click="changeProdLeft"
            style="font-size: 3em;margin-top:270px;"
          />
          <q-btn
            icon="mdi-arrow-right-bold"
            class="text-white"
            flat
            round
            @click="changeProdRight"
            style="font-size: 3em;margin-top:270px;margin-left:484px;"
          />
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
              <div class="row col-3" :v-if="roleType">
                <div class="text-bold">成本价：</div>
                <div class>{{this.singleProd.costPrice}}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="text-bold">材质：</div>
              <div class>{{this.singleProd.prodMat}}</div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions align="right" class>
            <q-btn-group>
              <q-btn
                label="通过"
                :color="getResultByProdId(singleProd.id)==1?'blue':'white'"
                :text-color="getResultByProdId(singleProd.id)==1?'white':'black'"
                @click="changeResult(1,singleProd)"
              />
              <q-btn
                label="淘汰"
                :color="getResultByProdId(singleProd.id)==2?'red':'white'"
                :text-color="getResultByProdId(singleProd.id)==2?'white':'black'"
                @click="changeResult(2,singleProd)"
              />
              <q-btn
                label="待定"
                :color="getResultByProdId(singleProd.id)==3?'orange':'white'"
                :text-color="getResultByProdId(singleProd.id)==3?'white':'black'"
                @click="changeResult(3,singleProd)"
              />
            </q-btn-group>
            <q-space />
            <q-btn color="red" label="关闭" v-close-popup />
            <q-btn color="primary" label="同价格带产品">
              <q-menu transition-show="jump-up" transition-hide="jump-down">
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    v-for="(prod, index) in priceZoneList"
                    :key="index"
                    @click="openProdDetailDialog(prod.orderId,prod)"
                  >
                    <q-item-section>{{"序号："+prod.orderId+" "+prod.name}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

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
import {
  getProductByReviewSeasonId,
  getProductList
} from 'src/api/productManage'
import {
  getReviewResultByUserId,
  getReviewResultByProdId,
  getReviewResultByUserIdAndProdId,
  getReviewResultBySeasonId,
  getReviewResultBySeasonIdAndUserId,
  getReviewResultBySeasonIdAndProdId,
  addReviewResult,
  addSingleReviewResult,
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
      pagination: {
        rowsPerPage: 9
        // rowsNumber: xx if getting data from a server
      },
      filter: '',
      columns: [
        { name: 'id', label: 'id', field: 'id' },
        { name: 'orderId', label: 'orderId', field: 'orderId' },
        {
          name: 'name',
          label: '名称',
          align: 'left',
          field: 'name'
        },
        {
          name: 'orderId',
          label: '序号',
          align: 'center',
          field: 'orderId'
        },
        {
          name: 'thumbnail',
          label: '简图',
          align: 'center',
          field: 'thumbnail'
        },
        {
          name: 'devCode',
          label: '研发编号',
          align: 'center',
          field: 'devCode'
        },
        {
          name: 'reviewSeasonName',
          label: '评审会',
          align: 'center',
          field: 'reviewSeasonName'
        },
        {
          name: 'priceZoneName',
          label: '价格带',
          align: 'center',
          field: 'priceZoneName'
        },
        {
          name: 'speName',
          label: '规格',
          align: 'center',
          field: 'speName'
        },
        {
          name: 'prodMat',
          label: '材质',
          align: 'center',
          field: 'prodMat'
        },
        {
          name: 'middleTypeName',
          label: '中类',
          align: 'center',
          field: 'middleTypeName'
        },
        {
          name: 'numModel',
          label: '件数',
          align: 'center',
          field: 'numModel'
        },
        {
          name: 'retailPrice',
          label: '零售价',
          align: 'center',
          field: 'retailPrice'
        },
        {
          name: 'supplyPrice',
          label: '供应价',
          align: 'center',
          field: 'supplyPrice'
        },
        {
          name: 'costPrice',
          label: '成本价',
          align: 'center',
          field: 'costPrice'
        },
        {
          name: 'status',
          label: '状态',
          align: 'center',
          field: 'status'
        },
        {
          name: 'gmtCreate',
          label: '添加时间',
          align: 'center',
          field: 'gmtCreate'
        },
        {
          name: 'gmtModified',
          label: '修改时间',
          align: 'center',
          field: 'gmtModified'
        }
      ],
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
      compareProdList: [],
      priceZoneList: [],
      calList: [],
      product: {
        page: 1,
        row: 1000,
        orderId: '',
        middleTypeId: '',
        speId: '',
        priceZoneId: '',
        reviewSeasonId: ''
      }
    }
  },
  computed: {
    roleType() {
      return this.$store.getters['user/userInfo'].type != 2
    },
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
    searchProdList() {
      this.product.reviewSeasonId = parseInt(this.$route.query.rs)
      getProductList(this.product)
        .then(response => {
          let data = response.data.data
          this.prodList = data.rows
        })
        .catch(error => {})
    },
    resetProdList() {
      this.product.orderId = ''
      this.getAllProduct()
    },
    checkImage(prod) {
      if (prod.thumbnail != '' && prod.thumbnail != null) {
        return this.api + '/image/' + prod.id + '/' + prod.thumbnail
      } else {
        return '/statics/noImage.jpg'
      }
    },
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    changeProdLeft() {
      if (this.detailIndex == 0) {
        this.detailIndex = this.prodList.length - 1
      } else {
        this.detailIndex--
      }
      let newProd = this.prodList[this.detailIndex]
      this.openProdDetailDialog(this.detailIndex, newProd)
    },
    changeProdRight() {
      if (this.detailIndex == this.prodList.length - 1) {
        this.detailIndex = 0
      } else {
        this.detailIndex++
      }
      let newProd = this.prodList[this.detailIndex]
      this.openProdDetailDialog(this.detailIndex, newProd)
    },
    openProdDetailDialog(index, prod) {
      this.singleProd = prod
      this.detailIndex = index
      this.priceZoneList = []
      for (let i = 0; i < this.prodList.length; i++) {
        if (
          this.prodList[i].priceZoneId == prod.priceZoneId &&
          this.prodList[i].id != prod.id
        ) {
          this.priceZoneList.push(this.prodList[i])
        }
      }
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
          this.calList = data
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
    changeResult(value, prod) {
      for (let i = 0; i < this.userResultList.length; i++) {
        if (this.userResultList[i].prodId == prod.id) {
          let xx = this.userResultList[i]
          xx.status = value
          this.userResultList.splice(i, 1, xx)
          addSingleReviewResult(xx)
            .then(response => {
              console.log('提交' + prod.id)
            })
            .catch(error => {})
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
      if (
        this.singleProd.thumbnail != '' &&
        this.singleProd.thumbnail != null
      ) {
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
      } else {
        return {
          background: 'url(/statics/noImage.jpg) no-repeat center',
          height: '760px'
        }
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
.my-table
  width 100%
</style>
