<template>
  <q-page>
    <div class="q-pa-sm">
      <q-table
        class="my-sticky-header-table"
        :data="serverData"
        :columns="columns"
        row-key="id"
        flat
        :loading="tableLoading"
        :pagination.sync="serverPagination"
        bordered
        :visible-columns="visibleColumns"
        @request="request"
        :rows-per-page-options="[10, 20]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-btn
                dense
                round
                flat
                :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                @click="props.expand = !props.expand"
              />
            </q-td>
            <q-td key="orderId" :props="props">{{ props.row.orderId }}</q-td>
            <q-td key="thumbnail" :props="props">
              <img
                :src="thumbnailCheck(props.row.id,props.row.thumbnail)"
                style="height: 80px; width: 80px;"
              />
            </q-td>
            <q-td key="devCode" :props="props">{{ props.row.devCode }}</q-td>
            <q-td key="reviewSeasonName" :props="props">{{ props.row.reviewSeasonName }}</q-td>
            <q-td key="priceZoneName" :props="props">{{ props.row.priceZoneName }}</q-td>
            <q-td key="speName" :props="props">{{ props.row.speName }}</q-td>
            <q-td key="prodMat" :props="props">{{ props.row.prodMat }}</q-td>
            <q-td key="middleTypeName" :props="props">{{ props.row.middleTypeName }}</q-td>
            <q-td key="numModel" :props="props">{{ props.row.numModel }}</q-td>
            <q-td key="retailPrice" :props="props">{{ props.row.retailPrice }}</q-td>
            <q-td key="supplyPrice" :props="props">{{ props.row.supplyPrice }}</q-td>
            <q-td key="costPrice" :props="props">{{ props.row.costPrice }}</q-td>
            <q-td key="status" :props="props">
              <q-icon
                :name="props.row.status==1?'mdi-check-circle':'mdi-close-circle'"
                size="1.5rem"
                :color="props.row.status==1?'positive':'negative'"
              />
            </q-td>
            <q-td key="gmtCreate" :props="props">{{ formatDate(props.row.gmtCreate) }}</q-td>
            <q-td key="gmtModified" :props="props">{{ formatDate(props.row.gmtModified) }}</q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                <q-btn-group>
                  <q-btn
                    dense
                    label="修改"
                    icon="mdi-pencil"
                    @click="openProductDetailDialog('update', props.row.id)"
                  />
                  <q-btn
                    dense
                    label="上传图片"
                    icon="mdi-image-plus"
                    @click="openImageDialog(props.row.id)"
                  />
                </q-btn-group>
              </div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top="props">
          <div class="col-2 q-table__title">评审产品</div>
          <q-space />
          <q-select
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            display-value="显示列"
            emit-value
            map-options
            :options="columns"
            option-value="name"
          />
          <q-btn
            color="secondary"
            style="margin-left:6px"
            size="sm"
            icon="mdi-magnify"
            label="搜索"
            @click="searchDetailOpened=true"
          />
          <q-btn
            style="margin-left:6px"
            icon="mdi-new-box"
            size="sm"
            color="primary"
            label="新建"
            @click="openProductDetailDialog('add',0)"
          ></q-btn>
          <q-btn-dropdown
            color="accent"
            style="margin-left:6px"
            size="sm"
            label="维护属性"
            icon="mdi-pencil"
          >
            <q-list>
              <q-item clickable v-close-popup @click="openOptionDialog('priceZone')">
                <q-item-section>
                  <q-item-label>价格带</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openOptionDialog('middleType')">
                <q-item-section>
                  <q-item-label>中类</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="openOptionDialog('spe')">
                <q-item-section>
                  <q-item-label>规格</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="productDetailOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-form
          @submit="submitProductDialog"
          @reset="resetProductDialog"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-card-section>
            <div class="text-h6">{{dialogActiveName}}</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.devCode"
              label="研发编号"
              error-message="必填，且不超过20位"
              :error="$v.product.devCode.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-barcode" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.name"
              label="名称"
              error-message="必填，且不超过30位"
              :error="$v.product.name.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.orderId"
              label="序号"
              error-message="必填，且为整数"
              :error="$v.product.orderId.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-numeric" />
              </template>
            </q-input>
            <q-select
              class="col-6"
              outlined
              v-model="product.reviewSeasonId"
              label="所属评审会"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.reviewSeasonId.$error"
              :options="reviewSeasonOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select>
            <q-select
              class="col-6"
              outlined
              v-model="product.priceZoneId"
              label="价格带"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.priceZoneId.$error"
              :options="priceZoneOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select>
            <q-select
              class="col-6"
              outlined
              v-model="product.speId"
              label="规格"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.speId.$error"
              :options="speOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select>
            <q-select
              class="col-6"
              outlined
              v-model="product.middleTypeId"
              label="中类"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.middleTypeId.$error"
              :options="middleTypeOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodMat"
              label="材质"
              error-message="请输入有效值"
              :error="$v.product.prodMat.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-animation" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.retailPrice"
              label="零售价"
              error-message="请输入有效值"
              :error="$v.product.retailPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.supplyPrice"
              label="供应价"
              error-message="请输入有效值"
              :error="$v.product.supplyPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.costPrice"
              label="成本价"
              error-message="请输入有效值"
              :error="$v.product.costPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.numModel"
              label="件数"
              error-message="请输入有效值"
              :error="$v.product.numModel.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-counter" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodDesc"
              label="描述（备注）"
              error-message="请输入有效值"
              :error="$v.product.prodDesc.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-book" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="reset" v-if="dialogActiveName==='新增产品'" label="重置" />
            <q-btn color="primary" type="submit" :loading="productDialogLoading" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="searchDetailOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-form
          @submit="search"
          @reset="resetSearchForm"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-card-section>
            <div class="text-h6">搜索</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-input class="col-6" outlined v-model.trim="searchForm.name" label="名称">
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <template v-slot:prepend>
              <q-icon name="mdi-account-box-outline" />
            </template>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="reset" label="重置" />
            <q-btn color="primary" type="submit" :loading="productDialogLoading" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- option maintain -->
    <q-dialog v-model="optionDialogOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{optionTitle}}</div>
          <q-btn
            icon="mdi-new-box"
            color="primary"
            label="新建"
            style="margin-left:8px"
            dense
            @click="openParamDialog('add',0)"
          />
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class>
          <q-table :data="optionTableData" :columns="optionTableColumns" row-key="id">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="gmtCreate" :props="props">{{ formatDate(props.row.gmtCreate) }}</q-td>
                <q-td key="gmtModified" :props="props">{{ formatDate(props.row.gmtModified) }}</q-td>
                <q-td key="operation" :props="props">
                  <q-btn
                    label="修改"
                    dense
                    color="orange"
                    @click="openParamDialog('update',props.row.id)"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- param dialog -->
    <q-dialog v-model="paramDialogOpened" persistent>
      <q-card style="width: 400px; max-width: 80vw;">
        <q-form
          @submit="submitParamDialog"
          @reset="resetParamDialog"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-card-section>
            <div class="text-h6">{{paramDialogActiveName}}</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-input
              class="col-6"
              outlined
              v-model.trim="param.name"
              label="名称"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '名称不能为空']"
              ref="name"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-book-open" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="reset" v-if="paramDialogActiveName==='新增'" label="重置" />
            <q-btn color="primary" type="submit" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- image upload dialog -->
    <q-dialog v-model="imageDialogOpened" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">上传图片</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-uploader
            ref="imageUpload"
            :url="api+imageUploadUrl"
            accept=".jpg, .jpeg, .png"
            :headers="[{name: 'id', value: this.expandId}]"
            style="max-width: 300px"
            @uploaded="imageUploaded"
            @failed="imageUploadFail"
            @added="addImageFile"
            field-name="file"
            name="file"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import {
  getProductList,
  addProduct,
  getProductById,
  getPriceZoneOptions,
  getPriceZoneList,
  getMiddleTypeOptions,
  getMiddleTypeList,
  getSpeOptions,
  getSpeList,
  addPriceZone,
  addMiddleType,
  addSpe,
  getPriceZoneById,
  getMiddleTypeById,
  getSpeById
} from 'src/api/productManage'
import { getReviewOptions } from 'src/api/reviewManage'
import {
  minLength,
  maxLength,
  minValue,
  maxValue,
  numeric,
  integer,
  decimal,
  required
} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      api: process.env.API,
      //table
      columns: [
        {
          name: 'name',
          required: true,
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
      visibleColumns: [
        'name',
        'orderId',
        'thumbnail',
        'priceZoneName',
        'middleTypeName',
        'retailPrice',
        'supplyPrice',
        'costPrice'
      ],
      tableLoading: false,
      searchForm: {
        page: 0,
        row: 0,
        name: '',
        status: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10
        // specifying this determines pagination is server-side
      },
      serverData: [],
      //product dialog
      productDetailOpened: false,
      dialogActiveName: '',
      productDialogLoading: false,
      product: {
        name: '',
        devCode: '',
        reviewSeasonId: '',
        priceZoneId: '',
        speId: '',
        middleTypeId: '',
        prodMat: '',
        numModel: '',
        prodDesc: '',
        retailPrice: '',
        supplyPrice: '',
        costPrice: '',
        image: '',
        thumbnail: '',
        orderId: '',
        status: 1,
        isDel: 0
      },
      middleTypeOptions: [],
      priceZoneOptions: [],
      speOptions: [],
      reviewSeasonOptions: [],
      searchDetailOpened: false,
      //option
      optionDialogOpened: false,
      optionTitle: '',
      optionTableData: [],
      optionTableColumns: [
        {
          name: 'name',
          label: '名称',
          align: 'left',
          field: 'name'
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
        },
        {
          name: 'operation',
          label: '操作',
          align: 'center',
          field: 'operation'
        }
      ],
      //param
      paramDialogOpened: false,
      param: {
        id: '',
        name: ''
      },
      paramDialogActiveName: '',
      //image
      imageDialogOpened: false,
      expandId: 0,
      imageUploadUrl: '/imageUpload/product'
    }
  },
  validations: {
    product: {
      devCode: { required, maxLength: maxLength(20) },
      name: { required, maxLength: maxLength(30) },
      orderId: { required, integer, maxLength: maxLength(30) },
      retailPrice: {
        required
      },
      supplyPrice: {
        required
      },
      costPrice: {
        required
      },
      numModel: {},
      reviewSeasonId: { required },
      middleTypeId: { required },
      priceZoneId: { required },
      speId: { required },
      prodMat: {},
      prodDesc: {}
    }
  },
  methods: {
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    //dataTable request
    request({ pagination }) {
      this.tableLoading = true
      this.searchForm.page = pagination.page
      this.searchForm.row = pagination.rowsPerPage
      getProductList(this.searchForm)
        .then(response => {
          let data = response.data.data
          this.serverPagination.rowsNumber = data.total
          this.serverPagination.page = pagination.page
          this.serverPagination.rowsPerPage = pagination.rowsPerPage
          this.serverData = data.rows
          this.tableLoading = false
        })
        .catch(error => {
          this.tableLoading = false
        })
    },
    resetSearchForm() {
      Object.assign(this.searchForm, this.$options.data.call(this).searchForm)
      this.$nextTick(() => {
        this.serverPagination.page = 1
        this.request({
          pagination: this.serverPagination
        })
      })
    },
    search() {
      this.serverPagination.page = 1
      this.request({
        pagination: this.serverPagination
      })
      this.searchDetailOpened = false
    },
    //dialog
    openProductDetailDialog(action, id) {
      this.$v.product.$reset()
      if (action == 'add') {
        Object.assign(this.product, this.$options.data.call(this).product)
        this.product.id = ''
        this.dialogActiveName = '新增产品'
        this.productDetailOpened = true
      } else {
        this.dialogActiveName = '修改产品'
        getProductById(id)
          .then(response => {
            Object.assign(this.product, response.data.data)
          })
          .catch(error => {})
        this.productDetailOpened = true
      }
    },
    resetProductDialog() {
      this.$v.product.$reset()
      Object.assign(this.product, this.$options.data.call(this).product)
    },
    submitProductDialog() {
      this.$v.product.$touch()
      if (this.$v.product.$invalid) {
        return
      }
      this.productDialogLoading = true
      if (this.dialogActiveName == '新增产品') {
        this.product.status = 1
        this.product.isDel = 0
      }
      addProduct(this.product)
        .then(response => {
          this.notify('positive', response.data.msg)
          this.productDialogLoading = false
          this.productDetailOpened = false
          this.request({
            pagination: this.serverPagination
          })
        })
        .catch(error => {
          this.productDialogLoading = false
        })
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
    getReviewSeason() {
      getReviewOptions()
        .then(response => {
          this.reviewSeasonOptions = response.data.data
        })
        .catch(error => {})
    },
    getSpe() {
      getSpeOptions()
        .then(response => {
          this.speOptions = response.data.data
        })
        .catch(error => {})
    },
    //option maintain
    openOptionDialog(name) {
      if (name == 'priceZone') {
        this.optionTitle = '维护价格带'
        this.optionDialogOpened = true
        getPriceZoneList()
          .then(response => {
            this.optionTableData = response.data.data
          })
          .catch(error => {})
      } else if (name == 'middleType') {
        this.optionTitle = '维护中类'
        this.optionDialogOpened = true
        getMiddleTypeList()
          .then(response => {
            this.optionTableData = response.data.data
          })
          .catch(error => {})
      } else {
        this.optionTitle = '维护规格'
        this.optionDialogOpened = true
        getSpeList()
          .then(response => {
            this.optionTableData = response.data.data
          })
          .catch(error => {})
      }
    },
    openParamDialog(action, id) {
      if (action == 'add') {
        Object.assign(this.param, this.$options.data.call(this).param)
        this.paramDialogActiveName = '新增'
        this.paramDialogOpened = true
      } else {
        this.paramDialogActiveName = '修改'
        if (this.optionTitle == '维护价格带') {
          getPriceZoneById(id)
            .then(response => {
              Object.assign(this.param, response.data.data)
            })
            .catch(error => {})
        } else if (this.optionTitle == '维护中类') {
          getMiddleTypeById(id)
            .then(response => {
              Object.assign(this.param, response.data.data)
            })
            .catch(error => {})
        } else {
          getSpeById(id)
            .then(response => {
              Object.assign(this.param, response.data.data)
            })
            .catch(error => {})
        }

        this.paramDialogOpened = true
      }
    },
    submitParamDialog() {
      if (this.optionTitle == '维护价格带') {
        addPriceZone(this.param)
          .then(response => {
            this.notify('positive', response.data.msg)
            this.paramDialogOpened = false
            getPriceZoneList()
              .then(response => {
                this.optionTableData = response.data.data
              })
              .catch(error => {})
          })
          .catch(error => {})
      } else if (this.optionTitle == '维护中类') {
        addMiddleType(this.param)
          .then(response => {
            this.notify('positive', response.data.msg)
            this.paramDialogOpened = false
            getMiddleTypeList()
              .then(response => {
                this.optionTableData = response.data.data
              })
              .catch(error => {})
          })
          .catch(error => {})
      } else {
        addSpe(this.param)
          .then(response => {
            this.notify('positive', response.data.msg)
            this.paramDialogOpened = false
            getSpeList()
              .then(response => {
                this.optionTableData = response.data.data
              })
              .catch(error => {})
          })
          .catch(error => {})
      }
    },
    resetParamDialog() {
      Object.assign(this.param, this.$options.data.call(this).param)
    },
    //image
    openImageDialog(id) {
      this.expandId = id
      this.imageDialogOpened = true
    },
    // when image has just bean uploaded
    imageUploaded(info) {
      let response = JSON.parse(info.xhr.response)
      if (response.code == 20000) {
        this.notify('positive', response.msg)
        this.$refs.imageUpload.reset()
        this.imageDialogOpened = false
        this.request({
          pagination: this.serverPagination
        })
      } else {
        this.notify('negative', response.msg)
        this.$refs.imageUpload.reset()
      }
    },
    // when it has encountered error while uploading
    imageUploadFail(info) {
      let response = JSON.parse(info.xhr.response)
      this.notify('negative', response.data.msg)
    },
    addImageFile(files) {
      if (files[0].size > 10 * 1024 * 1024) {
        this.$refs.imageUpload.reset()
        this.notify('warning', '图片不能大于10MB')
      }
    },
    //check thumbnail
    thumbnailCheck(id, thumbnail) {
      if (!(thumbnail === null) & !(thumbnail === '')) {
        return this.api + '/image/' + id + '/' + thumbnail
      } else {
        return 'statics/noImage.jpg'
      }
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination
    }),
      this.getPriceZone(),
      this.getMiddleType(),
      this.getReviewSeason(),
      this.getSpe()
  }
}
</script>

<style lang="stylus"></style>
