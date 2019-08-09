<template>
  <q-page padding>
    <div class="row q-col-gutter-md" style="margin-bottom:10px">
      <q-input class="col-6" clearable color="primary" v-model="product.orderId" label="序号" />
      <q-select
        class="col-6"
        v-model="product.priceZoneId"
        label="价格带"
        clearable
        emit-value
        map-options
        :options="priceZoneOptions"
      ></q-select>
      <q-select
        class="col-6"
        v-model="product.speId"
        label="规格"
        clearable
        emit-value
        map-options
        :options="speOptions"
      ></q-select>
      <q-select
        class="col-6"
        v-model="product.middleTypeId"
        clearable
        label="中类"
        emit-value
        map-options
        :options="middleTypeOptions"
      ></q-select>
      <q-select
        class="col-6"
        v-model="product.sortFlag"
        clearable
        label="排序"
        emit-value
        map-options
        :options="sortOptions"
      ></q-select>
      <q-space />
      <div class="col-3 q-gutter-md">
        <q-btn flat label="重置" color="primary" @click="resetProdList" />
        <q-btn label="搜索" color="primary" @click="searchProd" />
      </div>
    </div>
    <!-- <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(prod, index) in prodList" :key="index">
        <q-card class="my-card">
          <q-img :src="checkImage(prod)">
            <div class="absolute-bottom row items-center no-wrap" style="height:40px">
              <div class="col text-subtitle2">{{"序号:"+prod.orderId+" "+prod.name}}</div>
            </div>
          </q-img>
          <q-card-actions align="right" class="no-padding">
            <q-btn flat>通过:{{calTG(prod.id)}}</q-btn>
            <q-btn flat>淘汰:{{calTT(prod.id)}}</q-btn>
            <q-btn flat>待定:{{calDD(prod.id)}}</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>-->
    <div class="row q-col-gutter-md">
      <q-table
        :data="prodList"
        :columns="columns"
        row-key="id"
        grid
        hide-header
        :pagination.sync="pagination"
        class="my-table"
        :rows-per-page-options="[9, 20,50]"
      >
        <template v-slot:item="props">
          <div class="col-4 q-pa-xs">
            <q-card class="my-card">
              <q-img :src="checkImage(props.row)">
                <div class="absolute-bottom row items-center no-wrap" style="height:40px">
                  <div class="col text-subtitle2">{{"序号:"+props.row.orderId+" "+props.row.name}}</div>
                </div>
              </q-img>
              <q-card-actions align="right" class="no-padding">
                <q-btn flat>通过:{{props.row.tg}}</q-btn>
                <q-btn flat>淘汰:{{props.row.tt}}</q-btn>
                <q-btn flat>待定:{{props.row.dd}}</q-btn>
              </q-card-actions>
            </q-card>
          </div>

          <!-- <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
          </div>-->
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import {
  getProductByReviewSeasonId,
  getPriceZoneOptions,
  getMiddleTypeOptions,
  getSpeOptions,
  getProductList
} from 'src/api/productManage'
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
      pagination: {
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'id', label: 'id', field: 'id' },
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
          name: 'tt',
          label: '淘汰',
          align: 'center',
          field: 'tt'
        },
        {
          name: 'tg',
          label: '通过',
          align: 'center',
          field: 'tg'
        },
        {
          name: 'dd',
          label: '待定',
          align: 'center',
          field: 'dd'
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
      searchId: '',
      middleTypeOptions: [],
      priceZoneOptions: [],
      speOptions: [],
      product: {
        page: 1,
        row: 1000,
        orderId: '',
        middleTypeId: '',
        speId: '',
        priceZoneId: '',
        reviewSeasonId: '',
        sortFlag: ''
      },
      calList: [],
      sortOptions: [
        { value: 1, label: '按通过数降序' },
        { value: 2, label: '按淘汰数降序' },
        { value: 3, label: '按待定数降序' }
      ]
    }
  },
  methods: {
    checkImage(prod) {
      if (prod.thumbnail != '' && prod.thumbnail != null) {
        return this.api + '/image/' + prod.id + '/' + prod.thumbnail
      } else {
        return '/statics/noImage.jpg'
      }
    },
    searchProd() {
      this.product.reviewSeasonId = parseInt(this.$route.query.rs)
      getProductList(this.product)
        .then(response => {
          let data = response.data.data
          this.prodList = data.rows
        })
        .catch(error => {})
      // this.prodList = this.calList
      // for (let i = 0; i < this.calList.length; i++) {
      //   let list = []
      //   if (
      //     (this.product.orderId == '' ||
      //       (this.product.orderId != '' &&
      //         this.prodList[i].orderId == this.product.orderId)) &&
      //     (this.product.middleTypeId == '' ||
      //       (this.product.middleTypeId != '' &&
      //         this.prodList[i].middleTypeId == this.product.middleTypeId)) &&
      //     (this.product.speId == '' ||
      //       (this.product.speId != '' &&
      //         this.prodList[i].speId == this.product.speId)) &&
      //     (this.product.priceZoneId == '' ||
      //       (this.product.priceZoneId != '' &&
      //         this.prodList[i].priceZoneId == this.product.priceZoneId))
      //   ) {
      //     list.push(this.prodList[i])
      //   }
      //   this.prodList = list
      // }
    },
    resetProdList() {
      this.product.orderId = ''
      this.product.middleTypeId = ''
      this.product.priceZoneId = ''
      this.product.speId = ''
      this.product.sortFlag = ''
      this.prodList = this.calList
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
      let xx = 0
      for (let i = 0; i < this.allResultList.length; i++) {
        if (
          this.allResultList[i].prodId == id &&
          this.allResultList[i].status == 3
        ) {
          xx++
        }
      }
      return xx
    },
    //options functions
    getPriceZone() {
      getPriceZoneOptions()
        .then(response => {
          this.priceZoneOptions = response.data.data
        })
        .catch(error => {})
    },
    getMiddleType() {
      getMiddleTypeOptions()
        .then(response => {
          this.middleTypeOptions = response.data.data
        })
        .catch(error => {})
    },
    getSpe() {
      getSpeOptions()
        .then(response => {
          this.speOptions = response.data.data
        })
        .catch(error => {})
    }
  },
  created() {
    this.getAllProduct()
    this.getAllReviewResult()
  },
  mounted() {
    this.getPriceZone(), this.getMiddleType(), this.getSpe()
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
.my-table
  width 100%
</style>