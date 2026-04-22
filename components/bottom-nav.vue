<template>
	<view class="bottom-nav-wrap">
		<view class="bottom-nav">
			<view class="tab-item" :class="{ active: active === 'home' }" @click="go('/pages/index/index')">
				<uni-icons type="home" size="20" :color="active === 'home' ? '#3f5af2' : '#9aa3b8'" />
				<text>首页</text>
			</view>
			<view class="tab-item tab-mid" :class="{ active: active === 'bank' }" @click="go('/pages/question-bank/index')">
				<view class="mid-bulge">
					<uni-icons type="calendar" size="22" color="#fff" />
				</view>
				<text>试题库</text>
			</view>
			<view class="tab-item" :class="{ active: active === 'member' }" @click="go('/pages/mine/index')">
				<uni-icons type="person" size="20" :color="active === 'member' ? '#3f5af2' : '#9aa3b8'" />
				<text>会员</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		active: {
			type: String,
			default: 'home'
		}
	},
	methods: {
		go(url) {
			const current = `/${getCurrentPages().slice(-1)[0]?.route || ''}`
			if (current === url) {
				return
			}
			uni.reLaunch({ url })
		}
	}
}
</script>

<style>
.bottom-nav-wrap { position: fixed; left: 0; right: 0; bottom: 0; z-index: 99; padding: 0 22rpx 16rpx; pointer-events: none; }
.bottom-nav { height: 122rpx; background: #ffffff; border-radius: 30rpx; display: flex; align-items: flex-end; justify-content: space-around; box-shadow: 0 -6rpx 32rpx rgba(25, 48, 115, 0.12); pointer-events: auto; }
.tab-item { width: 180rpx; height: 94rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6rpx; font-size: 21rpx; color: #9aa3b8; }
.tab-item.active { color: #3f5af2; font-weight: 600; }
.tab-mid { position: relative; transform: translateY(-20rpx); }
.mid-bulge { width: 98rpx; height: 98rpx; border-radius: 50%; background: linear-gradient(135deg, #3f5af2, #5b79ff); box-shadow: 0 12rpx 22rpx rgba(63, 90, 242, 0.34); display: flex; align-items: center; justify-content: center; border: 8rpx solid #f3f6ff; margin-bottom: 8rpx; }
.tab-mid text { margin-top: -4rpx; }
</style>
