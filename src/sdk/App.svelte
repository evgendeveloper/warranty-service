<script>
  const IS_DEV = process.env.NODE_ENV === 'development'
  const url = IS_DEV ?
    'http://localhost:8080/app/' :
    'https://warranty-service.netlify.app/app/' //'https://c4d-warranty.netlify.app/app/'

  const queryForInjected = new URLSearchParams(C4DWarranty.config)

  C4DWarranty.config.type = 'widget'

  const query = new URLSearchParams(C4DWarranty.config)
  let isShow = false //IS_DEV

  const widget = C4DWarranty.config.widget || {}
  const btnCaption = (widget.button||{}).caption || `Вопрос`
  const btnSize = `${(widget.button||{}).size}px`
  const btnBg = (widget.button||{}).background || '#FF5252'
  const btnColor = (widget.button||{}).color || '#FFFFFF'
  const fontSize = (widget.button||{}).fontSize || 10

  let iframeHeight

  const htmlInjectedEl = document.querySelector('[c4d-warranty]')
  const frameIn = document.createElement('iframe')

  frameIn.src = `${url}?${queryForInjected}`
  frameIn.name = 'C4DWarrantyInject'
  frameIn.width = '100%'
  frameIn.frameBorder = 'none'

  if (htmlInjectedEl) {
    htmlInjectedEl.appendChild(frameIn)
  }

  export const showWidget = _ => (isShow = true)
  export const closeWidget = _ => methods._$is_closeWidget()

  /**
   * Получение данных из виджета (../app/App.vue)
   */
  window.addEventListener('message', async event => {
    try {
      // if (IS_DEV) console.log('Recieve postmessage to insert script SITE: ', event)
      const { method, payload } = event.data
      if (methods[method]) await methods[method](payload)
    }
    catch (e) {
      console.error(e)
    }
  })

  /**
   * Отправка данных в виджет
   * @param payload
   * @param origin
   */
  const postMessage = (payload, origin = '*') => {
    try {
      if (window.frames.C4DWarrantyFrame) throw new Error('фрейм виджета еще не создан')

      window.frames.C4DWarrantyFrame.postMessage(payload, origin)
    }
    catch (e) {
      console.error(e);
    }
  }

  const methods = {
    _$is_setFrameSize({ height, context }) {
      iframeHeight = height
      const frame = (document.getElementsByName(context)||[])[0]
      if (frame) frame.style.height = `${height}px`
    },

    _$is_closeWidget() {
      isShow = false
    },
    
    _$is_getLocationParam(key) {
      postMessage({
        method: '_$ws_setLocationParam',
        payload: {
          [key]: location[key]
        }
      })
    }
  }

  document.addEventListener('click', event => {
    const a = event.target.closest('a')

    if (!a) return

    const { href } = a

    if (!href || href.indexOf('c4dWarranty') == -1) return

    showWidget()

    event.preventDefault()
  })

</script>

{#if widget.enabled}
<div id="crm4dev-app">
  {#if widget.button && widget.button.enabled}
  <a
    href="#"
    style="width: {btnSize}; height: {btnSize}; background: {btnBg}; color: {btnColor}; font-size: {`${fontSize}px`}"
    class="crm4dev-btn"
    on:click|preventDefault={() => isShow = true}
  >
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'><path fill='#fff' d='M472 440h-48V144a8 8 0 00-8-8H280V32a8 8 0 00-8-8H64a8 8 0 00-8 8v408H8a8 8 0 000 16h464a8 8 0 000-16zm-208 0H72V40h192v400zm144 0H280V152h128v288z'/><path fill='#fff' d='M320 232h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM320 312h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM320 392h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM184 232h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM184 152h48a8 8 0 008-8V96a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM184 312h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM184 392h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM104 232h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM104 152h48a8 8 0 008-8V96a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM104 312h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32zM104 392h48a8 8 0 008-8v-48a8 8 0 00-8-8h-48a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32v32h-32v-32z'/></svg>
    <span>{@html btnCaption }</span>
  </a>
  {/if}
  <div class="crm4dev-modal {isShow && 'is-opened'}">
    <div class="crm4dev__content">
      <a class="crm4dev-close" on:click|preventDefault={() => isShow = false}><i></i></a>
      <iframe
        src="{`${url}?${query}`}" name="C4DWarrantyFrame" width="100%" height="{iframeHeight}"
        frameborder="0" allowtransparency="true" allow="autoplay" title="CRM4DEV"
      ></iframe>
    </div>
  </div>
</div>
{/if}

<style>
  #crm4dev-app {
    line-height: normal;
  }
  #crm4dev-app *,
  #crm4dev-app *::before,
  #crm4dev-app *::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  #crm4dev-app .crm4dev-modal {
    position: fixed;
    z-index: 9999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    transition: all .225s ease-in-out;
    will-change: opacity, visibility, transform;
    padding: 10px;
  }
  #crm4dev-app .crm4dev-modal.is-opened {
    visibility: visible;
    pointer-events: initial;
    opacity: 1;
  }
  #crm4dev-app .crm4dev__content {
    overflow: hidden;
    width: 480px;
    /*flex-grow: 1;*/
    border-radius: 10px;
    position: relative;
  }
  #crm4dev-app .crm4dev-close {
    text-decoration: none;
    transform: rotate(0);
    transform-origin: 50% 50%;
    transition: all .225s ease-in-out;
    line-height: 0;
    padding: 8px;
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.15);
    display: block;
    cursor: pointer;
  }
  #crm4dev-app .crm4dev-close:hover {
    transform: rotate(180deg);
  }
  #crm4dev-app .crm4dev-close i {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    width: 7px;
    height: 7px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 409.806 409.806'%3E%3Cpath d='M228.929 205.01L404.596 29.343c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42L204.796 180.878 29.129 5.21c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.713L180.664 205.01 4.997 380.677c-6.663 6.664-6.663 17.468 0 24.132 6.664 6.662 17.468 6.662 24.132 0l175.667-175.667 175.667 175.667c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L228.929 205.01z'/%3E%3C/svg%3E");
  }

  #crm4dev-app .crm4dev-btn svg {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
    height: 50%;
    opacity: .75;
  }
  #crm4dev-app .crm4dev-btn span {
    font-size: 1em;
    text-transform: uppercase;
    margin-top: 3%;
    letter-spacing: .05em;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  #crm4dev-app .crm4dev-btn {
    text-align: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 990;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: rgba(255, 82, 82, 1);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }

    70% {
      box-shadow: 0 0 0 20px rgba(255, 82, 82, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }

  #crm4dev-app iframe {
    width: 1px;
    min-width: 100%;
    *width: 100%;
    max-height: 100%;
  }

  @media screen and (min-width: 960px) {
    #crm4dev-app .crm4dev-modal {
      padding: 18px;
    }
  }

  @media screen and (max-width: 960px) {
    #crm4dev-app .crm4dev-btn {
      font-size: 8px !important;
      width: 80px !important;
      height: 80px !important;
    }
  }
</style>
