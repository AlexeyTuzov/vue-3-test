<template>
	<button class="btn">
		{{ title }}
	</button>
</template>

<script setup lang="ts">
export interface IProps {
	title: string;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'ButtonItem'
};
</script>

<style>
.btn {
	background: none;
	color: navy;
	min-width: 80px;
	min-height: 30px;
	margin: 10px;
	align-self: flex-end;
	border: 2px solid navy;
	border-radius: 5px;
	box-shadow: 5px 5px 5px gray;
}
</style>
