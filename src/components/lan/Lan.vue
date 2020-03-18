<template>
    <span>{{language === "English" ? en : cn}}</span>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('situation');
export default {
  name: 'lan',

  props: ['cn', 'en'],

  computed: {
    ...mapState(['language']),
  },
};
</script>

<style scoped lan='stylus'>

</style>
