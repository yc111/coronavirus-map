<template>
    <div>
      <Timeline/>
      <Dashboard/>
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import Dashboard from '../../components/Dashboard.vue';
import Timeline from '../../components/Timeline.vue';
import { getCurentDate } from '../../utils/dateHandle';

const { mapActions } = createNamespacedHelpers('situation');
export default {
  name: 'situation',

  components: {
    Dashboard,
    Timeline,
  },
  methods: {
    ...mapActions([types.SET_WORLDDATA]),
  },
  mounted() {
    this[types.SET_WORLDDATA](getCurentDate());
  },
};
</script>
