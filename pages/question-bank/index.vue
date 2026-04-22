<template>
	<view class="question-bank-page">
		<view class="placeholder-card">
			<text class="title">试题库</text>
			<text class="desc">题库内容建设中，后续将支持按科目、年级、难度筛选与智能组卷。</text>
		</view>
	</view>
</template>

<script>
export default {}
</script>

<style>
.question-bank-page { min-height: 100vh; box-sizing: border-box; padding: 24rpx 24rpx 150rpx; background: linear-gradient(180deg, #f4f7ff, #ffffff); }
.placeholder-card { margin-top: 30rpx; border-radius: 24rpx; background: #fff; padding: 36rpx 30rpx; box-shadow: 0 10rpx 30rpx rgba(29, 53, 126, 0.08); }
.title { font-size: 34rpx; color: #1f2433; font-weight: 700; }
.desc { display: block; margin-top: 16rpx; font-size: 25rpx; line-height: 1.6; color: #68738f; }
</style>
