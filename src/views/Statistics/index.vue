<template>
    <div>
        <Map/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Map from '../../components/Map.vue';
import * as types from '../../store/actions-type';

const { mapActions } = createNamespacedHelpers('situation');
export default {
  components: {
    Map,
  },
  methods: {
    ...mapActions([types.SET_PROVINCEDATA]),
  },
  mounted() {
    try {
      this[types.SET_PROVINCEDATA]();
    } catch (e) {
      throw new Error();
    }
  },
};
</script>
