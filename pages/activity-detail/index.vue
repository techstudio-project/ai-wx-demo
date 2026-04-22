<template>
	<view class="detail-page">
		<view class="title">{{ name }}</view>
		<view class="content">这里是活动详情页示例，可接入活动时间、报名须知、支付与退费规则等完整信息。</view>
	</view>
</template>

<script>
export default {
	data() {
		return { name: '活动详情' }
	},
	onLoad(options) {
		if (options.name) this.name = decodeURIComponent(options.name)
	}
}
</script>

<style>
.detail-page { padding: 30rpx; }
.title { font-size: 34rpx; font-weight: 600; color: #1f2333; }
.content { margin-top: 18rpx; font-size: 26rpx; color: #636b82; line-height: 1.8; }
</style>
