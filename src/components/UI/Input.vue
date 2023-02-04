<template>
	<input
		class="input"
		:value="modelValue"
		:placeholder="placeholder"
		@input="onInput"
		type="text"
	/>
</template>

<script setup lang="ts">
export interface IProps {
	placeholder: string;
	modelValue: string | number;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'InputItem',
	methods: {
		onInput(e: Event) {
			this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
		}
	}
};
</script>

<style>
.input {
	margin-top: 10px;
	height: 25px;
	border: 2px solid navy;
	border-radius: 5px;
	box-shadow: 5px 5px 5px gray;
}
</style>
