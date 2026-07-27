<template>
  <div class="header-catalog__wrapper">
    <div class="container">
      <div class="header-catalog">
        <div class="header-catalog__col">
          <button
            v-for="category in categories"
            :key="category.href"
            class="header-catalog__btn"
            @click="handleClickLevel1(category)"
            @mouseenter="handleHoverLevel1(category)"
          >
            <span>
              {{ category.title }}
            </span>
            <app-svg
              icon="arrow"
              class="header-catalog__svg"
            />
          </button>
        </div>

        <div
          v-if="level2Categories.length || hoveredLevel1"
          class="header-catalog__col"
        >
          <app-link
            class="header-catalog__btn"
            :href="hoveredLevel1?.href ?? '/'"
          >
            <span> Перейти в категорию </span>
            <app-svg
              icon="arrow"
              class="header-catalog__svg"
            />
          </app-link>
          <button
            v-for="category in level2Categories"
            :key="category.href"
            class="header-catalog__btn"
            @click="handleClickLevel2(category)"
            @mouseenter="handleHoverLevel2(category)"
          >
            <span>
              {{ category.title }}
            </span>
            <app-svg
              icon="arrow"
              class="header-catalog__svg"
            />
          </button>
        </div>

        <div
          v-if="level3Categories.length || hoveredLevel2"
          class="header-catalog__col"
        >
          <app-link
            class="header-catalog__btn"
            :href="hoveredLevel2?.href ?? '/'"
          >
            <span> Перейти в категорию </span>
            <app-svg
              icon="arrow"
              class="header-catalog__svg"
            />
          </app-link>
          <app-link
            v-for="category in level3Categories"
            :key="category.href"
            class="header-catalog__btn"
            :href="category.href"
          >
            <span>
              {{ category.title }}
            </span>

            <app-svg
              icon="arrow"
              class="header-catalog__svg"
            />
          </app-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryTree, type CategoryModel } from '~/components/entities/category';

const categories = useCategoryTree();

const hoveredLevel1 = ref<CategoryModel | null>(null);
const hoveredLevel2 = ref<CategoryModel | null>(null);

const level2Categories = computed(() => hoveredLevel1.value?.children ?? []);
const level3Categories = computed(() => hoveredLevel2.value?.children ?? []);

const level1IsLocked = ref<boolean>(false);
const level2IsLocked = ref<boolean>(false);

function handleHoverLevel1(category: CategoryModel) {
  if (level1IsLocked.value) return;
  hoveredLevel1.value = category;
  hoveredLevel2.value = null;
}

function handleHoverLevel2(category: CategoryModel) {
  if (level2IsLocked.value) return;
  hoveredLevel2.value = category;
}

function handleClickLevel1(category: CategoryModel) {
  if (level1IsLocked.value && hoveredLevel1.value?.href === category.href) {
    level1IsLocked.value = false;
    level2IsLocked.value = false;
    hoveredLevel1.value = null;
    hoveredLevel2.value = null;
  } else {
    level1IsLocked.value = true;
    level2IsLocked.value = false;
    hoveredLevel1.value = category;
    hoveredLevel2.value = null;
  }
}

function handleClickLevel2(category: CategoryModel) {
  if (level2IsLocked.value && hoveredLevel2.value?.href === category.href) {
    level1IsLocked.value = true;
    level2IsLocked.value = false;
    hoveredLevel2.value = null;
  } else {
    level1IsLocked.value = true;
    level2IsLocked.value = true;
    hoveredLevel2.value = category;
  }
}
</script>

<style lang="scss" scoped>
.header-catalog {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  background-color: var(--ui-3);
  border-radius: 0 0 var(--b-r-2) var(--b-r-2);

  &__wrapper {
    position: absolute;
    top: 100%;
    z-index: var(--z-root);
    pointer-events: none;

    width: 100%;
    max-height: 600px;
    padding-top: 5px;
  }

  &__col {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    overflow-y: auto;
  }
  &__btn {
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 20px 0;
    background-color: inherit;
    color: var(--text-1);
    font-size: 1.6rem;
    &:hover {
      .header-catalog__svg {
        opacity: 1;
      }
    }
  }
  &__svg {
    --svg-width: 12px;
    opacity: 0.5;
    transition: opacity linear var(--t-2);
  }
}
</style>
