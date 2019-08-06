<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(prod, index) in prodList" :key="index">
        <q-card class="my-card">
          <q-img :src="api + '/image/' + prod.id + '/' + prod.thumbnail">
            <div class="absolute-bottom row items-center no-wrap" style="height:40px">
              <div class="col text-subtitle2">{{"序号:"+(index+1)+" "+prod.name}}</div>
            </div>
          </q-img>
          <q-card-actions align="right" class="no-padding">
            <q-btn flat>通过:{{calTG(prod.id)}}</q-btn>
            <q-btn flat>淘汰:{{calTT(prod.id)}}</q-btn>
            <q-btn flat>待定:{{calDD(prod.id)}}</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
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
  addReviewResult
} from 'src/api/reviewManage'
export default {
  data() {
    return {
      api: process.env.API,
      xx: 1,
      yy: '我对产品的评论',
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
      searchId: ''
    }
  },
  methods: {
    getAllProduct() {
      getProductByReviewSeasonId(parseInt(this.$route.query.rs))
        .then(response => {
          let data = response.data.data
          this.prodList = data
        })
        .catch(error => {})
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
    calTG(id) {
      let xx = 0
      for (let i = 0; i < this.allResultList.length; i++) {
        if (
          this.allResultList[i].prodId == id &&
          this.allResultList[i].status == 1
        ) {
          xx++
        }
      }
      return xx
    },
    calTT(id) {
      let xx = 0
      for (let i = 0; i < this.allResultList.length; i++) {
        if (
          this.allResultList[i].prodId == id &&
          this.allResultList[i].status == 2
        ) {
          xx++
        }
      }
      return xx
    },
    calDD(id) {
      return this.prodList.length - this.calTG(id) - this.calTT(id)
    }
  },
  created() {
    this.getAllProduct()
    this.getAllReviewResult()
  },
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
</style>