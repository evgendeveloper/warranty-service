<template>
  <aside class="overflow-hidden" :class="mq.mdAndUp ? asideClasses : ['full-height']">
    <div class="d-flex flex-column full-height" v-if="property">
      <div class="full-height overflow-x-auto pb-10" :class="{'pt-5': mq.mdAndDown, 'pt-10': mq.mdAndUp}">
        <div :class="{'px-5': mq.mdAndDown, 'px-10': mq.mdAndUp}">
          <div class="text-body-1 font-weight-500 mb-5">{{ title }}</div>
          <div class="mb-10">
            <a class="c-image-property image-link" @click="onOpenImage">
              <img :src="property.plan" alt="">
            </a>
          </div>
          <div class="mb-5">
            <div class="text-body-2 mb-1">Стоимость</div>
            <div class="text-h3">{{ property['price'] | num }} ₽</div>
          </div>
          <div class="mb-10">
            <div class="c-list text-body-2">
              <div class="c-list__item d-flex justify-space-between">
                <div>Статус</div>
                <div>{{ property.status }}</div>
              </div>
              <div class="c-list__item d-flex justify-space-between">
                <div>Цена, м²</div>
                <div>{{ property.priceM2 | num }} ₽</div>
              </div>
              <div class="c-list__item d-flex justify-space-between">
                <div>Площадь</div>
                <div>{{ property['ПлощадьОбщая'] }} м²</div>
              </div>
              <div
                v-if="!['Прочее', 'Гараж/Паркоместо'].includes(property['ТипНедвижимости'])"
                class="c-list__item d-flex justify-space-between"
              >
                <div>Площадь кухни</div>
                <div>{{ property['ПлощадьКухни'] }} м²</div>
              </div>
              <div class="c-list__item d-flex justify-space-between">
                <div>Этаж</div>
                <div>{{ property.floor }}</div>
              </div>
              <div class="c-list__item d-flex justify-space-between" v-for="b in property['Балконы']">
                <div>{{ b['Тип'] }}</div>
                <div>{{ b['Площадь'] }} м²</div>
              </div>
              <div
                class="c-list__item d-flex justify-space-between"
                v-if="!['Прочее', 'Гараж/Паркоместо'].includes(property['ТипНедвижимости'])"
              >
                <div>{{ property['СовмещенныйСанУзел'] ? 'Совмещенный' : 'Раздельный' }} cан. узел</div>
              </div>
            </div>
          </div>

          <div class="mb-10" v-if="property.description">
            <div class="text-body-2 mb-1">Описание</div>
            <div class="c-collapsible text-body-1" :class="{'is-open': descriptionLenght < 220 || descriptioOpened }" v-if="property.description">
              <div class="c-collapsible__content" :style="collapseStyle" ref="description">{{ property.description }}</div>
              <div v-if="(descriptionLenght > 220)">
                <a href="#" class="c-collapsible__trigger" @click="onToggleCollapse">{{ collapseTriggerText }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pa-5 l-row">
        <div
          class="l-col l-col-6 py-0"
          v-if="!['Бронь', 'Договор', 'Выданы ключи', 'Не для продажи', 'На расторжении'].includes(property.status)"
        >
          <a
            href="#" @click="onBook"
            class="e-btn full-width full-height is-primary"
          >Забронировать</a>
        </div>
        <div class="l-col py-0">
          <a
            href="#" @click="onPopQuestion"
            class="e-btn full-width full-height is-primary"
          >Задать вопрос</a>
        </div>
      </div>
      <a href="#" @click="onClose" class="close d-flex align-center justify-center px-10 py-5">
        <span class="text-body-1">Закрыть</span><i class="e-icon is-close ml-5"></i>
      </a>
    </div>
  </aside>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    data: () => ({
      asideClasses: ['c-aside'],
      descriptioOpened: false,
      collapseTriggerText: 'Развернуть',
      collapseStyle: {},
    }),

    computed: {
      ...mapState({
        isOpen: state => state.infoPanel.isOpen,
        property: state => state.infoPanel.property
      }),
      ...mapGetters('infoPanel', [
        'title',
      ]),
      ...mapGetters(['mq']),
      descriptionLenght: vm => vm.property.description.length,
    },

    watch: {
      isOpen(value) {
        if (value) {
          this.asideClasses.push('is-open')
          setTimeout(_ => this.asideClasses.push('is-opened'), 250)
          this.$parent.postMessage({
            method: '_$is_getLocationParam',
            payload: 'href'
          })
        } else {
          this.asideClasses = ['c-aside']
        }
      }
    },

    methods: {
      onOpenImage() {
        this.$store.commit('set', {
          path: 'imageIndex',
          payload: 0
        })
      },

      onClose() {
        if (this.mq.mdAndDown)
          this.$modal.hide('info')

        this.$store.commit('infoPanel/set', {
          path: 'isOpen',
          payload: false
        })

        this.$store.dispatch('chess/selectPropterty', null)

        this.$store.commit('infoPanel/set', {
          path: 'property',
          payload: {}
        })
      },

      onToggleCollapse() {
        if (this.descriptioOpened) {
          this.descriptioOpened = false
          this.collapseTriggerText = 'Развернуть'
          this.collapseStyle = {}
        }
        else {
          this.descriptioOpened = true
          this.collapseTriggerText = 'Свернуть'
          const height = this.$refs.description.scrollHeight
          this.collapseStyle = { 'max-height': `${height}px`}
        }
      },

      onPopQuestion() {
        this.$modal.show('modal', {
          requestType: 'chesscall'
        })
      },

      onBook() {
        this.$modal.show('modal', {
          requestType: 'chessres'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .close {
    color: white;
    background-color: rgba(#e73232, .5);
  }
</style>
