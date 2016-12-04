<template id="clusterDashboard">
	<h1>Cluster</h1>
	<p :class="{ online: online(), offline: !online() }">{{ overview.host }}</p>
	<p class="title">System Load (%)</p>
	<div class="cluster-dashboard-chart {{ className }}-load"></div>
	<p class="title">Heap Memory (gb)</p>
	<div class="cluster-dashboard-chart {{ className }}-heapUsed"></div>
	<p class="title">Non-Heap Memory (mb)</p>
	<div class="cluster-dashboard-chart {{ className }}-nonHeapUsed"></div>
	<p class="dashboard-footer">{{ getLatest() | formatDate }}</p>
</template>