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
            <!-- <q-td key="status" :props="props">{{ props.row.account }}</q-td> -->
            <q-td key="isEnable" :props="props">
              <q-icon
                :name="props.row.isEnable==1?'mdi-check-circle':'mdi-close-circle'"
                size="1.5rem"
                :color="props.row.isEnable==1?'positive':'negative'"
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
                    @click="openReviewDetailDialog('update', props.row.id)"
                  />
                  <q-btn
                    dense
                    label="启用"
                    icon="mdi-check-circle"
                    @click="switchReview(props.row.id,1)"
                  />
                  <q-btn
                    dense
                    label="关闭"
                    icon="mdi-close-circle"
                    @click="switchReview(props.row.id,0)"
                  />
                </q-btn-group>
              </div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top="props">
          <div class="col-2 q-table__title">评审会管理</div>
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
            style="margin-left:8px"
            size="sm"
            icon="mdi-magnify"
            label="搜索"
            @click="searchDetailOpened=true"
          />
          <q-btn
            style="margin-left:8px"
            icon="mdi-new-box"
            size="sm"
            color="primary"
            label="新建"
            @click="openReviewDetailDialog('add',0)"
          ></q-btn>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="reviewDetailOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-form
          @submit="submitReviewDialog"
          @reset="resetReviewDialog"
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
              v-model.trim="review.name"
              label="评审会名称"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '名称不能为空']"
              ref="name"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="reset" v-if="dialogActiveName==='新增评审会'" label="重置" />
            <q-btn color="primary" type="submit" :loading="reviewDialogLoading" label="确定" />
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
            <q-btn color="primary" type="submit" :loading="reviewDialogLoading" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import {
  getReviewSeasonList,
  addReview,
  getReviewById
} from 'src/api/reviewManage'
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
        // {
        //   name: 'status',
        //   label: '状态',
        //   align: 'center',
        //   field: 'status'
        // },
        {
          name: 'isEnable',
          label: '开启/关闭',
          align: 'center',
          field: 'isEnable'
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
        // 'status',
        'isEnable',
        'gmtCreate',
        'gmtModified'
      ],
      tableLoading: false,
      searchForm: {
        page: 0,
        row: 0,
        name: '',
        isEnable: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10
        // specifying this determines pagination is server-side
      },
      serverData: [],
      //review dialog
      reviewDetailOpened: false,
      dialogActiveName: '',
      reviewDialogLoading: false,
      review: {
        name: '',
        status: 1
      },
      searchDetailOpened: false
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
      getReviewSeasonList(this.searchForm)
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
    openReviewDetailDialog(action, id) {
      if (action == 'add') {
        Object.assign(this.review, this.$options.data.call(this).review)
        this.dialogActiveName = '新增评审会'
        this.reviewDetailOpened = true
      } else {
        this.dialogActiveName = '修改评审会'
        getReviewById(id)
          .then(response => {
            Object.assign(this.review, response.data.data)
          })
          .catch(error => {})
        this.reviewDetailOpened = true
      }
    },
    resetReviewDialog() {
      Object.assign(this.review, this.$options.data.call(this).review)
    },
    submitReviewDialog() {
      this.reviewDialogLoading = true
      if (this.dialogActiveName == '新增评审会') {
        this.review.status = 1
        this.review.isEnable = 1
        this.review.isDel = 0
      }
      addReview(this.review)
        .then(response => {
          this.notify('positive', response.data.msg)
          this.reviewDialogLoading = false
          this.reviewDetailOpened = false
          this.request({
            pagination: this.serverPagination
          })
        })
        .catch(error => {
          this.reviewDialogLoading = false
        })
    },
    switchReview(id, isEnable) {
      getReviewById(id)
        .then(response => {
          console.log(id)
          let review = response.data.data
          review.isEnable = isEnable
          addReview(review)
            .then(response => {
              this.notify('positive', response.data.msg)
              this.request({
                pagination: this.serverPagination
              })
            })
            .catch(error => {})
        })
        .catch(error => {})
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
