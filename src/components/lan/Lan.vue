<template>
    <span>{{language === "en" ? en : zh}}</span>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('situation');
export default {
  name: 'lan',

  props: ['zh', 'en'],

  computed: {
    ...mapState(['language']),
  },
};
</script>

<style scoped lan='stylus'>

</style>
