<template>
  <div>
    <h2 class="fancy-header">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </h2>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.fancy-header {
  font-size: 2em;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 0.5em 0;
  border-bottom: 1px solid #333;
  background: pink;
}
</style>