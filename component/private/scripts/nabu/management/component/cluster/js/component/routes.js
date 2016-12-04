application.services.router.register({
	alias: "clusterDashboard",
	enter: function(parameters) {
		return new application.views.ClusterDashboard({ data: parameters });
	}
});