<template>
  <Responsive v-if="Array.isArray(data) && data.length > 0" class="w-full">
    <template #main="{ width }">
      <Chart
        data-test="finance-pie-chart"
        direction="circular"
        :size="{ width, height: 400 }"
        :data="data"
        :margin="{
          left: Math.round((width - 360) / 2),
          top: 20,
          right: 0,
          bottom: 20,
        }"
        :axis="axis"
        :config="{ controlHover: false }"
      >
        <template #layers>
          <Pie
            data-test="pie-segment"
            :dataKeys="['type', 'amount', 'date']"
            :pie-style="{ innerRadius: 100, padAngle: 0.05 }"
          />
        </template>
        <template #widgets>
          <Tooltip
            data-test="tooltip"
            :config="{
              id: { hide: true },
              type: { label: 'Type' },
              category: { label: 'Category' },
              currency: { hide: true },
              amount: { label: 'Amount' },
              date: { label: 'Transaction-Date' },
            }"
            hideLine
          />
        </template>
      </Chart>
    </template>
  </Responsive>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
// import type IPlByMonth from "../../interfaces/PlByMonth";
import { Chart, Responsive, Pie, Tooltip } from "vue3-charts";
import { useStore } from "vuex";

export default defineComponent({
  components: { Chart, Responsive, Pie, Tooltip },
  // props: {
  //   plByMonth: {
  //     type: Array<IPlByMonth>,
  //     required: true,
  //   },
  // },
  setup(props) {
    const store = useStore();
    const transactionsList = computed(() => {
      return store.state.filteredTransactions.length > 0
        ? store.state.filteredTransactions
        : store.state.transactions;
    });
    const data = computed(() =>
      transactionsList.value.filter((item) => item.type === "expense")
    );

    return {
      data,
    };
  },
});
</script>
