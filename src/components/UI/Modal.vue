<template>
	<div class="modal_background" v-if="show" @click="closeModal">
		<div class="modal" @click.stop>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface IProps {
	show: boolean;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'ModalWindow',
	methods: {
		closeModal() {
			this.$emit('update:show', false);
		}
	}
};
</script>

<style>
.modal_background {
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
}

.modal {
	margin: auto;
	background-color: aliceblue;
	min-height: 30vh;
	min-width: 70vw;
	border-radius: 20px;
}
</style>
