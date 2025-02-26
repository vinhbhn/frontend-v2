<template>
  <div :class="['flex flex-col px-4 py-2', hasZeroBalance ? 'hidden' : '']">
    <BalRadio
      v-for="(type, i) in formTypes"
      :key="i"
      v-model="selected"
      :value="type.value"
      name="formType"
      class="py-2"
      :disabled="loading"
    >
      <template v-slot:label>
        <span>
          {{ type.label }}
        </span>
        <span v-if="!missingPrices" class="text-xs text-gray-500">
          ({{ `${type.max} ${$t('max').toLowerCase()}` }})
        </span>
        <BalTooltip v-if="type.tooltip">
          <template v-slot:activator>
            <BalIcon name="info" size="xs" class="text-gray-400 -mb-px ml-2" />
          </template>
          <div class="w-52">
            {{ type.tooltip }}
          </div>
        </BalTooltip>
      </template>
    </BalRadio>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

type FormTypes = 'proportional' | 'custom';

interface FormType {
  label: string;
  max: string;
  value: FormTypes;
  tooltip?: string;
}

export default defineComponent({
  name: 'TypeToggle',

  emits: ['update:modelValue'],

  props: {
    formTypes: { type: Object as PropType<FormType[]>, required: true },
    modelValue: { type: String, required: true },
    loading: { type: Boolean, default: false },
    hasZeroBalance: { type: Boolean, default: false },
    missingPrices: { type: Boolean, default: false }
  },

  setup(props, { emit }) {
    const selected = ref(props.formTypes[0].value);

    watch(selected, newVal => {
      emit('update:modelValue', newVal);
    });

    watch(
      () => props.modelValue,
      newVal => {
        if (selected.value != newVal) selected.value = newVal as FormTypes;
      }
    );

    return {
      selected
    };
  }
});
</script>
