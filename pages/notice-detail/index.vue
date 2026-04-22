<template>
	<view class="detail-page">
		<view class="title">{{ title }}</view>
		<view class="content">这是公告详情页示例内容，可替换为后端返回的公告富文本内容。</view>
	</view>
</template>

<script>
export default {
	data() {
		return { title: '公告详情' }
	},
	onLoad(options) {
		if (options.title) this.title = decodeURIComponent(options.title)
	}
}
</script>

<style>
.detail-page { padding: 30rpx; }
.title { font-size: 34rpx; font-weight: 600; color: #1f2333; }
.content { margin-top: 18rpx; font-size: 26rpx; color: #636b82; line-height: 1.8; }
</style>
