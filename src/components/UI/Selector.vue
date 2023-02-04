<template>
	<select @change="onChange" :value="modelValue">
		<option disabled value="">Search by...</option>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.title }}
		</option>
	</select>
</template>

<script setup lang="ts">
export interface IOptions {
	value: string;
	title: string;
}

export interface IProps {
	options: IOptions[];
	modelValue: string;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'SelectorItem',
	methods: {
		onChange(e: Event) {
			this.$emit('update:modelValue', (e.target as HTMLSelectElement).value);
		}
	}
};
</script>

<style>
select {
	min-width: 30vw;
	min-height: 5vh;
}
</style>
