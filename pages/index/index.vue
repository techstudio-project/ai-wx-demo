<template>
	<view class="mine-page">
		<view class="member-card" :style="memberCardStyle">
			<view class="member-card__top">
				<image class="avatar" :src="member.avatar" mode="aspectFill" />
				<view class="user-meta" @click="goProfile">
					<view class="phone-row">
						<text class="phone">{{ displayPhone }}</text>
						<view v-if="!member.phoneBound" class="bind-phone" @click.stop="bindPhone">
							去绑定
						</view>
					</view>
					<view class="hint">{{ phoneHint }}</view>
				</view>
				<view class="level-wrap">
					<text class="level-tag">{{ levelLabel }}</text>
					<text class="level-sub">{{ levelSub }}</text>
				</view>
			</view>

			<view class="member-card__stats">
				<view class="stat-item">
					<text class="stat-label">当前积分</text>
					<text class="stat-value">{{ member.points }}</text>
				</view>
				<view class="divider"></view>
				<view class="stat-item">
					<text class="stat-label">即将过期</text>
					<text class="stat-value danger">{{ member.expiringPoints }}</text>
				</view>
			</view>
		</view>

		<view class="quick-grid card-block">
			<view
				v-for="item in quickActions"
				:key="item.title"
				class="quick-item"
				@click="handleMenuClick(item)"
			>
				<view class="quick-icon" :style="{ background: item.bg }">
					<uni-icons :type="item.icon" size="20" color="#ffffff" />
				</view>
				<text class="quick-title">{{ item.title }}</text>
			</view>
		</view>

		<view class="menu-section card-block">
			<view class="section-title">常用服务</view>
			<view
				v-for="menu in serviceMenus"
				:key="menu.title"
				class="menu-row"
				@click="handleMenuClick(menu)"
			>
				<view class="list-icon" :style="{ background: menu.bg }">
					<uni-icons :type="menu.icon" size="17" color="#fff" />
				</view>
				<view class="menu-content" :class="{ 'single-line': !menu.note }">
					<text class="menu-title">{{ menu.title }}</text>
					<text v-if="menu.note" class="menu-note">{{ menu.note }}</text>
				</view>
				<uni-icons type="right" size="16" color="#b9bfd0" />
			</view>
		</view>
	</view>
</template>

<script>
const levelThemeMap = {
	v1: {
		label: 'V1 青铜会员',
		sub: '基础权益已开启',
		background: 'linear-gradient(135deg, #7b6a5f 0%, #9f8a7e 50%, #d0b8a0 100%)'
	},
	v2: {
		label: 'V2 白银会员',
		sub: '进阶权益已开启',
		background: 'linear-gradient(135deg, #2e5e93 0%, #4f7db2 45%, #83a8d0 100%)'
	},
	v3: {
		label: 'V3 黑金会员',
		sub: '尊享权益已开启',
		background: 'linear-gradient(135deg, #1e1f23 0%, #353741 45%, #6a5a3d 100%)'
	},
	none: {
		label: '普通用户',
		sub: '开通会员享专属权益',
		background: 'linear-gradient(135deg, #5d6578 0%, #79829b 45%, #a7afc6 100%)'
	}
}

export default {
	data() {
		return {
			member: {
				avatar: 'https://picsum.photos/120/120',
				phone: '',
				phoneBound: false,
				points: 12860,
				expiringPoints: 320,
				level: 'v3',
				isMember: true
			},
			quickActions: [
				{ title: '积分充值', icon: 'wallet', bg: 'linear-gradient(135deg, #fa8c16, #ffb347)' },
				{ title: '学生管理', icon: 'person', bg: 'linear-gradient(135deg, #2f54eb, #5b8cff)' },
				{ title: '我的订单', icon: 'cart', bg: 'linear-gradient(135deg, #13c2c2, #5cdbd3)' },
				{ title: '会员权益', icon: 'vip', bg: 'linear-gradient(135deg, #7a4cff, #9d7bff)', url: '/pages/benefits/index' }
			],
			serviceMenus: [
				{ title: '个人信息', note: '头像 / 手机号 / 账号设置', icon: 'contact', bg: '#4f6cff', url: '/pages/profile/index' },
				{ title: '积分使用记录', note: '', icon: 'bars', bg: '#3a86ff', url: '/pages/points-record/index' },
				{ title: '我的学习档案', note: '学习时长 / 进度统计', icon: 'compose', bg: '#2b7dfa' },
				{ title: '发票与合同', note: '订单开票与电子合同下载', icon: 'paperplane', bg: '#3cb371' },
				{ title: '收货地址', note: '教材与礼品寄送地址管理', icon: 'location', bg: '#00b894' },
				{ title: '意见反馈', note: '问题建议与客服支持', icon: 'chatbubble', bg: '#fa541c' },
				{ title: '设置', note: '账号安全 / 通知 / 隐私管理', icon: 'gear', bg: '#8c8c8c' }
			]
		}
	},
	computed: {
		currentTheme() {
			if (!this.member.isMember) {
				return levelThemeMap.none
			}
			return levelThemeMap[this.member.level] || levelThemeMap.v1
		},
		memberCardStyle() {
			return {
				background: this.currentTheme.background
			}
		},
		displayPhone() {
			return this.member.phoneBound ? this.member.phone : '未绑定手机号'
		},
		phoneHint() {
			return this.member.phoneBound ? '点击可进入个人信息管理' : '首次使用请先绑定手机号，保障账号安全'
		},
		levelLabel() {
			return this.currentTheme.label
		},
		levelSub() {
			return this.currentTheme.sub
		}
	},
	methods: {
		goProfile() {
			uni.navigateTo({
				url: '/pages/profile/index'
			})
		},
		bindPhone() {
			uni.showToast({
				title: '请前往个人信息页绑定手机号',
				icon: 'none'
			})
			this.goProfile()
		},
		handleMenuClick(item) {
			if (item.url) {
				uni.navigateTo({ url: item.url })
				return
			}
			uni.showToast({
				title: `${item.title}功能开发中`,
				icon: 'none'
			})
		}
	}
}
</script>

<style>
.mine-page {
	min-height: 100vh;
	padding: 30rpx 24rpx;
	background: linear-gradient(180deg, #f3f6ff 0%, #f7f8fa 40%, #f6f6f6 100%);
	box-sizing: border-box;
}

.member-card {
	position: relative;
	padding: 32rpx 28rpx;
	border-radius: 28rpx;
	color: #ffffff;
	box-shadow: 0 18rpx 40rpx rgba(27, 38, 87, 0.22);
	overflow: hidden;
}

.member-card::after {
	content: '';
	position: absolute;
	width: 280rpx;
	height: 280rpx;
	right: -100rpx;
	top: -120rpx;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 72%);
}

.member-card__top {
	display: flex;
	align-items: center;
	position: relative;
	z-index: 2;
}

.avatar {
	width: 94rpx;
	height: 94rpx;
	border-radius: 50%;
	border: 3rpx solid rgba(255, 255, 255, 0.5);
	flex-shrink: 0;
}

.user-meta {
	margin-left: 20rpx;
	flex: 1;
}

.phone-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.phone {
	font-size: 34rpx;
	font-weight: 600;
	letter-spacing: 1rpx;
}

.bind-phone {
	padding: 6rpx 14rpx;
	font-size: 20rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.45);
}

.hint {
	margin-top: 10rpx;
	font-size: 22rpx;
	opacity: 0.92;
}

.level-wrap {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8rpx;
}

.level-tag {
	font-size: 22rpx;
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.22);
}

.level-sub {
	font-size: 22rpx;
	opacity: 0.95;
}

.member-card__stats {
	margin-top: 34rpx;
	display: flex;
	align-items: center;
	padding: 22rpx 20rpx;
	border-radius: 20rpx;
	background: rgba(8, 11, 23, 0.16);
	backdrop-filter: blur(6rpx);
	position: relative;
	z-index: 2;
}

.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.stat-label {
	font-size: 22rpx;
	opacity: 0.85;
}

.stat-value {
	font-size: 36rpx;
	font-weight: 700;
}

.stat-value.danger {
	color: #ffd591;
}

.divider {
	width: 1px;
	height: 58rpx;
	background: rgba(255, 255, 255, 0.32);
}

.card-block {
	margin-top: 24rpx;
	background: #ffffff;
	border-radius: 24rpx;
	padding: 12rpx;
	box-shadow: 0 10rpx 30rpx rgba(15, 28, 63, 0.05);
}

.quick-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12rpx;
	padding: 20rpx 12rpx;
}

.quick-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	padding: 12rpx 0;
}

.quick-icon {
	width: 72rpx;
	height: 72rpx;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 20rpx rgba(45, 61, 122, 0.22);
}

.quick-title {
	font-size: 24rpx;
	color: #2f3447;
}

.menu-section {
	padding-top: 8rpx;
}

.section-title {
	padding: 16rpx 18rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #1f2333;
}

.menu-row {
	display: flex;
	align-items: center;
	padding: 8rpx 10rpx;
	border-bottom: 1px solid #f1f3f9;
}

.menu-row:last-child {
	border-bottom: none;
}

.list-icon {
	width: 56rpx;
	height: 56rpx;
	margin-right: 18rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.menu-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10rpx 0;
	gap: 6rpx;
}

.menu-content.single-line {
	min-height: 72rpx;
	justify-content: center;
}

.menu-title {
	font-size: 28rpx;
	color: #1f2333;
}

.menu-note {
	font-size: 22rpx;
	color: #949db3;
}
</style>
