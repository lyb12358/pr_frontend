<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">19秋冬第一次评审会</div>
          <div class="text-subtitle2">进行中</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat
                 to="/review/reviewing">参加评审</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  mounted() {
    this.$q.fullscreen.exit()
  }
}
</script>
<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
</style>
