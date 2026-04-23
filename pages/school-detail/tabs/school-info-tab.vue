<template>
	<view class="school-info-tab">
		<view class="basic-section">
			<image class="logo" :src="school.logo" mode="aspectFill"></image>
			<view class="base-right">
				<text class="name">{{ school.name }}</text>
				<view class="tag-row">
					<text class="tag" v-for="item in school.tags" :key="item">{{ item }}</text>
				</view>
			</view>
		</view>

		<view class="divider"></view>

		<view class="contact-section">
			<view class="line-item">
				<uni-icons type="location" size="17" color="#6e7b98"></uni-icons>
				<text>{{ school.address }}</text>
			</view>
			<view class="line-item">
				<uni-icons type="phone" size="17" color="#6e7b98"></uni-icons>
				<text>{{ school.phone }}</text>
			</view>
		</view>

		<view class="divider"></view>

		<view class="intro-section">
			<text class="intro-title">学校简介</text>
			<rich-text :nodes="school.introHtml"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'SchoolInfoTab',
	props: {
		school: {
			type: Object,
			required: true
		}
	}
}
</script>

<style>
.school-info-tab { padding: 22rpx 24rpx 40rpx; }
.basic-section { display: flex; gap: 18rpx; align-items: center; }
.logo { width: 110rpx; height: 110rpx; border-radius: 16rpx; }
.base-right { flex: 1; min-width: 0; }
.name { font-size: 34rpx; font-weight: 700; color: #1f2433; line-height: 1.4; }
.tag-row { margin-top: 10rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.tag { padding: 8rpx 14rpx; border-radius: 999rpx; background: #eef3ff; color: #4369f5; font-size: 21rpx; }
.divider { height: 2rpx; background: #e8edf7; margin: 22rpx 0; }
.contact-section { display: flex; flex-direction: column; gap: 14rpx; }
.line-item { display: flex; align-items: center; gap: 12rpx; color: #55617c; font-size: 24rpx; line-height: 1.7; }
.intro-title { font-size: 29rpx; font-weight: 700; color: #1f2433; margin-bottom: 14rpx; display: block; }
.intro-section { color: #4f5a76; font-size: 24rpx; line-height: 1.85; }
</style>
