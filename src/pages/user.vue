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
            <q-td key="account" :props="props">{{ props.row.account }}</q-td>
            <q-td key="type" :props="props">{{ props.row.type==1?'参评人（公司）':'参评人（客户）' }}</q-td>
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
              <div class="text-left no-padding">
                <q-btn-group>
                  <q-btn
                    dense
                    label="修改"
                    icon="mdi-pencil"
                    @click="openUserDetailDialog('update', props.row.id)"
                  />
                  <!-- <q-btn label="启用/停用" icon="mdi-eraser" /> -->
                </q-btn-group>
              </div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top="props">
          <div class="col-2 q-table__title">用户</div>
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
            @click="openUserDetailDialog('add',0)"
          ></q-btn>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="userDetailOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-form
          @submit="submitUserDialog"
          @reset="resetUserDialog"
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
              v-model.trim="user.account"
              label="用户名"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '账号不能为空']"
              ref="account"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="user.name"
              label="姓名"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '姓名不能为空']"
              ref="name"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <q-select
              class="col-6"
              outlined
              v-model="user.type"
              emit-value
              label="角色"
              map-options
              :options="roleOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account-box-outline" />
              </template>
            </q-select>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" type="reset" v-if="dialogActiveName==='新增用户'" label="重置" />
            <q-btn color="primary" type="submit" :loading="userDialogLoading" label="确定" />
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
            <q-input class="col-6" outlined v-model.trim="searchForm.account" label="用户名">
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <q-input class="col-6" outlined v-model.trim="searchForm.name" label="姓名">
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
            <q-btn color="primary" type="submit" :loading="userDialogLoading" label="确定" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import {
  getUserList,
  updatePassword,
  addUser,
  getUserById
} from 'src/api/userManage'
export default {
  data() {
    return {
      //table
      columns: [
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: 'name'
        },
        { name: 'account', label: '账号', align: 'center', field: 'account' },
        {
          name: 'type',
          label: '角色',
          align: 'center',
          field: 'type'
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
        'account',
        'type',
        'status',
        'gmtCreate',
        'gmtModified'
      ],
      tableLoading: false,
      searchForm: {
        page: 0,
        row: 0,
        account: '',
        name: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10
        // specifying this determines pagination is server-side
      },
      serverData: [],
      //dialog
      userDetailOpened: false,
      dialogActiveName: '',
      userDialogLoading: false,
      user: {
        account: '',
        name: '',
        type: 1,
        status: ''
      },
      roleOptions: [
        {
          label: '参评人（公司）',
          value: 1
        },
        {
          label: '参评人（客户）',
          value: 2
        }
      ],
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
      getUserList(this.searchForm)
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
    openUserDetailDialog(action, id) {
      if (action == 'add') {
        Object.assign(this.user, this.$options.data.call(this).user)
        this.user.id = ''
        this.dialogActiveName = '新增用户'
        this.userDetailOpened = true
      } else {
        this.dialogActiveName = '修改用户'
        getUserById(id)
          .then(response => {
            Object.assign(this.user, response.data.data)
          })
          .catch(error => {})
        this.userDetailOpened = true
      }
    },
    resetUserDialog() {
      Object.assign(this.user, this.$options.data.call(this).user)
    },
    submitUserDialog() {
      this.userDialogLoading = true
      if (this.dialogActiveName == '新增用户') {
        this.user.status = 1
        this.user.isDel = 0
      }
      addUser(this.user)
        .then(response => {
          this.notify('positive', response.data.msg)
          this.userDialogLoading = false
          this.userDetailOpened = false
          this.request({
            pagination: this.serverPagination
          })
        })
        .catch(error => {
          this.userDialogLoading = false
        })
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination
    })
  }
}
</script>

<style lang="stylus">
.my-sticky-header-table
  /* max height is important */
  .q-table__middle
    height calc(100vh - 180px)
  .q-table__top, .q-table__bottom, tr:first-child th
    background-color #c1f4cd
  tr:first-child th
    position sticky
    top 0
    opacity 1 /* opacity is important */
    z-index 2 /* higher than z-index for td below */
  tr:first-child th:first-child
    z-index 3 /* highest z-index */
  td:first-child
    z-index 1
  td:first-child, th:first-child
    position sticky
    left 0
</style>
