<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-4"
           v-for="(prod, index) in prodList"
           :key="index">
        <q-card class="my-card">

          <q-img src="/assets/cstp.png">
            <!-- <q-icon :name="prod.icon"
                    :color="prod.color"
                    style="font-size: 4rem;" /> -->
            <div class="absolute-bottom row items-center no-wrap"
                 style="height:40px">
              <div class="col text-subtitle2">
                {{"序号:"+prod.order+" "+prod.name}}
              </div>
            </div>
          </q-img>
          <q-card-actions align="right"
                          class="no-padding">
            <q-btn flat>通过10</q-btn>
            <q-btn flat>待定5</q-btn>
            <q-btn flat>淘汰7</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
const prodList = [
  {
    name: '静净白鹅绒春被',
    order: 1,
    color: 'positive',
    icon: 'mdi-emoticon-happy'
  },
  {
    name: '静净白鹅绒夏被',
    order: 2,
    color: 'orange',
    icon: 'mdi-emoticon-neutral'
  },
  {
    name: '静净白鹅绒秋被',
    order: 3,
    color: 'red',
    icon: 'mdi-emoticon-sad'
  },
  {
    name: '静净白鹅绒冬被',
    order: 4,
    color: 'orange',
    icon: 'mdi-emoticon-neutral'
  },
  {
    name: '静净白鹅绒春夏被',
    order: 5,
    color: 'red',
    icon: 'mdi-emoticon-sad'
  },
  {
    name: '静净白鹅绒春秋被',
    order: 6,
    color: 'positive',
    icon: 'mdi-emoticon-happy'
  },
  {
    name: '静净白鹅绒秋冬被',
    order: 7,
    color: 'orange',
    icon: 'mdi-emoticon-neutral'
  },
  {
    name: '静净白鹅绒XX被',
    order: 8,
    color: 'positive',
    icon: 'mdi-emoticon-happy'
  },
  {
    name: '静净白鹅绒YY被',
    order: 9,
    color: 'red',
    icon: 'mdi-emoticon-sad'
  },
  {
    name: '静净白鹅绒ZZ被',
    order: 10,
    color: 'positive',
    icon: 'mdi-emoticon-happy'
  }
]
export default {
  data() {
    return {
      xx: '1',
      prodList
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
</style>