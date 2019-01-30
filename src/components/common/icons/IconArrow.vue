<template>
  <svg
    :class="['icon-arrow', 'arrow-' + direction]"
    width=".11rem"
    height=".17rem"
    viewBox="0 0 11 17"
    version="1.1"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path
        d="M4.48528137,12.4852814 L14.4852814,12.4852814 L14.4852814,14.4852814 L4.48528137,14.4852814 L2.48528137,14.4852814 L2.48528137,2.48528137 L4.48528137,2.48528137 L4.48528137,12.4852814 Z"
        :fill="color"
        transform="translate(8.485281, 8.485281) rotate(-315.000000) translate(-8.485281, -8.485281)"
      />
    </g>
  </svg>
</template>
<script>
import Icon from './Icon'

export default {
  extends: Icon,
  props: {
    direction: {
      type: String,
      default: 'left'
    }
  }
}
</script>
<style lang="less">
.icon-arrow {
  transition: transform .15s;
}
.arrow-right {
  transform: rotate(-180deg);
}
.arrow-up {
  transform: rotate(-270deg);
}
.arrow-down {
  transform: rotate(-90deg);
}
</style>
