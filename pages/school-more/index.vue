<template>
	<view class="school-more-page">
		<view class="toolbar-card">
			<view class="search-row">
				<uni-icons type="search" size="18" color="#8b94aa" />
				<input class="search-input" v-model="keyword" placeholder="搜索学校名称" placeholder-class="placeholder" />
			</view>
			<view class="filter-row">
				<view class="filter-trigger" @click="openFilter('area')">
					<text>区域：{{ area }}</text>
					<uni-icons type="bottom" size="13" color="#4a64ff" />
				</view>
				<view class="filter-trigger" @click="openFilter('type')">
					<text>学校类型：{{ type }}</text>
					<uni-icons type="bottom" size="13" color="#4a64ff" />
				</view>
				<view class="filter-trigger" @click="openFilter('level')">
					<text>学校属性：{{ level }}</text>
					<uni-icons type="bottom" size="13" color="#4a64ff" />
				</view>
			</view>
		</view>

		<view class="result-head">
			<text>共 {{ filteredSchools.length }} 所学校</text>
		</view>

		<view class="school-list">
			<view class="school-card" v-for="school in filteredSchools" :key="school.id" @click="goSchoolDetail(school)">
				<image class="school-logo" :src="school.logo" mode="aspectFill" />
				<view class="school-main">
					<view class="card-top">
						<text class="school-name">{{ school.name }}</text>
						<view class="hotness"><uni-icons type="fire" size="14" color="#ff7a45" /> {{ school.hot }}</view>
					</view>
					<view class="tag-wrap">
						<view class="tag tag-area">
							<uni-icons type="location" size="12" color="#2f78ff" />
							<text>{{ school.area }}</text>
						</view>
						<text class="tag" :class="`tag-${tag.type}`" v-for="tag in school.tags" :key="tag.text">{{ tag.text }}</text>
					</view>
					<text class="address">{{ school.address }}</text>
				</view>
			</view>
		</view>

		<view v-if="!filteredSchools.length" class="empty">未找到匹配学校，请更换筛选条件</view>

		<view v-if="activeFilter" class="filter-mask" @click="closeFilter">
			<view class="filter-popup" @click.stop>
				<view class="popup-title">{{ currentFilterLabel }}</view>
				<view class="popup-options">
					<view
						v-for="item in currentOptions"
						:key="item"
						class="popup-option"
						:class="{ active: currentValue === item }"
						@click="selectFilter(item)"
					>
						{{ item }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const schools = [
	{ id: 1, name: '清华大学附属中学', logo: '/static/uni.png', area: '北京', type: '高中', level: '市重点', hot: 9961, address: '北京市海淀区中关村北大街 42 号', tags: [{ text: '市重点', type: 'primary' }, { text: '竞赛强校', type: 'orange' }, { text: '寄宿', type: 'purple' }] },
	{ id: 2, name: '北京大学附属小学', logo: '/static/c2.png', area: '北京', type: '小学', level: '区重点', hot: 8240, address: '北京市海淀区颐和园路 5 号', tags: [{ text: '区重点', type: 'blue' }, { text: '双语', type: 'green' }, { text: '素质教育', type: 'orange' }] },
	{ id: 3, name: '复旦大学附属中学', logo: '/static/c3.png', area: '上海', type: '高中', level: '市重点', hot: 9112, address: '上海市杨浦区国权路 383 号', tags: [{ text: '市重点', type: 'primary' }, { text: '创新班', type: 'purple' }, { text: '强基培养', type: 'green' }] },
	{ id: 4, name: '上海交大附属初级中学', logo: '/static/c4.png', area: '上海', type: '初中', level: '区重点', hot: 7635, address: '上海市徐汇区华山路 1954 号', tags: [{ text: '区重点', type: 'blue' }, { text: '理科见长', type: 'orange' }, { text: '社团丰富', type: 'green' }] },
	{ id: 5, name: '浙江大学附属高级中学', logo: '/static/c6.png', area: '华东', type: '高中', level: '省重点', hot: 8526, address: '杭州市西湖区余杭塘路 866 号', tags: [{ text: '省重点', type: 'purple' }, { text: '实验班', type: 'primary' }, { text: '升学稳定', type: 'green' }] },
	{ id: 6, name: '华中科技大学附属中学', logo: '/static/c7.png', area: '华中', type: '高中', level: '市重点', hot: 7401, address: '武汉市洪山区珞喻路 1037 号', tags: [{ text: '市重点', type: 'primary' }, { text: '理工特色', type: 'orange' }, { text: '科技课程', type: 'blue' }] },
	{ id: 7, name: '南京大学附属中学', logo: '/static/c5.png', area: '华东', type: '初中', level: '区重点', hot: 6888, address: '南京市鼓楼区汉口路 22 号', tags: [{ text: '区重点', type: 'blue' }, { text: '小班教学', type: 'green' }, { text: '家校共育', type: 'purple' }] },
	{ id: 8, name: '中山大学附属小学', logo: '/static/c9.png', area: '华南', type: '小学', level: '区重点', hot: 6230, address: '广州市海珠区新港西路 135 号', tags: [{ text: '区重点', type: 'blue' }, { text: '阅读特色', type: 'orange' }, { text: '活动丰富', type: 'green' }] }
]

export default {
	data() {
		return {
			activeFilter: '',
			keyword: '',
			area: '全部',
			type: '全部',
			level: '全部',
			areaOptions: ['全部', '北京', '上海', '华东', '华中', '华南'],
			typeOptions: ['全部', '小学', '初中', '高中'],
			levelOptions: ['全部', '区重点', '市重点', '省重点'],
			schools
		}
	},
	computed: {
		currentOptions() {
			if (this.activeFilter === 'area') return this.areaOptions
			if (this.activeFilter === 'type') return this.typeOptions
			if (this.activeFilter === 'level') return this.levelOptions
			return []
		},
		currentFilterLabel() {
			if (this.activeFilter === 'area') return '选择区域'
			if (this.activeFilter === 'type') return '选择学校类型'
			if (this.activeFilter === 'level') return '选择学校属性'
			return ''
		},
		currentValue() {
			if (this.activeFilter === 'area') return this.area
			if (this.activeFilter === 'type') return this.type
			if (this.activeFilter === 'level') return this.level
			return ''
		},
		filteredSchools() {
			const kw = this.keyword.trim()
			return this.schools.filter((school) => {
				const matchName = !kw || school.name.includes(kw)
				const matchArea = this.area === '全部' || school.area === this.area
				const matchType = this.type === '全部' || school.type === this.type
				const matchLevel = this.level === '全部' || school.level === this.level
				return matchName && matchArea && matchType && matchLevel
			}).sort((a, b) => b.hot - a.hot)
		}
	},
	methods: {
		openFilter(type) {
			this.activeFilter = type
		},
		closeFilter() {
			this.activeFilter = ''
		},
		selectFilter(item) {
			if (this.activeFilter === 'area') this.area = item
			if (this.activeFilter === 'type') this.type = item
			if (this.activeFilter === 'level') this.level = item
			this.closeFilter()
		},
		goSchoolDetail(school) {
			uni.navigateTo({ url: `/pages/school-detail/index?id=${school.id}&name=${encodeURIComponent(school.name)}` })
		}
	}
}
</script>

<style>
.school-more-page { min-height: 100vh; padding: 24rpx; background: #f3f6ff; box-sizing: border-box; }
.toolbar-card { background: #fff; border-radius: 20rpx; padding: 20rpx; box-shadow: 0 8rpx 22rpx rgba(43, 66, 138, 0.08); }
.search-row { display: flex; align-items: center; gap: 10rpx; height: 76rpx; background: #f5f7ff; border-radius: 14rpx; padding: 0 16rpx; }
.search-input { flex: 1; font-size: 24rpx; color: #1f2333; }
.placeholder { color: #9aa2b8; }
.filter-row { margin-top: 14rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.filter-trigger { display: inline-flex; align-items: center; gap: 4rpx; padding: 8rpx 16rpx; border-radius: 999rpx; font-size: 22rpx; color: #4a64ff; background: #e9edff; }
.result-head { font-size: 23rpx; color: #6f7892; margin: 20rpx 4rpx 14rpx; }
.school-list { display: flex; flex-direction: column; gap: 16rpx; }
.school-card { display: flex; align-items: center; gap: 24rpx; padding: 26rpx; border-radius: 20rpx; background: #fff; box-shadow: 0 8rpx 20rpx rgba(37, 56, 120, 0.07); }
.school-logo { width: 112rpx; height: 112rpx; border-radius: 18rpx; background: #f4f7ff; flex-shrink: 0; }
.school-main { flex: 1; }
.card-top { display: flex; align-items: center; justify-content: space-between; gap: 12rpx; }
.school-name { flex: 1; font-size: 28rpx; font-weight: 600; color: #1e2536; }
.hotness { flex-shrink: 0; padding: 6rpx 12rpx; border-radius: 999rpx; background: #fff2eb; color: #ff7a45; font-size: 22rpx; display: inline-flex; align-items: center; gap: 4rpx; }
.tag-wrap { margin-top: 12rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.tag { padding: 4rpx 12rpx; border-radius: 10rpx; font-size: 20rpx; display: inline-flex; align-items: center; gap: 4rpx; }
.tag-area { color: #2f78ff; background: #edf4ff; }
.tag-primary { color: #4a64ff; background: #ecf0ff; }
.tag-blue { color: #1d7af8; background: #ebf4ff; }
.tag-orange { color: #ff7a45; background: #fff2eb; }
.tag-green { color: #20a35f; background: #e8f8ef; }
.tag-purple { color: #7d57f8; background: #f1ecff; }
.address { margin-top: 12rpx; font-size: 22rpx; color: #6f7892; line-height: 1.5; }
.empty { margin-top: 100rpx; text-align: center; color: #97a0b8; font-size: 24rpx; }
.filter-mask { position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 90; background: rgba(20, 30, 58, 0.26); display: flex; align-items: flex-end; }
.filter-popup { width: 100%; border-radius: 28rpx 28rpx 0 0; background: #fff; padding: 26rpx 24rpx 40rpx; box-sizing: border-box; max-height: 58vh; }
.popup-title { font-size: 30rpx; font-weight: 600; color: #1f2333; }
.popup-options { margin-top: 16rpx; display: flex; flex-wrap: wrap; gap: 12rpx; overflow-y: auto; }
.popup-option { font-size: 23rpx; color: #616a80; background: #f4f6fb; border-radius: 999rpx; padding: 10rpx 22rpx; }
.popup-option.active { color: #3154ff; background: #e8edff; font-weight: 600; }
</style>
