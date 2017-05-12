<template id="clusterDashboard">
	<div class="clusterDashboard">
		<h1>Cluster</h1>
		<p :class="{ online: online(), offline: !online() }">{{ overview.host }}</p>
		<p class="title">System Load (%)</p>
		<div class="cluster-dashboard-chart" :class="className + '-load'"></div>
		<p class="title">Heap Memory (gb)</p>
		<div class="cluster-dashboard-chart" :class="className + '-heapUsed'"></div>
		<p class="title">Non-Heap Memory (mb)</p>
		<div class="cluster-dashboard-chart" :class="className + '-nonHeapUsed'"></div>
		<p class="dashboard-footer">{{ formatDateTime(getLatest()) }}</p>
	</div>
</template>