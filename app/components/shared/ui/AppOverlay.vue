<template>
  <Teleport to="body">
    <transition name="overlay">
      <div
        v-if="isOpen"
        class="overlay"
        @click="$emit('action')"
      >
        <slot />
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const { isOpen = false } = defineProps<{
  isOpen?: boolean;
}>();
defineEmits<{
  action: [];
}>();
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-i, var(--z-max));
  background-color: rgba(0, 0, 0, 0.3);
}
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity ease var(--t-3);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
