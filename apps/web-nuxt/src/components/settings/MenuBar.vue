<template>
  <div class="rounded-lg bg-white mb-0 border-r border-surface-100">
    <h2 class="font-semibold text-surface-600 text-2xl pl-11 pt-10 pb-2">
      {{ $t('Cp_settings.settings') }}
    </h2>

    <div class="flex flex-col justify-between  h-full overflow-y-scroll w-64 pb-5 no-scrollbar">
      <ul class="mb-24">
        <li
          v-for="items in settingItems" :key="items.title"
          class="cursor-pointer flex flex-col mt-2  w-full mr-4 "
        >
          <div
            :key="items.title"
            class="flex px-1 py-3 ml-1"
            :class="{ 'hover:bg-surface-100 ': settingsBaseRoute !== `/settings${items.route}`, 'text-primaryBlue ': currentTitle === items.title }"
            @click="navigate(items)"
          >
            <span
              class="text-lg font-normal ml-2 font-poppins"
              :class="{ 'text-surface-600': items.isHovered, 'text-primaryBlue': currentTitle === items.title || settingsBaseRoute === items.route, 'text-gray-500': !items.isHovered }"
            >{{ $t(`Cp_settings.${items.translationKey}`) }}</span>
          </div>
          <div class="mt-1">
            <ul>
              <li v-for="subItem in items.subitems">
                <div :key="subItem.title" class="ml-6">
                  <a class="flex py-2 pl-2 hover:bg-surface-100 items-center font-poppins" @click="navigate(subItem, items.route)">
                    <font-awesome-icon v-if=" currentTitle === subItem.title " :icon="fal[subItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" />
                    <font-awesome-icon v-else :icon="fal[subItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" />

                    <p
                      class="text-base font-normal ml-3 text-gray-500"
                      :class="{ 'text-primaryBlue ': currentTitle === subItem.title }"
                    >
                      {{ $t(`Cp_settings.${subItem.translationKey}`) }}
                    </p>
                  </a>

                  <ul>
                    <li>
                      <div
                        v-for="(subSubItem, index) in subItem.subitems"
                        :key="subSubItem.title"
                        class="flex ml-6 py-2 pl-2 hover:bg-surface-100 font-poppins"
                        @click="navigate(subSubItem, items.route)"
                      >
                        <font-awesome-icon v-if="currentTitle === subSubItem.title" :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #009EE2;" class="py-1 w-5" />
                        <font-awesome-icon v-else :icon="fal[subSubItem.fontawesome]" size="sm" style="color: #6b7280;" class="py-1 w-5" />
                        <p
                          class="text-base font-normal ml-2 text-gray-500"
                          :class="{ 'text-primaryBlue ': currentTitle === subSubItem.title }"
                        >
                          {{ $t(`Cp_settings.${subSubItem.translationKey}`) }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { useSettingItems } from '../../composables/useSettingItems'

const currentTitle = ref('')
const { settingItems } = useSettingItems()

const router = useRouter()

const settingsBaseRoute = ref(router.currentRoute.value.path)

onMounted(() => {
  router.afterEach((to, from) => {
    settingsBaseRoute.value = to.path
  })
})

function navigate(item, baseRoute = '') {
  const route = baseRoute + item.route
  currentTitle.value = item.title

  console.log("base route ",baseRoute, " item ",item, " route ",route," currentTitle",currentTitle.value)
  router.push(route)
  if (route.includes('#')) {
    const targetId = route.split('#')[1]
    const targetElement = document.getElementById(targetId)

    if (targetElement)
      targetElement.scrollIntoView({ behavior: 'smooth' })
      const event = new CustomEvent('set-active-index', { detail: targetId })
      window.dispatchEvent(event)
  }
  settingsBaseRoute.value = route
}
</script>
