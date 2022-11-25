<template>
  <a
    href="#" class="c-building__flat"
    :class="{'is-active': property.isSelected, 'is-not-filtred': !property.isFiltred }"
    @click.prevent="onViewApartment"
  >
    <div
      class="c-building__flat-type"
      :style="{'background-color': color}"
    >
      {{ property['КоличествоКомнатСтрокой'] }}
    </div>
    <div class="c-building__flat-inner pa-2">
      <div class="d-flex align-center">
        <div
          class="c-building__flat-type"
          :style="{'background-color': color}"
        >
          {{ property['КоличествоКомнатСтрокой'] }}
        </div>
        <div class="ml-2 has-opacity-65">{{ property['ТипНедвижимости'] }}</div>
        <div class="ml-auto has-opacity-65">№{{ property.number }}</div>
      </div>
      <div class="font-weight-bold text-body-1 mt-2">{{ property.price | num }} ₽</div>
      <div class="has-opacity-65 mt-1">{{ property['ПлощадьОбщая'] | num }} м² - {{ property.priceM2 | num }} ₽/м²</div>
    </div>
  </a>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      property: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      free: '#02C39E',
      reserved: '#F5AF05',
      sold: '#DC3545'
    }),
    computed: {
      ...mapGetters([ 'mq' ]),
      color: vm => {
        let color
        switch (vm.property.status) {
          case 'Свободна':
            color = vm.free
            break
          case 'Бронь':
            color = vm.reserved
            break
          case 'Договор':
            color = vm.sold
            break
          case 'Выданы ключи':
            color = vm.sold
            break
          default:
            color = '#ccc'
        }
        return color
      }
    },

    methods: {
      // TODO: copypaste to App.vue method setFilter()
      onViewApartment() {
        this.$store.dispatch('chess/selectPropterty', this.property.id)
        this.$store.commit('infoPanel/set', {
          path: 'property',
          payload: this.property
        })

        if (this.mq.mdAndDown)
          this.$modal.show('info')

        this.$store.commit('infoPanel/set', {
          path: 'isOpen',
          payload: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .is-not-filtred {
    filter: grayscale(0.9);
  }
</style>
