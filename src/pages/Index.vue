<template>
  <q-page padding>
    <div class="row q-pa-md q-gutter-md">
      <q-card class="my-card col-4" v-for="(rs, index) in serverData" :key="index">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{rs.name}}</div>
          <div class="text-subtitle2">{{rs.isEnable==1?"正常":"关闭"}}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat @click="goReviewing(rs.isEnable,rs.id)">参加评审</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import {} from 'src/api/productManage'
import { getReviewSeasonList, getReviewById } from 'src/api/reviewManage'
export default {
  data() {
    return {
      searchForm: {
        page: 1,
        row: 1000,
        name: '',
        isEnable: ''
      },
      serverData: []
    }
  },
  methods: {
    notify(color, message) {
      this.$q.notify({
        message: message,
        color: color
      })
    },
    goReviewing(flag, id) {
      if (flag) {
        this.$router.push({ name: 'reviewing', query: { rs: id } })
      } else {
        this.notify('warning', '该评审会已关闭')
      }
    }
  },
  mounted() {
    getReviewSeasonList(this.searchForm)
      .then(response => {
        let data = response.data.data
        this.serverData = data.rows
      })
      .catch(error => {})
  }
}
</script>
<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
</style>
