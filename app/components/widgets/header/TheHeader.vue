<template>
  <header class="header">
    <app-container>
      <div class="header__main">
        <NuxtLink
          to="/"
          style="color: inherit; text-decoration: none"
        >
          <app-brand />
        </NuxtLink>
        <div class="header__actions">
          <app-nav
            :routes="commonRoutes"
            :capitalize="true"
            :icons="true"
            class="header__nav"
          />
          <app-burger
            v-model="isMenuOpen"
            class="header__burger"
          />
        </div>
      </div>
      <div class="header__under">
        <button
          class="header__catalog-btn"
          @click="catalogIsOpen = !catalogIsOpen"
        >
          <app-svg
            icon="catalog"
            class="header__catalog-svg"
          />
          <span> Каталог </span>
        </button>
      </div>
    </app-container>
    <transition>
      <the-header-catalog v-if="catalogIsOpen" />
    </transition>

    <app-overlay
      :is-open="catalogIsOpen"
      @action="catalogIsOpen = false"
    />
  </header>
</template>

<script setup lang="ts">
import type { TRoutes } from '~/components/shared/lib/types/routeLinks.type';
const isMenuOpen = ref(false);
const commonRoutes: TRoutes = [
  { name: 'cart', to: '/cart', title: 'корзина' },
  { name: 'bookmarks', to: '/bookmarks', title: 'закладки' },
  { name: 'profile', to: '/profile', title: 'профиль' },
];
const catalogIsOpen = ref<boolean>(false);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: var(--z-root);
  background-color: var(--bg-1);
  padding: 15px 0;

  &__burger {
    display: none;
  }
  &__main {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--ui-1);
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__under {
    padding-top: 15px;
  }
  &__catalog-svg {
    --svg-width: 17px;
    fill: var(--pink);
  }
  &__catalog-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    color: var(--text-1);
    background-color: inherit;
    font-size: 1.6rem;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity ease var(--t-3);
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
@include device('sm') {
  .header {
    padding: 5px;
    &__main {
      border: none;
      padding-bottom: 0;
    }
    &__under {
      display: none;
    }
    &__burger {
      display: flex;
    }
  }
}
</style>
