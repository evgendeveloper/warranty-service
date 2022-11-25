<template>
  <div class="b-page pos-r">
    <main v-if="!isLoading" class="d-flex flex-grow-1 pos-rel">
      <div
        class="content flex-grow-1 py-10"
        :class="{'px-8': mq.mdAndUp, 'px-4': mq.mdAndDown}"
      >
        <div v-if="!!sentResult" class="pa-15 pb-10">
          <div v-if="sentResult.number" class="d-flex flex-column align-center">
            <svg style="width: 35%;fill: #02C39E;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496"><path d="M248 0C111.033 0 0 111.033 0 248s111.033 248 248 248 248-111.033 248-248C495.841 111.099 384.901.159 248 0zm0 480C119.87 480 16 376.13 16 248S119.87 16 248 16s232 103.87 232 232c-.141 128.072-103.928 231.859-232 232z"/><path d="M370.344 158.344L208 320.688l-82.344-82.344a8 8 0 00-11.312 11.312l88 88a8 8 0 0011.312 0l168-168a8 8 0 00-11.312-11.312z"/></svg>
            <div class="text-subtitle-2 font-weight-400 mt-15">
              Номер заявки: <b>{{ sentResult.number }}</b><br>
              Дата: <b>{{ sentResult.date | formatDateTime }}</b>
            </div>
          </div>
          <div v-else class="d-flex flex-column align-center">
            <svg style="width: 35%;fill: #DC3545;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496"><path d="M248 0C111.033 0 0 111.033 0 248s111.033 248 248 248 248-111.033 248-248C495.841 111.099 384.901.159 248 0zm0 480C119.87 480 16 376.13 16 248S119.87 16 248 16s232 103.87 232 232c-.141 128.072-103.928 231.859-232 232z"/><path d="M361.136 134.864a8 8 0 00-11.312 0L248 236.688 146.176 134.864a8 8 0 10-11.312 11.312L236.688 248 134.864 349.824a8 8 0 00-.196 11.312 8 8 0 0011.508 0L248 259.312l101.824 101.824a8 8 0 0011.312-.196 8 8 0 000-11.116L259.312 248l101.824-101.824a8 8 0 000-11.312z"/></svg>
            <div class="text-subtitle-2 font-weight-400 mt-15">
              {{ sentResult.error }}
            </div>
          </div>
          <a
            @click.prevent="sentResult = null" href="#"
            class="d-block text-body-2 tt-uppersace has-opacity-65 has-text-primary text-center mt-15"
          >закрыть</a>
        </div>
        <div v-else class="px-15 pt-5 pb-10">
          <form @submit.prevent="onSearchRequest" class="mb-15">
            <label class="d-block text-body-2 has-opacity-65 mb-2 pl-10" for="search">Узнать статус заявки</label>
            <div class="search-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg"><path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.947 9.947 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.947 9.947 0 0 0 23 13c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"/></svg>
              <input
                id="search"
                type="text"
                v-model="search"
                placeholder="Введите номер заявки"
                class="e-input-field is-search full-width"
              >
              <a
                href="#" @click.prevent="onSearchRequest"
                :class="{'is-active': !!search, 'is-loading': isLoadingSearch}" class="e-btn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </a>
            </div>
          </form>
          <div v-if="statusRequest" class="d-flex flex-column align-center pa-15 pb-10">
            <svg v-if="statusRequest === 'fail'" style="width: 35%;fill: #DC3545;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496"><path d="M248 0C111.033 0 0 111.033 0 248s111.033 248 248 248 248-111.033 248-248C495.841 111.099 384.901.159 248 0zm0 480C119.87 480 16 376.13 16 248S119.87 16 248 16s232 103.87 232 232c-.141 128.072-103.928 231.859-232 232z"/><path d="M361.136 134.864a8 8 0 00-11.312 0L248 236.688 146.176 134.864a8 8 0 10-11.312 11.312L236.688 248 134.864 349.824a8 8 0 00-.196 11.312 8 8 0 0011.508 0L248 259.312l101.824 101.824a8 8 0 0011.312-.196 8 8 0 000-11.116L259.312 248l101.824-101.824a8 8 0 000-11.312z"/></svg>
            <div v-if="statusRequest === 'fail'" class="text-subtitle-2 font-weight-400 mt-15">
              Неудалось отправить запрос
            </div>
            <div v-else>
              <div class="text-subtitle-2 font-weight-400 pb-15">
                Статус заявки №{{ search }} - <b>{{ statusRequest.status }}</b>,<br>плановая дата завершения <b>{{ statusRequest.date }}</b>
              </div>
            </div>
            <a
              @click.prevent="statusRequest = null" href="#"
              class="d-block text-body-2 tt-uppersace has-opacity-65 has-text-primary text-center mt-15"
            >закрыть</a>
          </div>

          <form v-else keep-alive @submit.prevent="onSendRequest">
            <div class="text-h2 mb-15">Оставить заявку<br>на устранение проблемы</div>
            <div class="mb-5">
              <label class="d-block text-body-2 has-opacity-65 mb-2" for="name">Имя</label>
              <input
                type="text" id="name"
                placeholder="Дмитрий"
                v-model="warrantyRequest.name"
                class="e-input-field full-width"
                required
              >
            </div>
            <div class="mb-5">
              <label class="d-block text-body-2 has-opacity-65 mb-2" for="phone">Номер телефона</label>
              <input
                type="tel" id="phone"
                placeholder="+7 (999) 999-99-99"
                v-mask="'+7 (###) ###-##-##'"
                v-model="warrantyRequest.phone"
                class="e-input-field full-width"
                required
              >
            </div>
            <div class="mb-5">
              <label class="d-block text-body-2 has-opacity-65 mb-2" for="email">Email</label>
              <input
                type="tel" id="email"
                placeholder="example@domain.tld"
                v-model="warrantyRequest.email"
                class="e-input-field full-width"
                required
              >
            </div>
            <div class="mb-5" :class="{'is-loading-districts': isLoadingDistricts}">
              <div class="mb-5">
                <label class="d-block text-body-2 has-opacity-65 mb-2" for="district">Жилой комплекс</label>
                <select
                  id="district"
                  class="e-input-field full-width"
                  v-model="warrantyRequest.district"
                >
                  <option v-if="districts.length === 0">Выберите свой</option>
                  <option v-else v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
                </select>
              </div>
              <div class="mb-5">
                <label class="d-block text-body-2 has-opacity-65 mb-2" for="house-number">Дом</label>
                <select
                  id="house-number"
                  class="e-input-field full-width"
                  v-model="warrantyRequest.house"
                >
                  <option v-if="objects.length === 0">Выберите свой</option>
                  <option v-else v-for="object in objects" :key="object.id" :value="object.id">{{ object.name }}</option>
                </select>
              </div>
              <div class="mb-5">
                <label class="d-block text-body-2 has-opacity-65 mb-2" for="type-property">Вид недвижимости</label>
                <select
                  id="type-property"
                  class="e-input-field full-width"
                  v-model="warrantyRequest.estate_kind"
                >
                  <option v-if="typesProperty.length === 0">Выберите вид</option>
                  <option v-else v-for="typeProperty in typesProperty" :key="typeProperty.id" :value="typeProperty.id">{{ typeProperty.type }}</option>
                </select>
              </div>
              <div>
                <label class="d-block text-body-2 has-opacity-65 mb-2" for="entrance">Подъезд</label>
                <select
                  id="entrance"
                  class="e-input-field full-width"
                  v-model="warrantyRequest.entrance"
                >
                  <option v-if="sections.length === 0">Выберите свой</option>
                  <option v-else v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
                </select>
              </div>
            </div>
            <div class="mb-5">
              <label class="d-block text-body-2 has-opacity-65 mb-2" for="apartment-number">Номер квартиры</label>
              <input
                type="tel" id="apartment-number"
                placeholder="212"
                v-model="warrantyRequest.apartment"
                class="e-input-field full-width"
                required
              >
            </div>
            <div class="mb-15" style="margin: 0 -45px;">
              <div style="background: #f6f6f6;padding: 20px 25px">
                <label class="d-block text-body-2 tt-uppersace has-opacity-65 mb-5 px-10">Список работ</label>
                <div class="pa-10 pb-5 c4d-service" v-for="(task, $ind) in warrantyRequest.tasks" :key="`t${$ind}`">
                  <div class="mb-5">
                    <label class="d-block text-body-2 has-opacity-65 mb-2">Вид работы</label>
                    <select
                      class="e-input-field full-width"
                      @change="task.typeService = $event.target.value"
                    >
                      <option v-if="typesService.length === 0">Выберите услугу</option>
                      <option v-else v-for="typeService in typesService" :key="typeService.id" :value="typeService.id">{{ typeService.name }}</option>
                    </select>
                  </div>
                  <div class="mb-5">
                    <label class="d-block text-body-2 has-opacity-65 mb-2">Приложить фото</label>
                    <input type="file" accept="image/*" @change="onAddPhoto($ind, $event)" class="e-btn is-black full-width">
                    <img v-if="task.previewPhoto" :src="task.previewPhoto" class="mt-5" alt="">
                  </div>
                  <div class="mb-5">
                    <label class="d-block text-body-2 has-opacity-65 mb-2">Комментарий</label>
                    <textarea class="e-input-field full-width" rows="3" v-model="warrantyRequest.tasks[$ind].comment" required></textarea>
                  </div>
                  <div class="d-flex align-center">
                    <a href="#" v-if="$ind >= warrantyRequest.tasks.length-1" @click.prevent="onAddTask" class="e-btn full-width tt-uppersace text-body-2">Добавить еще</a>
                    <a
                      v-if="warrantyRequest.tasks.length > 1"
                      href="#" @click.prevent="onDeleteTask($ind)"
                      class="e-btn has-text-red full-width tt-uppersace text-body-2"
                    >Удалить</a>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="e-btn is-primary full-width mb-5"
              :class="{'is-loading': isSending}"
              @submit="onSendRequest"
              :disabled="isSending || !warrantyRequest.phone || !warrantyRequest.name || !warrantyRequest.email || !warrantyRequest.apartment"
            >Отправить</button>
            <div class="text-body-2 has-opacity-45">Нажимая «Отправить», Вы соглашаетесь предоставить Вашу информацию на обработку</div>
          </form>
        </div>
      </div>
    </main>

    <div class="loader" v-else :class="loadingClasses">
      <div>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 137.7 46.56" xml:space="preserve"><path class="st0" d="M126.49 3.07l-11.54 28.37-11.48-28.37h-8.95l16.55 39.63h7.66l16.54-39.63zM103.27 35.33H78.85V25.2h20.19l-2.99-7.15h-17.2v-7.6h14.03l-3.03-7.26H66.69v.57c1.14.72 2.22 1.53 3.23 2.45 4.72 4.33 7.12 9.94 7.12 16.68 0 6.78-2.4 12.41-7.12 16.73-1.01.92-2.09 1.72-3.23 2.45v.52h39.61l-3.03-7.26z"/><path d="M22.68 34.96H3.72L2.34 28.8 23.63 3.66h7.21V27.9h12.91v7.06H30.83v8.53h-8.15v-8.53zm0-7.06V15.58L12.37 27.9h10.31z" fill="#32addf"/><path class="st0" d="M65.79 8.7c-4-3.66-9.23-5.52-15.59-5.52H35.46v21.54h8.11V10.45h5.97c8.78 0 13.96 4.62 13.96 12.44 0 7.82-5.18 12.44-13.96 12.44H47.7v7.26h2.52c6.36 0 11.6-1.8 15.59-5.46 4-3.66 6.02-8.44 6.02-14.24-.01-5.8-2.04-10.53-6.04-14.19z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import debounce from 'lodash/debounce'

  export default {
    data: () => ({
      isLoadingSearch: false,
      isLoadingDistricts: false,
      isLoading: true, // global loading
      isSending: false,
      sentResult: null,
      loadingClasses: [],

      search: '',
      statusRequest: null,

      warrantyRequest: {
        name: '',
        phone: '',
        email: '',
        district: null,
        house: null,
        entrance: null,
        apartment: '',
        estate_kind: null,
        tasks: [
          {
            typeService: null,
            comment: '',
            photo: null,
            previewPhoto: null
          }
        ],
      }
    }),

    computed: {
      ...mapState({
        districts: state => state.chess.districts,
        objects: state => state.chess.objects,
        sections: state => state.chess.sections,
        typesService: state => state.chess.typesService,
        typesProperty: state => state.chess.typesProperty,
        parentLocation: state => state.parentLocation,
      }),
      ...mapGetters([
        'mq'
      ]),
      // modelDistrict: {
      //   get: vm => {
      //     const district = vm.districts.find(district => district.selected)
      //     if (!district) return null

      //     vm.warrantyRequest.district = district.id
      //     return district
      //   },
      //   async set({ id }) {
      //     this.isLoadingDistricts = true
      //     await this.$store.dispatch('chess/selectDistrict', id)
      //     this.warrantyRequest.district = id
      //     this.isLoadingDistricts = false
      //   }
      // },
      // modelHouseNumber: {
      //   get: vm => {
      //     const object = vm.objects.find(object => object.selected)
      //     if (!object) return null

      //     vm.warrantyRequest.house = object.id
      //     return object
      //   },
      //   async set({ id }) {
      //     this.isLoadingDistricts = true
      //     await this.$store.dispatch('chess/selectObject', id)
      //     this.warrantyRequest.house = id
      //     this.isLoadingDistricts = false
      //   }
      // },
      // modelEntrance: {
      //   get: vm => {
      //     const section = vm.sections.find(section => section.selected)
      //     if (!section) return null

      //     vm.warrantyRequest.entrance = section.id
      //     return section
      //   },
      //   async set({ id }) {
      //     this.$store.commit('chess/selectSection', id)
      //     this.warrantyRequest.entrance = id
      //   }
      // }
    },

    watch: {
      isLoading: {
        handler(value) {
          if (value)
            setTimeout(_ => this.loadingClasses.push('is-loading'), 50)
          else this.loadingClasses = []
        },
        immediate: true
      },

      async ['warrantyRequest.district'](id) {
        this.isLoadingDistricts = true
        await this.$store.dispatch('chess/selectDistrict', id)
        this.isLoadingDistricts = false
      },

      async ['warrantyRequest.house'](id) {
        this.isLoadingDistricts = true
        await this.$store.dispatch('chess/selectObject', id)
        this.isLoadingDistricts = false
      },

      async ['warrantyRequest.entrance'](id) {
        await this.$store.commit('chess/selectSection', id)
      },

      typesService: {
        handler(value) {
          if (value && value.length > 0) this.warrantyRequest.tasks[0].typeService = value[0].id
        },
        immediate: true
      },
      // typesProperty: {
      //   handler(value) {
      //     if (value && value.length > 0) this.warrantyRequest.estate_kind = value[0].id
      //   },
      //   immediate: true
      // },
      sentResult: 'setInjectFrameSizes',
      statusRequest: 'setInjectFrameSizes',
      mq: {
        async handler(bp) {
          if (bp.mdAndUp) {}
        },
      }
    },

    async created() {
      try {
        /**
         * Получение данных со скрипта вставки (App.svelte)
         * namespace: _$is_{methodName} - from InsertScript
         * namespace: _$ws_{methodName} - to WidgetScript
         */
        window.addEventListener('message', this.messageListener)
        window.addEventListener('resize', debounce(this.resizeListener, 100, { trailing: true }))
        await this.init()
      }
      catch (e) {
        console.error(e)
      }
    },

    beforeDestroy() {
      window.removeEventListener('message', this.messageListener)
      window.removeEventListener('resize', this.resizeListener)
    },

    methods: {
      /**
       * Отправка данных с виджета на сайт (скрипт вставку)
       * @param payload
       * @param origin
       */
      postMessage(payload, origin = '*') {
        try {
          if (!parent) throw new Error('nu pizdec')
          parent.postMessage(payload, origin)
        }
        catch (e) {
          console.error(e)
        }
      },

      async resizeListener() {
        this.$store.commit('set', { path: 'windowWidth', payload: window.outerWidth })
        await this.setInjectFrameSizes()
      },

      async setInjectFrameSizes() {
        await this.$forceNextTick()
        const context = this.$config.type ? '' : 'C4DWarrantyInject'
        const page = document.querySelector('.b-page')
        this.postMessage({
          method: '_$is_setFrameSize',
          payload: {
            context,
            height: page ? page.scrollHeight : document.body.scrollHeight,
          }
        })
      },

      async messageListener(event) {
        // if (IS_DEV) console.log('WIDGET: ', event)
        try {
          // const { protocol, host } = parse(this.siteUrl)
          // if (process.env.NODE_ENV === 'production')
          //   if (this.siteUrl && event.origin != `${protocol}//${host}`)
          //     throw new Error('blocked cross origin')

          const { method, payload } = event.data
          await this.$store.dispatch(method, payload)
        }
        catch (e) {
          // console.warn(e)
        }
      },

      async init() {
        try {
          this.isLoading = true
          await Promise.all([
            this.$store.dispatch('chess/selectDistrict', this.$config.district),
            this.$store.dispatch('chess/getTypesService'),
            this.$store.dispatch('chess/getTypesProperty')
          ])
        }
        catch(error) {

        }
        finally {
          this.isLoading = false
          await this.setInjectFrameSizes()
        }
      },

      async onCloseWidget() {
        this.postMessage({
          method: '_$is_closeWidget'
        })
      },

      async onAddTask() {
        this.warrantyRequest.tasks.push({
          typeService: this.typesService[0].id,
          comment: '',
          photo: null,
          previewPhoto: null
        })
        await this.setInjectFrameSizes()
      },

      async onDeleteTask(index) {
        this.warrantyRequest.tasks.splice(index, 1)
        await this.setInjectFrameSizes()
      },

      async onAddPhoto(index, event) {
        const file = event.target.files[0]
        const url = URL.createObjectURL(file)
        this.warrantyRequest.tasks[index].photo = file
        this.warrantyRequest.tasks[index].previewPhoto = url
        await this.setInjectFrameSizes()
      },

      toFormData(obj, form, namespace) {
        let fd = form || new FormData()
        let formKey

        for (let property in obj) {
          if (property === 'previewPhoto') continue
          if(obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
              formKey = namespace + '[' + property + ']'
            } else {
              formKey = property
            }

            // if the property is an object, but not a File, use recursivity.
            if (obj[property] instanceof Date) {
              fd.append(formKey, obj[property].toISOString())
            }
            else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
              this.toFormData(obj[property], fd, formKey)
            } else { // if it's a string or a File object
              fd.append(formKey, obj[property])
            }
          }
        }

        return fd
      },

      async onSendRequest() {
        try {
          this.isSending = true

          const { warrantyRequest } = this
          const data = {
            ...warrantyRequest,
            phone: warrantyRequest.phone.replace(/[^\d]/g, ''),
            tasks: warrantyRequest.tasks.map(
              task => ({
                typeService: task.typeService,
                comment: task.comment,
                photo: task.photo,
              })
            )
          }
          const formData = this.toFormData(data)
          const { Number: number, Date: date, Error: error } = await this.$http.$post('grnt', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

          if (error) {
            this.sentResult = { error }
            return Promise.resolve()
          }

          this.sentResult = { number, date }

          this.warrantyRequest.tasks = [{
            typeService: null,
            comment: '',
            photo: null,
            previewPhoto: null
          }]
        }
        catch (error) {
          this.sentResult = { error: 'Не удалось выполнить запрос' }
          console.warn(error)
        }
        finally {
          this.isSending = false
        }
      },

      async onSearchRequest() {
        try {
          this.isLoadingSearch = true
          const { search } = this
          const { status, data: date } = await this.$http.$get('/grntstatus', { params: {search} })
          this.statusRequest = {
            status, date
          }
        }
        catch(error) {
          console.log(error)
          this.statusRequest = 'fail'
        }
        finally {
          this.isLoadingSearch = false
          await this.setInjectFrameSizes()
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  .c4d-service {
    border-radius: 12px;
    background-color: #fff;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    img {
      width: 33%;
      border-radius: 16px;
      box-shadow: rgb(17 17 26 / 5%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
      object-fit: cover;
      height: 76px;
    }
  }
  .st0 {
    fill: #18214b;
  }
  .loader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(white, .85);

    svg {
      width: 100px;
      filter: grayscale(1);
      transform: scale(1.15);
      transition: all .5s ease-in-out;
    }

    &.is-loading svg {
      filter: grayscale(0);
      transform: scale(1);
    }
  }

  .search-wrapper {
    position: relative;

    &>svg {
      position: absolute;
      pointer-events: none;
      left: 10px;
      top: 50%;
      transform: translate(0, -50%) scale(.65);
      opacity: .15;
      width: 30px;
      height: 30px;
    }
    a {
      position: absolute;
      display: flex;
      height: 100%;
      padding: 0 10px;
      left: auto;
      right: 0;
      top: 0;
      align-items: center;
      border-radius: 20px;
      overflow: hidden;

      svg {
        transform: scale(.65);
        opacity: .25;
        width: 30px;
        height: 30px;
        transition: all .25s ease-in-out;
        will-change: transform, opacity;
      }

      &.is-active {
        svg {
          opacity: .5;
          transform: scale(.7);
        }
      }
      &.is-loading {
        &::before {
          background-color: lighten(#E7E7E7, 5);
        }
      }
    }
  }

  footer {
    padding: 8px;
    box-shadow: 0 -1px 10px 0px rgba(darken(#F8FAFC, 50),.09);
  }
</style>
