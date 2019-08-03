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
              <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
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
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { getProductList } from 'src/api/productManage'
export default {
  data() {
    return {
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
      //user dialog
      userDetailOpened: false
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
    },
    openProdDetailDialog() {
      this.prodDetailOpened = true
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination
    })
  }
}
</script>

<style lang="stylus"></style>
