<template>
	<div class="post">
		<div>
			<div>
				<strong>
					{{ post.title }}
				</strong>
			</div>
			<div>
				{{ post.body }}
			</div>
		</div>
		<div>
			<button-item title="Delete" @click="$emit('deletePost', post)" />
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Post {
	id: number;
	title: string;
	body: string;
}

export interface IProps {
	post: Post;
}

const props = defineProps<IProps>();
</script>

<script lang="ts">
export default {
	name: 'PostItem'
};
</script>

<style>
.post {
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
	padding: 10px;
	border: 2px solid navy;
	border-radius: 5px;
	box-sizing: border-box;
}
</style>
