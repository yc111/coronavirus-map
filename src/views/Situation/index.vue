<template>
    <div>
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';

const { mapActions } = createNamespacedHelpers('situation');
export default {
  name: 'situation',

  components: {
  },
  methods: {
    ...mapActions([types.SET_WORLDDATA]),
  },
  mounted() {
    this[types.SET_WORLDDATA]('2020-03-14');
  },
};
</script>
