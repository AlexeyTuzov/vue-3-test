<template>
	<div class="wrapper">
		<div
			class="element"
			:class="{
				'active-element': page === currentPage
			}"
			v-for="page in totalCount"
			:key="page"
			@click="$emit('update:currentPage', page)"
		>
			{{ page }}
		</div>
	</div>
</template>

<script setup lang="ts">
export interface IProps {
	totalCount: number;
	currentPage: number;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'PaginationWrapper'
};
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-self: center;
}

.element {
	margin: 5px;
	padding: 2px 10px;
	border: 1px solid navy;
	border-radius: 50%;
	cursor: pointer;
}

.active-element {
	background-color: beige;
}
</style>
